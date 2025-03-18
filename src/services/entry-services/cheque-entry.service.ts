import { inject, injectable } from "inversify";
import { EntriesService } from "../entries.service";
import { DI_TYPES } from "../../di/di.types";
import { ChequeData, IChequeEntryData, IEntryDataRequestBody, IEntryGridData, IEntryMainData, IInstallmentChequeData } from "../../types/entry.types";
import { CREATED_FROM_CHQ, CHQ_RECEIVED_CODE, CONNECT_WITH_CONTRACT_CODE } from "../../constants/default.constants";
import { logger } from "../../utils/logger";
import { ChequeService } from "../cheque.service";
import { PatternService } from "../pattern.service";
import { ChequePattern } from "../../entities/ChequePattern.entity";
import { Cheque } from "../../entities/Cheque.entity";


@injectable()
export class ChequeEntryService {
    constructor(
        @inject(DI_TYPES.EntriesService)
        private readonly entriesService: EntriesService,
        @inject(DI_TYPES.ChequeService)
        private readonly chequeService: ChequeService,
        @inject(DI_TYPES.PatternService)
        private readonly patternService: PatternService
    ) { }

    async generateChequesFromInstallment({
        installment,
        installment_grid,
        installment_id,
        contract_id,
        cost_center_id,
    }: IInstallmentChequeData): Promise<void> {
        try {
            if (!installment_grid?.length) return;

            const pattern = await this.getChequePattern();
            if (!pattern) return;

            const observe_account_id = await this.getObserveAccountId(installment_grid, pattern);
            const cheques = this.prepareCheques({
                installment_grid,
                installment_id,
                contract_id,
                cost_center_id,
                observe_account_id,
                pattern,
                currency_id: installment.currency_id
            });

            await this.processCheques(cheques, installment_id, pattern, contract_id, installment.currency_id);

        } catch (error) {
            logger.error(`Error generating cheques from installment ${installment_id}: ${error}`);
        }
    }

    private async getChequePattern() {
        const pattern = await this.patternService.getChequePatternByCode(CHQ_RECEIVED_CODE);
        return pattern;
    }

    private async getPreviousCheques(installmentId: string, patternCode: number) {
        return await this.chequeService.getChequesByInstallmentAndCode(
            installmentId,
            patternCode
        );
    }
    private prepareCheques({
        installment_grid,
        installment_id,
        contract_id,
        cost_center_id,
        observe_account_id,
        pattern,
        currency_id }: ChequeData
    ) {
        return installment_grid.map(item => ({
            ...item,
            number: item.number,
            installment_id,
            currency_id,
            code: CHQ_RECEIVED_CODE,
            connect_with: CONNECT_WITH_CONTRACT_CODE,
            connect_with_id: contract_id,
            cost_center_id,
            observe_account_id,
            gen_entries: true,
            cheque_pattern_id: pattern?.id
        }));
    }

    private async getObserveAccountId(installment_grid: any[], pattern: any) {
        return installment_grid[0]?.observe_account_id ||
            pattern?.default_account_id ||
            await this.getAccountReceivable();
    }

    private async processCheques(cheques: any[], installment_id: string, pattern: any, contract_id: string, currency_id: string) {
        const prevCheques = await this.getPreviousCheques(installment_id, pattern.code);

        for (let i = 0; i < Math.max(cheques.length, prevCheques?.length || 0); i++) {
            await this.processChequeItem(
                cheques[i],
                prevCheques![i],
                pattern,
                contract_id,
                currency_id
            );
        }
    }

    private async processChequeItem(newCheque: Cheque, prevCheque: Cheque, pattern: ChequePattern, contract_id: string, currency_id: string) {
        if (JSON.stringify(newCheque) === JSON.stringify(prevCheque)) return;

        let chequeId: string | null = prevCheque?.id;

        if (newCheque && prevCheque) {
            chequeId = await this.updateCheque(newCheque, prevCheque);
        } else if (newCheque) {
            chequeId = await this.insertCheque(newCheque, contract_id);
        } else {
            await this.deleteCheque(prevCheque);
        }


        if (chequeId) {
            const checkEntryData: IChequeEntryData = {
                cheque_id: chequeId,
                cheque: {
                    ...newCheque,
                    currency_id: currency_id,
                    date: newCheque.due_date!,
                    account_id: newCheque.account.id,
                    observe_account_id: newCheque.observe_account?.id!,
                    cost_center_id: newCheque.cost_center?.id!,
                    observe_cost_center_id: newCheque.observe_cost_center?.id!,
                },
                pattern
            };
            await this.generateEntryForCheque(checkEntryData);
        }
    }

    public async generateEntryForCheque(chequeEntryData: IChequeEntryData) {
        const mainData: IEntryMainData = {
            createdAt: chequeEntryData.cheque.date,
            currencyId: chequeEntryData.cheque.currency_id,
            currencyVal: chequeEntryData.cheque.currency_val || 1,
            note: `Generated Entry From cheque number ${chequeEntryData.cheque.internal_number || chequeEntryData.cheque.number || 'no number'} amount ${chequeEntryData.cheque.amount}`,
            debit: Math.abs(chequeEntryData.cheque.amount),
            credit: Math.abs(chequeEntryData.cheque.amount),
            difference: 0,
            createdFrom: CREATED_FROM_CHQ,
            createdFromId: chequeEntryData.cheque_id,
            createdFromCode: chequeEntryData.pattern.code
        };

        const gridData = this.generateGridRows(chequeEntryData.cheque);

        const entryRequestData: IEntryDataRequestBody = {
            mainData,
            gridData
        };

        await this.entriesService.createEntry(entryRequestData);
    }

    private generateGridRows(cheque: any): IEntryGridData[] {
        return [
            this.createGridRow({
                accountId: cheque.observe_account_id,
                observeAccountId: cheque.account_id,
                currencyId: cheque.currency_id,
                costCenterId: cheque.cost_center_id,
                debit: Math.abs(cheque.amount),
                credit: 0,
                note: cheque.note,
                number: 1
            }),
            this.createGridRow({
                accountId: cheque.account_id,
                observeAccountId: cheque.observe_account_id,
                currencyId: cheque.currency_id,
                costCenterId: cheque.cost_center_id,
                debit: 0,
                credit: Math.abs(cheque.amount),
                note: cheque.note,
                number: 2
            })
        ];
    }

    private createGridRow(data: Partial<IEntryGridData>): IEntryGridData {
        return {
            accountId: data.accountId!,
            debit: data.debit || 0,
            credit: data.credit || 0,
            currencyId: data.currencyId,
            costCenterId: data.costCenterId,
            observeAccountId: data.observeAccountId,
            note: data.note || '',
            number: data.number || 1,
            entryMainDataId: data.entryMainDataId!
        };
    }

    private async getAccountReceivable() {
        // Implement account receivable retrieval
        return '';
    }


    private async updateCheque(newCheque: any, prevCheque: any) {
        delete newCheque.id;
        const success = await this.chequeService.updateCheque(prevCheque.id, newCheque);
        return success ? prevCheque.id : null;
    }

    private async insertCheque(cheque: any, contractId: string) {
        const chequeData = {
            ...cheque,
            connect_with_id: contractId
        };
        const chequeId = await this.chequeService.createCheque(chequeData);
        return chequeId;
    }

    private async deleteCheque(cheque: any) {
        const success = await this.chequeService.deleteCheque(cheque.id);
        if (success) {
            await this.entriesService.softDeleteBySource(cheque.id);
        }
    }
}