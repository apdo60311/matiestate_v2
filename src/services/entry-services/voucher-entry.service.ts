import { inject, injectable } from "inversify";
import { EntriesService } from "../entries.service";
import { IVoucherEntry, IVoucherValues } from "../../types/voucher.types"
import { DI_TYPES } from "../../di/di.types";
import { IEntryDataRequestBody, IEntryGridData, IEntryMainData } from "../../types/entry.types";
import { logger } from "../../utils/logger";


@injectable()
export class VoucherEntryService {
    constructor(
        @inject(DI_TYPES.EntriesService)
        private readonly entriesService: EntriesService
    ) { }

    async generateEntry({
        values,
        created_from,
        created_from_id,
        created_from_code,
        grid
    }: IVoucherEntry): Promise<void> {
        try {
            const mainData: IEntryMainData = {
                currencyId: values.currency_id,
                currencyVal: values.currency_val,
                note: values.note,
                debit: Math.abs(values.debit_amount) || 0,
                credit: Math.abs(values.credit_amount) || 0,
                difference: values.difference,
                createdFrom: created_from,
                createdFromId: created_from_id,
                createdFromCode: +created_from_code
            };

            const gridData = this.generateGridRows({
                values,
                grid,
                note: `Generate A Constraint from ${created_from}`
            });

            const entryRequestData: IEntryDataRequestBody = {
                mainData,
                gridData
            };

            const response = await this.entriesService.createEntry(entryRequestData);

            if (response) {
                logger.info(`Entry generated for voucher ${created_from_id}: ${response.mainData.id}`);
            }

        } catch (error) {
            logger.error(`Error generating entry for voucher ${created_from_id}: ${error}`);
        }
    }

    private generateGridRows({
        values,
        grid,
        note
    }: {
        values: IVoucherValues;
        grid: IVoucherEntry['grid'];
        note: string;
    }): IEntryGridData[] {
        const rows: IEntryGridData[] = [];

        // Main account row
        rows.push(this.createGridRow({
            accountId: values.account_id,
            observeAccountId: grid[0]?.account_id,
            currencyId: values.currency_id,
            costCenterId: values.cost_center_id,
            debit: Math.abs(values.debit_amount) || 0,
            credit: Math.abs(values.credit_amount) || 0,
            note,
            number: 1
        }));

        // Grid rows
        let count = 1;
        for (const item of grid) {
            count++;
            rows.push(this.createGridRow({
                accountId: item.account_id,
                observeAccountId: values.account_id,
                currencyId: values.currency_id,
                costCenterId: values.cost_center_id,
                debit: Math.abs(values.debit_amount) || 0,
                credit: Math.abs(values.credit_amount) || 0,
                note,
                number: count
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