import { inject, injectable } from "inversify";
import { EntriesService } from "../entries.service";
import { CurrencyService } from "../currency.service";
import { DI_TYPES } from "../../di/di.types";
import { IEntryDataRequestBody, IEntryMainData, IEntryGridData, ITerminationFinesEntryData } from "../../types/entry.types";
import { DEFAULT_CURRENCY_CODE } from "../../constants/default.constants";
import { logger } from "../../utils/logger";


@injectable()
export class TerminationFinesEntryService {
    constructor(
        @inject(DI_TYPES.EntriesService) private readonly entriesService: EntriesService,
        @inject(DI_TYPES.CurrencyService) private readonly currencyService: CurrencyService
    ) { }

    async generateEntryFromTerminationFines(data: ITerminationFinesEntryData): Promise<void> {
        const { values, created_from, created_from_id, created_from_code, contractFirstTabData } = data;
        const { client_id: account_id, number, cost_center_id } = contractFirstTabData;

        if (!account_id) {
            logger.warn("No account_id provided for entry generation");
            return;
        }

        const currency = await this.currencyService.getCurrencyByCode(DEFAULT_CURRENCY_CODE);
        if (!currency) {
            throw new Error("Default currency not found");
        }
        const currency_id = currency.id;

        const note = `Generated Entry From Contract number ${number} Termination Fines`;

        let totalAmount = 0;
        const grid: IEntryGridData[] = [];
        let count = 1;

        for (const value of values) {
            if (value?.fee_amount && value?.account_id) {
                const feeAmount = Math.abs(value.fee_amount);
                totalAmount += feeAmount;

                // Debit row
                grid.push({
                    accountId: account_id,
                    observeAccountId: value.account_id,
                    currencyId: currency_id,
                    costCenterId: cost_center_id,
                    debit: feeAmount,
                    credit: 0,
                    note: value.notes,
                    number: count,
                });
                count += 1;

                // Credit row
                grid.push({
                    accountId: value.account_id,
                    observeAccountId: account_id,
                    currencyId: currency_id,
                    costCenterId: cost_center_id,
                    debit: 0,
                    credit: feeAmount,
                    note: value.notes,
                    number: count,
                });
                count += 1;
            }
        }

        if (grid.length === 0) {
            logger.warn("No valid grid data for entry generation");
            return;
        }

        const mainData: IEntryMainData = {
            createdAt: new Date(),
            currencyId: currency_id,
            currencyVal: 1,
            note,
            debit: totalAmount,
            credit: totalAmount,
            difference: 0,
            createdFrom: created_from,
            createdFromId: created_from_id,
            createdFromCode: +created_from_code,
        };

        const entryRequestData: IEntryDataRequestBody = {
            mainData,
            gridData: grid,
        };

        await this.entriesService.createEntry(entryRequestData);
    }
}