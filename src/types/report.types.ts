
interface IBalanceSheetReportBody {
  account_id?: string;
  observe_account_id?: string; 
  cost_center_id?: string;
  currency_id?: string;
  date_from?: string;
  date_to?: string; 
  level?: number;
}

interface IBillDetailsReportQuerystring {
  account_id?: string;
  customer_id?: string;
  currency_id?: string;
  cost_center_id?: string;
  start_date?: string;
  end_date?: string;
  bill_kind?: number[];
}

interface IBillProfitReportQuerystring {
  account_id?: string;
  bill_id?: string;
  client_id?: string;
  cost_center_id?: string;
  note?: string;
  start_date?: string;
  end_date?: string;
  currency_id?: string;
}

interface ITrialBalanceReportQuerystring {
  account_id: string;
  observe_account_id: string;
  cost_center_id: string;
  currency_id: string;
  date_from: string;
  date_to: string;
  level: number;
}

interface IProfitAndLossReportQuerystring {
  account_id?: string;
  observe_account_id?: string;
  cost_center_id?: string;
  currency_id?: string;
  date_from?: string;
  date_to?: string;
  level?: number;
}


interface IGeneralLedgerReportQuerystring {
  account_id?: string;
  cost_center_id?: string;
  currency_id?: string;
  allow_statement_statement: string;
  statement_statement_type: 'contains' | 'not_contains';
  statement_statement: string;
  created_at_from?: string;
  created_at_to?: string;
  show_credit?: boolean;
  show_debit?: boolean;
}

interface IInventoryReportQuerystring {
  item_id?: string;
  class_id?: string;
  store_id?: string;
  client_id?: string;
  code?: string;
  cost_center_id?: string;
  currency_id?: string;
  start_date?: string;
  end_date?: string;
}

interface IJournalLedgerReportQuerystring {
  account_id?: string;
  cost_center_id?: string;
  currency_id?: string;
  entry_number_from?: number;
  entry_number_to?: number;
  debit_transaction?: 'without' | 'lessThan' | 'moreThan' | 'equal' | 'between' | 'lessOrEqual' | 'largestOrEqual';
  debit_amount?: number;
  debit_amount_from?: number;
  debit_amount_to?: number;
  created_at_from?: string;
  created_at_to?: string;
  show_credit?: boolean;
  show_debit?: boolean;
  constract_code?: number;
  cheque_code?: number;
  voucher_code?: number;
  bill_code?: number;
  operations?: number;
}

interface IItemActivityReportQuerystring {
  item?: string;
  class?: string;
  store?: string;
}

interface IContractReportBody {
  buildings?: any[];
  columns?: any[];
  contracts?: any[];
  filters?: Record<string, any>;
}


interface IContractLeasedReportBody {
    buildings?: any[];
    columns?: any[];
    filters?: Record<string, any>;  
}

interface IContractSoldReportBody {
    buildings?: any[];
    columns?: any[];
    filters?: Record<string, any>;
}


interface IUnitVacatedReportBody {
    contract: any;
    buildings?: any[];
    columns?: any[];
    filters?: Record<string, any>;
}

interface IUnitReversedReportBody {
    contract: any;
    buildings?: any[];
    columns?: any[];
}


interface ILeasedPropertyReportBody {
    columns?: any[];
    filters?: Record<string, any>;
    property?: any;
}

interface IChangesFlatsRentPricingBody {
    buildings?: any[];
    filters?: Record<string, any>;
}
