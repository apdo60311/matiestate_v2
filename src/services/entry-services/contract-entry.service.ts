import { IContractEntryData, IEntryDataRequestBody, IEntryGridData, IEntryMainData } from "../../types/entry.types";
import { inject, injectable } from "inversify";
import { EntriesService } from "../entries.service";
import { DI_TYPES } from "../../di/di.types";
import { CREATED_FROM_CONTRACT } from "../../constants/default.constants";
import { logger } from "../../utils/logger";


@injectable()
export class ContractEntryService {

    constructor(@inject(DI_TYPES.EntriesService) private readonly entriesService: EntriesService) { }

    async generateEntry(data:IContractEntryData): Promise<void> {
        try {
            const mainData: IEntryMainData = {
                createdAt: +data.pattern?.record_date_created! === 1 ? data.contract?.start_duration_date : data.contract?.issue_date,
                currencyId: data.currency.currency_id,
                currencyVal: data.currency.currency_val || 1,
                note: `Generated from contract ${data.contract.number}`,
                debit: this.calculateTotalDebit(data),
                credit: this.calculateTotalCredit(data),
                difference: 0,
                createdFrom: CREATED_FROM_CONTRACT,
                createdFromCode: data.contract.code,
                createdFromId: data.contract_id
            };


            const gridData = this.generateGridRows(data);

            const entryRequestData: IEntryDataRequestBody = {
                mainData,
                gridData
            };

            const response = await this.entriesService.createEntry(entryRequestData);
            if (response) {
                logger.info(`Entry generated for contract ${data.contract_id}: ${response.mainData.id}`);
            }
        } catch (error) {
            logger.error(`Error generating entry for contract ${data.contract_id}: ${error}`);
        }
    }

    private calculateTotalDebit(contractEntry: IContractEntryData): number {
        let debit = +contractEntry.contract.final_price;

        // Add securing value if exists
        if (contractEntry.contract.current_securing_value) {
            debit += +contractEntry.contract.current_securing_value;
        }

        // Add VAT if exists
        if (contractEntry.contract.vat_value) {
            debit += +contractEntry.contract.vat_value;
        }

        return Math.abs(debit);
    }

    private calculateTotalCredit(contract: IContractEntryData): number {
        // Credit equals debit for balanced entry
        return this.calculateTotalDebit(contract);
    }

    private calculateCommissionAmounts(contractEntry: IContractEntryData) {
        if (!contractEntry.commission?.commission_percentage) {
            return {
                ownerTotal: 0,
                revenueTotal: contractEntry.contract.final_price
            };
        }

        const ownerTotal = contractEntry.contract.final_price -
            ((contractEntry.commission.commission_percentage / 100) * contractEntry.contract.final_price);

        const revenueTotal = (contractEntry.contract.final_price - ownerTotal).toFixed(2);

        return {
            ownerTotal: Number(ownerTotal.toFixed(2)),
            revenueTotal: Number(revenueTotal)
        };
    }

    private generateGridRows(contractEntry: IContractEntryData): IEntryGridData[] {
        const rows: IEntryGridData[] = [];
        // Basic transaction rows
        if (contractEntry.commission) {
            const { ownerTotal, revenueTotal } = this.calculateCommissionAmounts(contractEntry);

            // Commission rows
            rows.push(this.createGridRow({
                accountId: contractEntry.contract.client_id,
                debit: revenueTotal,
                observeAccountId: contractEntry.commission.commission_account_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 1
            }));

            rows.push(this.createGridRow({
                accountId: contractEntry.commission.commission_account_id,
                credit: revenueTotal,
                observeAccountId: contractEntry.contract.client_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 2
            }));
 
            rows.push(this.createGridRow({
                accountId: contractEntry.contract.client_id,
                debit: ownerTotal,
                observeAccountId: contractEntry.commission.commission_from_owner_account_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 3
            }));

            rows.push(this.createGridRow({
                accountId: contractEntry.commission.commission_from_owner_account_id,
                credit: ownerTotal,
                observeAccountId: contractEntry.contract.client_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 4
            }));
        } else {
            // Regular transaction rows
            rows.push(this.createGridRow({
                accountId: contractEntry.contract.client_id,
                debit: contractEntry.contract.final_price,
                observeAccountId: contractEntry.contract.revenue_account_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 5
            }));

            rows.push(this.createGridRow({
                accountId: contractEntry.contract.revenue_account_id,
                credit: contractEntry.contract.final_price,
                observeAccountId: contractEntry.contract.client_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 6
            }));
        }

        // Add securing value rows if exists
        if (contractEntry.contract.current_securing_value) {
            rows.push(this.createGridRow({
                accountId: contractEntry.contract.client_id,
                debit: contractEntry.contract.current_securing_value,
                observeAccountId: contractEntry.contract.insurance_account_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 7
            }));

            rows.push(this.createGridRow({
                accountId: contractEntry.contract.insurance_account_id,
                credit: contractEntry.contract.current_securing_value,
                observeAccountId: contractEntry.contract.client_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 8
            }));
        }

        // Add VAT rows if exists
        if (contractEntry.contract.vat_value && contractEntry.contract.vat_account_id) {
            rows.push(this.createGridRow({
                accountId: contractEntry.contract.client_id,
                debit: contractEntry.contract.vat_value,
                observeAccountId: contractEntry.contract.vat_account_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 9
            }));

            rows.push(this.createGridRow({
                accountId: contractEntry.contract.vat_account_id,
                credit: contractEntry.contract.vat_value,
                observeAccountId: contractEntry.contract.client_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 10
            }));
        }

        // Add discount rows if exists
        if (contractEntry.contract.discount_value && contractEntry.contract.discount_account_id) {
            rows.push(this.createGridRow({
                accountId: contractEntry.contract.discount_account_id,
                debit: contractEntry.contract.discount_value,
                observeAccountId: contractEntry.contract.client_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
                number: 11
            }));

            rows.push(this.createGridRow({
                accountId: contractEntry.contract.client_id,
                credit: contractEntry.contract.discount_value,
                observeAccountId: contractEntry.contract.discount_account_id,
                currencyId: contractEntry.currency.currency_id,
                costCenterId: contractEntry.contract.cost_center_id,
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