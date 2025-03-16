import { Account } from "../entities/Account.entity";
import { Currency } from "../entities/Currency.entity";
import { CostCenter } from "../entities/CostCenter.entity";

export interface IVoucherMainDataBody {
    id?: string;
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
    debit?: number;
    credit?: number;
    feedback?: boolean;
    debitAmount?: number;
    creditAmount?: number;
    debitTotal?: number;
    creditTotal?: number;
    connectWith?: number;
    connectWithId?: string;
    isDeleted?: boolean;
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
        id?: string;
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
        debit?: number;
        credit?: number;
        feedback?: boolean;
        debitAmount?: number;
        creditAmount?: number;
        debitTotal?: number;
        creditTotal?: number;
        connectWith?: number;
        connectWithId?: string;
        isDeleted?: boolean;
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

export interface IVoucherValues {
    currency_id: string;
    currency_val: number;
    note: string;
    difference: number;
    account_id: string;
    cost_center_id: string;
    debit_amount: number;
    credit_amount: number;
}

export interface IVoucherEntry {
    values: IVoucherValues;
    created_from: string;
    created_from_id: string;
    created_from_code: number;
    grid: Array<IGridRow>;
}

export interface IGridRow {
    account_id: string;
    cost_center_id?: string;
    debit_amount: number;
    credit_amount: number;
    currency_id: string;
    currency_val: number;
}
