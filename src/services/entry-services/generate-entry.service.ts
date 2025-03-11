import { IEntryDataRequestBody, IEntryGridData, IEntryMainData } from "../../types/entry.types";
import { inject, injectable } from "inversify";
import { EntriesService } from "../entries.service";
import { DI_TYPES } from "../../di/di.types";
import { CREATED_FROM_CONTRACT } from "../../constants/default.constants";
import { logger } from "../../utils/logger";


@injectable()
export class ContractEntryService {

    constructor(@inject(DI_TYPES.EntriesService) private readonly entriesService: EntriesService) { }

    async generateEntry(contract: any, contractId: string): Promise<void> {
        try {
            const mainData: IEntryMainData = {
                createdAt: contract.start_duration_date,
                currencyId: contract.currency_id,
                currencyVal: contract.currency_val || 1,
                note: `Generated from contract ${contract.number}`,
                debit: this.calculateTotalDebit(contract),
                credit: this.calculateTotalCredit(contract),
                difference: 0,
                createdFrom: CREATED_FROM_CONTRACT,
                createdFromCode: contract.code,
                createdFromId: contractId
            };


            const gridData = this.generateGridRows(contract);

            const entryRequestData: IEntryDataRequestBody = {
                mainData,
                gridData
            };

            const response = await this.entriesService.createEntry(entryRequestData);
            if (response) {
                logger.info(`Entry generated for contract ${contractId}: ${response.mainData.id}`);
            }
        } catch (error) {
            logger.error(`Error generating entry for contract ${contractId}: ${error}`);
        }
    }

    private calculateTotalDebit(contract: any): number {
        let debit = +contract.final_price;

        // Add securing value if exists
        if (contract.current_securing_value) {
            debit += +contract.current_securing_value;
        }

        // Add VAT if exists
        if (contract.vat_value) {
            debit += +contract.vat_value;
        }

        return Math.abs(debit);
    }

    private calculateTotalCredit(contract: any): number {
        // Credit equals debit for balanced entry
        return this.calculateTotalDebit(contract);
    }

    private calculateCommissionAmounts(contract: any, commission: any) {
        if (!commission?.commission_percentage) {
            return {
                ownerTotal: 0,
                revenueTotal: contract.final_price
            };
        }

        const ownerTotal = contract.final_price -
            ((commission.commission_percentage / 100) * contract.final_price);

        const revenueTotal = (contract.final_price - ownerTotal).toFixed(2);

        return {
            ownerTotal: Number(ownerTotal.toFixed(2)),
            revenueTotal: Number(revenueTotal)
        };
    }

    private generateGridRows(contract: any): IEntryGridData[] {
        const rows: IEntryGridData[] = [];
        const {
            client_id,
            revenue_account_id,
            currency_id,
            cost_center_id,
            current_securing_value,
            insurance_account_id,
            vat_value,
            vat_account_id,
            discount_value,
            discount_account_id
        } = contract;

        // Basic transaction rows
        if (contract.commission) {
            const { ownerTotal, revenueTotal } = this.calculateCommissionAmounts(contract, contract.commission);

            // Commission rows
            rows.push(this.createGridRow({
                accountId: client_id,
                debit: revenueTotal,
                observeAccountId: contract.commission.commission_account_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 1
            }));

            rows.push(this.createGridRow({
                accountId: contract.commission.commission_account_id,
                credit: revenueTotal,
                observeAccountId: client_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 2
            }));

            rows.push(this.createGridRow({
                accountId: client_id,
                debit: ownerTotal,
                observeAccountId: contract.commission.commission_from_owner_account_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 3
            }));

            rows.push(this.createGridRow({
                accountId: contract.commission.commission_from_owner_account_id,
                credit: ownerTotal,
                observeAccountId: client_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 4
            }));
        } else {
            // Regular transaction rows
            rows.push(this.createGridRow({
                accountId: client_id,
                debit: contract.final_price,
                observeAccountId: revenue_account_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 5
            }));

            rows.push(this.createGridRow({
                accountId: revenue_account_id,
                credit: contract.final_price,
                observeAccountId: client_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 6
            }));
        }

        // Add securing value rows if exists
        if (current_securing_value) {
            rows.push(this.createGridRow({
                accountId: client_id,
                debit: current_securing_value,
                observeAccountId: insurance_account_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 7
            }));

            rows.push(this.createGridRow({
                accountId: insurance_account_id,
                credit: current_securing_value,
                observeAccountId: client_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 8
            }));
        }

        // Add VAT rows if exists
        if (vat_value && vat_account_id) {
            rows.push(this.createGridRow({
                accountId: client_id,
                debit: vat_value,
                observeAccountId: vat_account_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 9
            }));

            rows.push(this.createGridRow({
                accountId: vat_account_id,
                credit: vat_value,
                observeAccountId: client_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 10
            }));
        }

        // Add discount rows if exists
        if (discount_value && discount_account_id) {
            rows.push(this.createGridRow({
                accountId: discount_account_id,
                debit: discount_value,
                observeAccountId: client_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 11
            }));

            rows.push(this.createGridRow({
                accountId: client_id,
                credit: discount_value,
                observeAccountId: discount_account_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                number: 12
            }));
        }

        return rows;
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
}