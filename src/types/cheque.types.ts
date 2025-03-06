import { Account } from "../entities/Account.entity";
import { Currency } from "../entities/Currency.entity";
import { CostCenter } from "../entities/CostCenter.entity";

export interface IChequeMainDataBody {
    number?: number;
    type: number;
    currencyId?: string;
    sellerId?: string;
    accountId?: string;
    patternId?: string;
    tenantId?: string;
    note?: string;
    createdAt?: Date;
    code?: number;
    amount?: number;
    currencyVal?: number;
    beneficiaryName?: string;
    costCenterId?: string;
    bankId?: string;
    installmentId?: string;
    apartmentId?: string;
    shopId?: string;
    parkingId?: string;
}

export interface IChequeBody {
    mainData: IChequeMainDataBody;
}