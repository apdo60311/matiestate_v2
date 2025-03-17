import { ChequePattern } from "../entities/ChequePattern.entity";

export interface IEntryMainData {
    id?: string;
    number?: number;
    createdAt?: Date;
    currencyId?: string;
    note?: string;
    debit: number;
    credit: number;
    difference: number;
    currencyVal?: number;
    createdFrom?: string;
    createdFromId?: string;
    createdFromCode?: number;
    isDeleted?: boolean;
    isFirstBatch?: boolean;
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
    entryMainDataId?: string;
    tenantId?: string;
    currencyVal?: number;
    number?: number;
}

export interface IEntryDataRequestBody {
    mainData: Partial<IEntryMainData>;
    gridData: Partial<IEntryGridData>[];
}

export interface IEntryResponse {
    mainData: {
        id?: string;
        number?: number;
        createdAt?: Date;
        currencyId?: string;
        note?: string;
        debit?: number;
        credit?: number;
        difference?: number;
        currencyVal?: number;
        createdFrom?: string;
        createdFromId?: string;
        createdFromCode?: string;
        isDeleted?: boolean;
        isFirstBatch?: boolean;
        tenantId?: string;
    };
    gridData: Partial<IEntryGridData>[];
}

export interface IBillEntryData {
    values: {
        bill: {
            currency_id?: string;
            currency_val?: number;
            note?: string;
            bill_date?: string;
            subtotal?: number;
            total?: number;
            discounts?: number;
            extras?: number;
            vat_amount?: number;
            customer_account_id: string;
            material_account_id: string;
            cost_center_id: string;
            payment_method: string;
            vat_account_id?: string;
            bill_discounts_details: Array<{
                discount?: number;
                extra?: number;
                account_id?: string;
                observe_account_id?: string;
                cost_center_id?: string;
                note?: string;
            }>;
        };
    };
    pattern: {
        bill_type: string;
        cash_account_id: string;
        discount_account_id: string;
        extra_account_id: string;
        vat_account_id: string;
    };
    created_from: string;
    created_from_id: string;
    created_from_code: string;
}

export interface IInstallmentChequeData {
    installment: {
        currency_id: string;
    };
    installment_grid: Array<{
        number?: string;
        amount: number;
        account_id: string;
        observe_account_id?: string;
    }>;
    installment_id: string;
    contract_id: string;
    cost_center_id?: string;
}

export interface ChequeData {
    installment_id: string;
    installment_grid: Array<{
        number?: string;
        amount: number;
        account_id: string;
        observe_account_id?: string;
    }>;
    contract_id: string;
    cost_center_id?: string;
    observe_account_id?: string;
    pattern?: ChequePattern;
    currency_id: string;
}

export interface IChqOperationEntryData {
    values: {
        amount: number;
        cost_center_id: string;
        credit_account_id: string;
        currency_id: string;
        currency_val?: number;
        debit_account_id: string;
        note: string;
        created_at: Date;
    };
    created_from: string;
    created_from_id: string;
    created_from_code: string;
}

export interface IFeesEntryData {
    values: Array<{
        fee_amount: number;
        account_id: string;
        notes: string;
    }>;
    created_from: string;
    created_from_id: string;
    created_from_code: string;
    contractFirstTabData: {
        client_id: string;
        number: string;
        cost_center_id: string;
    };
}

export interface IReservationEntryData {
    values: {
        payment_amount: number;
        cost_center_id: string;
        credit_account_id: string;
        debit_account_id: string;
        currency_id: string;
        currency_val?: number;
        note: string;
        created_at: Date;
    };
    created_from: string;
    created_from_id: string;
    created_from_code: string;
}

export interface ITerminationEntryData {
    gen_entries: boolean;
    owner_rest_amount: number;
    termination_date: Date;
    client_id: string;
    contract_number: string;
    end_duration_date: Date;
    revenue_account_id: string;
    created_from: string;
    created_from_id: string;
    created_from_code: number;
}


export interface ITerminationFinesEntryData {
    values: Array<{
        fee_amount: number;
        account_id: string;
        notes: string;
    }>;
    created_from: string;
    created_from_id: string;
    created_from_code: string;
    contractFirstTabData: {
        client_id: string;
        number: string;
        cost_center_id: string;
    };
}

export enum EntryType {
    CHEQUE = "cheque",
    TERMINATION = "termination",
    TERMINATION_FINES = "termination_fines",
    FEES = "fees",
    CONTRACT = "contract",
    VOUCHER = "voucher"
}

export interface IEntryGenerationData {
    type: EntryType;
    data: any;
}

export interface IContractEntryData {
    contract_id: string;
    pattern: {
        record_date_created?: number;
        bill_type?: number;
    };
    contract: {
        id: string;
        code: number;
        number: number;
        start_duration_date: Date;
        issue_date: Date;
        contract_value: number;
        current_securing_value: number;
        cost_center_id: string;
        client_id: string;
        revenue_account_id: string;
        insurance_account_id: string;
        discount_account_id: string;
        created_at: Date;
        discount_value: number;
        vat_value: number;
        vat_account_id: string;
        final_price: number;
        price_before_vat: number;
    

    };
    currency: {
        currency_id: string;
        currency_val: number;
    };
    commission?: {
        commission_percentage: number;
        commission_account_id: string;
        commission_from_owner_account_id: string;
    };
}
