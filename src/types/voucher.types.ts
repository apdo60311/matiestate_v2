import { Account } from "../entities/Account.entity";
import { Currency } from "../entities/Currency.entity";
import { CostCenter } from "../entities/CostCenter.entity";

export interface IVoucherMainDataBody {
    number?: number;
    voucherType: number;
    currencyId?: string;
    sellerId?: string;
    accountId?: string;
    patternId?: string;
    tenantId?: string;
    note?: string;
    createdAt?: Date;
    code?: number;
    totalAmount?: number;
    currencyVal?: number;
}

export interface IVoucherGridDataBody {
    voucherMainDataId?: string;
    accountId: string;
    costCenterId?: string;
    tenantId?: string;
    note?: string;
    debit?: number;
    credit?: number;
    currencyId?: string;
    currencyVal?: number;
}

export interface IVoucherPicturesBody {
    voucherMainDataId?: string;
    picture: string;
    tenantId?: string;
    note?: string;
}

export interface IVoucherBody {
    mainData: IVoucherMainDataBody;
    gridData: IVoucherGridDataBody[];
    pictures?: IVoucherPicturesBody[];
}

export interface IVoucherResponse {
    mainData: {
        id: string;
        number: number;
        createdAt: Date;
        currency?: Currency;
        seller?: Account;
        account?: Account;
        note?: string;
        total_amount: number;
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
    pictures?: {
        id: string;
        picture: string;
        note?: string;
    }[];
}