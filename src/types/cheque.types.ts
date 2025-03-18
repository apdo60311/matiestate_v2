import { Account } from "../entities/Account.entity";
import { Currency } from "../entities/Currency.entity";
import { CostCenter } from "../entities/CostCenter.entity";

export interface IChequeMainDataBody {
    number?: number;
    type: number;
    currencyId?: string;
    sellerId?: string;
    accountId?: string;
    observeAccountId?: string;
    patternId?: string;
    tenantId?: string;
    note?: string;
    createdAt?: Date;
    code?: number;
    amount?: number;
    currencyVal?: number;
    beneficiaryName?: string;
    costCenterId?: string;
    observeCostCenterId?: string;
    bankId?: string;
    installmentId?: string;
    apartmentId?: string;
    shopId?: string;
    parkingId?: string;
    date?: Date;
}

export interface IChequeBody {
    mainData: IChequeMainDataBody;
}