
export interface IBalanceSheetReportBody {
  account_id?: string;
  observe_account_id?: string;
  cost_center_id?: string;
  currency_id?: string;
  date_from?: string;
  date_to?: string;
  level?: number;
}

export interface IBillDetailsReportQuerystring {
  account_id?: string;
  customer_id?: string;
  currency_id?: string;
  cost_center_id?: string;
  start_date?: string;
  end_date?: string;
  bill_kind?: number[];
}

export interface IBillProfitReportQuerystring {
  account_id?: string;
  bill_id?: string;
  client_id?: string;
  cost_center_id?: string;
  note?: string;
  start_date?: string;
  end_date?: string;
  currency_id?: string;
}

export interface ITrialBalanceReportQuerystring {
  account_id: string;
  observe_account_id: string;
  cost_center_id: string;
  currency_id: string;
  date_from: string;
  date_to: string;
  level: number;
}

export interface IProfitAndLossReportQuerystring {
  account_id?: string;
  observe_account_id?: string;
  cost_center_id?: string;
  currency_id?: string;
  date_from?: string;
  date_to?: string;
  level?: number;
}


export interface IGeneralLedgerReportQuerystring {
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

export interface IInventoryReportQuerystring {
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

export interface IJournalLedgerReportQuerystring {
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

export interface IItemActivityReportQuerystring {
  item?: string;
  class?: string;
  store?: string;
}

export interface IContractReportBody {
  buildings?: any[];
  columns?: any[];
  contracts?: any[];
  filters?: Record<string, any>;
}


export interface IContractLeasedReportBody {
  buildings?: any[];
  columns?: any[];
  filters?: Record<string, any>;
}

export interface IContractSoldReportBody {
  buildings?: any[];
  columns?: any[];
  filters?: Record<string, any>;
}


export interface IUnitVacatedReportBody {
  contract: any;
  buildings?: any[];
  columns?: any[];
  filters?: Record<string, any>;
}

export interface IUnitReversedReportBody {
  contract: any;
  buildings?: any[];
  columns?: any[];
}


export interface ILeasedPropertyReportBody {
  columns?: any[];
  filters?: Record<string, any>;
  property?: any;
}

export interface IChangesFlatsRentPricingBody {
  buildings?: any[];
  filters?: Record<string, any>;
}

export interface IReportRequestBody {
  columns: Record<string, any>;
  filter: Record<string, any>;
}

export interface IGetWorkerServiceReportQuery {
  building_id?: string;
  status?: string;
  worker_status?: string;
  category_id?: string;
}

export interface IGetCustomerReportsQuery {
  status?: string;
  category_id?: string;
  unit_id?: string;
}








export interface IBalanceSheetFilter {
  account_id?: string;
  observe_account_id?: string;
  cost_center_id?: string;
  currency_id?: string;
  date_from?: Date;
  date_to?: Date;
  level?: number;
}

export interface IAccountHierarchy {
  account_id: string;
  account_name: string;
  parent_id: string | null;
  final_id: string;
  final_name: string;
  internal_number: number;
  parent_name: string | null;
  depth: number;
  hierarchy_path: string[];
  row_num: number;
  hierarchy_label: string;
}

export interface IAccountTotal {
  account_id: string;
  account_name: string;
  parent_id: string | null;
  parent_name: string | null;
  final_id: string;
  final_name: string;
  internal_number: number;
  hierarchy_label: string;
  level: number;
  total_debit: number;
  total_credit: number;
}

export interface IBalanceSheetReportRow {
  account_id: string;
  account_name: string;
  parent_id: string | null;
  parent_name: string | null;
  final_id: string;
  final_name: string;
  number: number;
  hierarchy_label: string;
  level: number;
  total_debit: number;
  total_credit: number;
}

export interface IBalanceSheetReportMetadata {
  total_debit: number;
  total_credit: number;
}

export interface IReportResponse { }

export interface IBalanceSheetReport extends IReportResponse {
  data: IBalanceSheetReportRow[];
  metadata: IBalanceSheetReportMetadata;
}

export interface IReportGenerationData {
  type: ReportType,
  filter: IReportFilter,
}
export enum ReportType {
  BALANCE_SHEET = "BALANCE_SHEET",
  GENERAL_LEDGER = "GENERAL_LEDGER",
  JOURNAL_LEDGER = 'JOURNAL_LEDGER',
  UNIT_VACATED_CONTRACT = 'UNIT_VACATED_CONTRACT',
  LEASED_UNITS = 'LEASED_UNITS',
  UNIT_RESERVED = 'UNIT_RESERVED',
  SOLD_UNITS = 'SOLD_UNITS',
}
export interface IReportFilter { }

export interface IGeneralLedgerFilter extends IReportFilter {
  account_id?: string;
  cost_center_id?: string;
  currency_id?: string;
  allow_statement_statement?: string;
  statement_statement_type?: 'contains' | 'not_contains';
  created_at_from?: Date;
  created_at_to?: Date;
  show_credit?: boolean;
  show_debit?: boolean;
}

export interface IGeneralLedgerReport {
  data: any[];
  metadata: {
    total_activity: number;
    pervios_total: number;
    total: number;
  };
}

export enum DebitTransactionType {
  WITHOUT = 'without',
  LESS_THAN = 'lessThan',
  MORE_THAN = 'moreThan',
  EQUAL = 'equal',
  BETWEEN = 'between',
  LESS_OR_EQUAL = 'lessOrEqual',
  LARGEST_OR_EQUAL = 'largestOrEqual'
}

export interface IJournalLedgerFilter extends IReportFilter {
  account_id?: string;
  cost_center_id?: string;
  currency_id?: string;
  entry_number_from?: number;
  entry_number_to?: number;
  debit_transaction?: DebitTransactionType;
  debit_amount?: number;
  debit_amount_from?: number;
  debit_amount_to?: number;
  created_at_from?: Date;
  created_at_to?: Date;
  show_credit?: boolean;
  show_debit?: boolean;
  constract_code?: number;
  cheque_code?: number;
  voucher_code?: number;
  bill_code?: number;
  operations?: number;
}

export interface IJournalLedgerReport {
  data: any[];
  metadata: {
    total_activity: number;
    pervios_total: number;
    total: number;
  };
}

export interface IVacatedContractFilter extends IReportFilter {
  client_id?: string;
  date_from?: Date;
  date_to?: Date;
  number_of_days?: number;
  allow_contract_statement?: boolean;
  contract_statement?: string;
  contract_statement_type?: number;
  buildings?: string[];
  contract_patterns?: number[];
}

export interface IVacatedContractReport {
  data: Array<{
    contract_id: string;
    end_duration_date: Date;
    contract_note?: string;
    apartment_id?: string;
    apartment_no?: string;
    shop_id?: string;
    shop_no?: string;
    parking_id?: string;
    parking_no?: string;
    termination_date?: Date;
    evacuation_date?: Date;
    days_left: number;
  }>;
  metadata: {
    total_contracts: number;
    terminated_contracts: number;
    expiring_contracts: number;
  };
}

export interface ILeasedReportFilter {
  show_sold_units?: boolean;
  allow_contract_statement?: boolean;
  contract_statement?: string;
  contract_statement_type?: number;
  lawsuit_on_contract?: number;
  rent_form?: number;
  rent_to?: number;
  reviewed?: boolean;
  unreviewed?: boolean;
  flats?: boolean;
  shops?: boolean;
  property_no?: string;
  area_unit?: string;
  area_form?: number;
  area_to?: number;
  lawsuit_on_unit?: number;
  blocked_units?: number;
  property_statement?: string;
  property_statement_type?: number;
  description?: string;
  buildings?: string[];
  created_at_from?: Date;
  created_at_to?: Date;
  show_credit?: boolean;
  show_debit?: boolean;
  allow_property_statement?: boolean;
}

export interface ILeasedReportResponse {
  data: Array<{
    contract_id: string;
    property_id: string;
    property_no: string;
    property_type: 'apartment' | 'shop';
    property_kind: number;
    area?: number;
    area_unit?: string;
    rent_price?: number;
    selling_price?: number;
    collected_cheques?: number;
    received_cash_payments?: number;
    total_uncollected_amount?: number;
    total_collected_amount?: number;
    returned_value?: number;
    contract_terminated?: boolean;
    termination_date?: Date;
  }>;
  metadata: {
    total_properties: number;
    total_apartments: number;
    total_shops: number;
    total_collected: number;
    total_uncollected: number;
  };
}


export interface IUnitReservedFilter {
  client_id?: string;
  booking?: number;
  unit_type?: number;
  property_no?: string;
  allow_booking_date?: boolean;
  from?: Date;
  to?: Date;
  remaining_days?: number;
  remaining_days_of_number_of_reservation_is_smaller?: number;
  buildings?: string[];
}

export interface IUnitReservedReport {
  data: Array<{
    id: string;
    property_type: number;
    property_id: string;
    property_no: string;
    book_date: Date;
    end_book_date: Date;
    has_payment: boolean;
    reservation_expired: boolean;
    payment_amount: number;
    currency_val: number;
    tenant_name: string;
    cost_center_name: string;
    currency_name: string;
    building_name: string;
    days_remaining: number;
  }>;
  metadata: {
    total_reservations: number;
    active_reservations: number;
    expired_reservations: number;
    total_payment_amount: number;
  };
}

export interface ISoldUnitsFilter extends IReportFilter {
  from?: Date;
  to?: Date;
  status?: number;
  client_id?: string;
  flats?: boolean;
  shops?: boolean;
  area_name?: string;
  description?: string;
  area_form?: number;
  area_to?: number;
  buildings?: string[];
}

export interface ISoldUnitsReport {
  data: Array<{
    contract_id: string;
    contract_type: number;
    issue_date: Date;
    property_id: string;
    property_no: string;
    property_type: 'apartment' | 'shop';
    area?: number;
    area_unit?: string;
    description?: string;
    area_name?: string;
    collected_cheques?: number;
    received_cash_payments?: number;
    total_uncollected_amount?: number;
    total_collected_amount?: number;
  }>;
  metadata: {
    total_properties: number;
    total_apartments: number;
    total_shops: number;
    total_collected: number;
    total_uncollected: number;
  };
}