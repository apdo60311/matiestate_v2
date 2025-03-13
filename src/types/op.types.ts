
export class IOpCollection {
    amount!: number;
    currency_id!: string;
    debit_account_id!: string;
    credit_account_id!: string;
    cost_center_id?: string;
    note?: string;
    commission_value?: number;
    commission_percentage?: number;
    commission_debit_id?: string;
    commission_credit_id?: string;
    commission_cost_center_id?: string;
    commission_note?: string;
    accounting_voucher_main_data_id?: string;
    gen_entries?: boolean;
    currency_val?: number;
}


export class IOpDeportation {
    amount!: number;
    currency_id!: string;
    debit_account_id!: string;
    credit_account_id!: string;
    cost_center_id?: string;
    note?: string;
    accounting_voucher_main_data_id?: string;
    gen_entries?: boolean;
    cheque_id!: string;
    currency_val?: number;
}


export class IOpPartialCollection {
    amount!: number;
    currency_id!: string;
    debit_account_id!: string;
    credit_account_id!: string;
    cost_center_id?: string;
    note?: string;
    commission_value?: number;
    commission_percentage?: number;
    commission_debit_id?: string;
    commission_credit_id?: string;
    commission_cost_center_id?: string;
    commission_note?: string;
    accounting_voucher_main_data_id?: string;
    total_value?: number;
    total_sum?: number;
    rest?: number;
    total_sum_prev?: number;
    gen_entries?: boolean;
    cheque_id!: string;
    currency_val?: number;
    number!: number;
}


export class IOpReturn {
    cheque_id!: string;
    amount!: number;
}