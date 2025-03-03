export interface IBasePatternBody {
    name: string;
    tenant_id?: string;
    shortcut_key?: string;
  }
  
  export interface IChequePatternBody extends IBasePatternBody {
    default_account_id?: string;
    deportable_debit_account_id?: string;
    deportable_credit_account_id?: string;
    move_cost_center_with_deposits?: boolean;
  }
  
  export interface IContractPatternBody extends IBasePatternBody {
    contract_type: number;
    default_revenue_account_id?: string;
    default_commission_from_client_account_id?: string;
    default_commission_from_owner_account_id?: string;
    move_cost_center_with_other_fee?: {
      debit: boolean;
      credit: boolean;
    };
    move_cost_center_with_commission_client?: {
      debit: boolean;
      credit: boolean;
    };
    move_cost_center_with_commission_owner?: {
      debit: boolean;
      credit: boolean;
    };
  }
  
  export interface IBillPatternBody extends IBasePatternBody {
    bill_type: number;
    default_store_id?: string;
    cost_center_id?: string;
    material_account_id?: string;
    currency_id: string;
    payment_method?: number;
    pricing_of_materials?: number;
  }
  
  export interface IVoucherPatternBody extends IBasePatternBody {
    default_account_id?: string;
    show_debit_field?: boolean;
    show_credit_field?: boolean;
    debit_field_label?: string;
    credit_field_label?: string;
    show_currency?: boolean;
    show_cost_center?: boolean;
    show_note?: boolean;
  }
  
  export interface IAccountingVoucherPatternBody extends IBasePatternBody {
    default_account_id?: string;
    required_cost_center?: boolean;
    required_statement?: boolean;
    show_debit_field?: boolean;
    show_credit_field?: boolean;
    show_currency?: boolean;
    show_cost_center?: boolean;
    show_note?: boolean;
  }
  
  export interface IPatternUpdateResponse {
    success: boolean;
    message: string;
  }
  
  export interface IPatternDeleteResponse {
    success: boolean;
    message: string;
  }
  
  export enum PatternType {
    CHEQUE = 'cheque',
    CONTRACT = 'contract', 
    BILL = 'bill',
    VOUCHER = 'voucher',
    ACCOUNTING_VOUCHER = 'accounting_voucher'
  }