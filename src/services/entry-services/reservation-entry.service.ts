import { DI_TYPES } from "../../di/di.types";
import { injectable, inject } from "inversify";
import { EntriesService } from "../entries.service";
import { IEntryDataRequestBody, IEntryGridData, IEntryMainData, IReservationEntryData } from "../../types/entry.types";


@injectable()
export class ReservationEntryService {
    constructor(
        @inject(DI_TYPES.EntriesService) private readonly entriesService: EntriesService
    ) { }

    async generateEntryFromReservation(data: IReservationEntryData): Promise<void> {
        const { values, created_from, created_from_id, created_from_code } = data;
        const {
            payment_amount,
            cost_center_id,
            credit_account_id,
            debit_account_id,
            currency_id,
            currency_val = 1,
            note,
            created_at,
        } = values;

        const mainData: IEntryMainData = {
            createdAt: created_at,
            currencyId: currency_id,
            currencyVal: currency_val,
            note,
            debit: Math.abs(payment_amount),
            credit: Math.abs(payment_amount),
            difference: 0,
            createdFrom: created_from,
            createdFromId: created_from_id,
            createdFromCode: +created_from_code,
        };

        const gridData: IEntryGridData[] = [
            {
                accountId: debit_account_id,
                observeAccountId: credit_account_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                debit: Math.abs(payment_amount),
                credit: 0,
                note,
                number: 1,
            },
            {
                accountId: credit_account_id,
                observeAccountId: debit_account_id,
                currencyId: currency_id,
                costCenterId: cost_center_id,
                debit: 0,
                credit: Math.abs(payment_amount),
                note,
                number: 2,
            },
        ];

        const entryRequestData: IEntryDataRequestBody = {
            mainData,
            gridData,
        };

        await this.entriesService.createEntry(entryRequestData);
    }
}