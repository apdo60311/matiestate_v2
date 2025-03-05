import { Currency } from "../entities/Currency.entity";
import { Account } from "../entities/Account.entity";
import { CostCenter } from "../entities/CostCenter.entity";

export interface IEntryMainData {
    id?: string;
    currencyId?: string;
    note?: string;
    debit: number;
    credit: number;
    difference: number;
    currencyVal?: number;
    createdFrom?: number;
    createdFromId?: string;
    tenantId?: string;
}

export interface IEntryGridData {
    id?: string;
    accountId: string;
    debit?: number;
    credit?: number;
    currencyId?: string;
    costCenterId?: string;
    observeAccountId?: string;
    note?: string;
    entryMainDataId: string;
    tenantId?: string;
    currencyVal?: number;
}

export interface IEntryDataRequestBody {
    mainData: Partial<IEntryMainData>;
    gridData: Partial<IEntryGridData>[];
}

export interface IEntryResponse {
    mainData: {
        id: string;
        number: number;
        createdAt: Date;
        currency?: Currency;
        note?: string;
        debit: number;
        credit: number;
    };
    gridData: {
        id: string;
        account: Account;
        debit: number;
        credit: number;
        currency?: Currency;
        costCenter?: CostCenter;
        note?: string;
    }[];
}