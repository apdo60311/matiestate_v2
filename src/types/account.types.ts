import { Account } from "../entities/Account.entity";
import { AccountAssembly } from "../entities/AccountAssembly.entity";
import { AccountDistributive } from "../entities/AccountDistributive.entity";

export interface IAccountBody {
    code?: number;
    name?: string;
    type?: number;
    parent_id?: string;
    balance?: number;
    tenantId?: string;
    isActive?: boolean;
}

export interface IAccountAssemblyBody {
    account_id: string;
    code?: number;
    percentage?: number;
    note?: string;
    tenant_id?: string;
}

export interface IAccountDistributiveBody {
    account_id: string;
    code?: number;
    percentage?: number;
    note?: string;
    tenant_id?: string;
}

export interface IAccountResponse extends Account {
    assemblies?: AccountAssembly[];
    distributives?: AccountDistributive[];
}