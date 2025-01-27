export interface IGetAllOwnerCashBody {
    owner_account_id: string;
    filters: Record<string, any>;
}

export interface IGetOwnerItemBody {
    filters: Record<string, any>;    
}

export interface IGetOwnerFinancialDetailsBody {
    filters: Record<string, any>;
}
