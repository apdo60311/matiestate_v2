export interface IOwnerBody {
    name: string;    
    id_card?: string;
    phone?: string;
    cell_phone?: string;
    fax?: string;
    mailbox?: string;
    email?: string;
    address?: string;
    nationality?: string;
    number?: number;
    account_id?: string;
    tenant_id?: string;
    ltnname?: string;
}

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


export interface IOwnerExpenseBody {
    owner_id: string;
    amount: number;
    date: Date;
    description?: string;
    type_id: string;
    tenant_id?: string;
    note?: string;
    number?: number;
    details?: IOwnerExpenseDetailBody[];
}

export interface IOwnerExpenseDetailBody {
    expense_id: string;
    amount: number;
    description?: string;
    tenant_id?: string;
    note?: string;
    number?: number;
}

export interface IOwnerExpenseTypeBody {
    name: string;
    description?: string;
    tenant_id?: string;
    note?: string;
    number?: number;
    code?: string;
}

export interface IOwnerExpenseResponse {
    id: string;
    owner_id: string;
    amount: number;
    date: Date;
    description?: string;
    type_id: string;
    tenant_id?: string;
    note?: string;
    number?: number;
    details?: IOwnerExpenseDetailResponse[];
    type?: IOwnerExpenseTypeResponse;
    created_at: Date;
    updated_at: Date;
}

export interface IOwnerExpenseDetailResponse {
    id: string;
    expense_id: string;
    amount: number;
    description?: string;
    tenant_id?: string;
    note?: string;
    number?: number;
    created_at: Date;
    updated_at: Date;
}

export interface IOwnerExpenseTypeResponse {
    id: string;
    name: string;
    description?: string;
    tenant_id?: string;
    note?: string;
    number?: number;
    code?: string;
    created_at: Date;
    updated_at: Date;
}
