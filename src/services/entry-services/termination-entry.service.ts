import { inject, injectable } from "inversify";
import { EntriesService } from "../entries.service";
import { CurrencyService } from "../currency.service";
import { DI_TYPES } from "../../di/di.types";
import { IEntryDataRequestBody, IEntryMainData, IEntryGridData, ITerminationEntryData } from "../../types/entry.types";
import { DEFAULT_CURRENCY_CODE } from "../../constants/default.constants";
import { logger } from "../../utils/logger";


@injectable()
export class TerminationEntryService {
    constructor(
        @inject(DI_TYPES.EntriesService) private readonly entriesService: EntriesService,
        @inject(DI_TYPES.CurrencyService) private readonly currencyService: CurrencyService
    ) { }

    async generateEntryFromTermination(data: ITerminationEntryData): Promise<void> {
        try {
            if (!data.gen_entries) return;

            const currency = await this.currencyService.getCurrencyByCode(DEFAULT_CURRENCY_CODE);
            if (!currency) {
                throw new Error("Default currency not found");
            }
            const currency_id = currency.id;

            const note = `Generated Entry From Contract number ${data.contract_number} Termination`;

            const amount = data.owner_rest_amount;

            const mainData: IEntryMainData = {
                createdAt: data.termination_date,
                currencyId: currency_id,
                currencyVal: 1,
                note,
                debit: Math.abs(amount),
                credit: Math.abs(amount),
                difference: 0,
                createdFrom: data.created_from,
                createdFromId: data.created_from_id,
                createdFromCode: data.created_from_code,
            };

            let account_id: string;
            let observe_account_id: string;
            if (new Date(data.termination_date) > new Date(data.end_duration_date)) {
                account_id = data.client_id;
                observe_account_id = data.revenue_account_id;
            } else {
                account_id = data.revenue_account_id;
                observe_account_id = data.client_id;
            }

            if (!account_id) {
                logger.warn("No account_id determined for entry generation");
                return;
            }

            const gridData: IEntryGridData[] = [
                {
                    accountId: account_id,
                    observeAccountId: observe_account_id,
                    currencyId: currency_id,
                    debit: Math.abs(amount),
                    credit: 0,
                    note,
                    number: 1,
                },
                {
                    accountId: observe_account_id,
                    observeAccountId: account_id,
                    currencyId: currency_id,
                    debit: 0,
                    credit: Math.abs(amount),
                    note,
                    number: 2,
                },
            ];

            const entryRequestData: IEntryDataRequestBody = {
                mainData,
                gridData,
            };

            const res = await this.entriesService.createEntry(entryRequestData);
            if (!res) {
                logger.error(`Failed to generate entry for termination ${data.created_from_id}`);
            } else {
                logger.info(`Generated entry for termination ${data.created_from_id}`);
            }

        } catch (error) {
            logger.error(`Error generating entry for termination ${data.created_from_id}: ${error}`);
        }
    }
}