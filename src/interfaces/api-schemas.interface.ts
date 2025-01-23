interface TrialBalanceReportQuery {
  account_id: string;
  observe_account_id: string;
  cost_center_id: string;
  currency_id: string;
  date_from: string;
  date_to: string;
  level: number;
}

interface ProfitAndLossReportQuery {
  account_id?: string | null;
  observe_account_id?: string | null;
  cost_center_id?: string | null;
  currency_id?: string | null;
  date_from?: string | null;
  date_to?: string | null;
  level?: number | null;
}

interface JournalLedgerReportQuery {
  account_id?: string | null;
  cost_center_id?: string | null;
  currency_id?: string | null;
  entry_number_from?: number | null;
  entry_number_to?: number | null;
  debit_transaction?:
    | "without"
    | "lessThan"
    | "moreThan"
    | "equal"
    | "between"
    | "lessOrEqual"
    | "largestOrEqual"
    | null;
  debit_amount?: number | null;
  debit_amount_from?: number | null;
  debit_amount_to?: number | null;
  created_at_from?: string | null;
  created_at_to?: string | null;
  show_credit?: boolean | null;
  show_debit?: boolean | null;
  constract_code?: number | null;
  cheque_code?: number | null;
  voucher_code?: number | null;
  bill_code?: number | null;
  operations?: number | null;
}

interface ItemActivityReportQuery {
  item?: string | null;
  class?: string | null;
  store?: string | null;
  client_id?: string | null;
  code?: string | null;
  cost_center_id?: string | null;
  currency_code?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  bill_kind?: number[] | null;
}

interface InventoryReportQuery {
  item_id?: string | null;
  class_id?: string | null;
  store_id?: string | null;
  client_id?: string | null;
  code?: string | null;
  cost_center_id?: string | null;
  currency_id?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

interface GeneralLedgerReportQuery {
  account_id?: string | null;
  cost_center_id?: string | null;
  currency_id?: string | null;
  allow_statement_statement: string;
  statement_statement_type: "contains" | "not_contains";
  statement_statement: string;
  created_at_from?: string | null;
  created_at_to?: string | null;
  show_credit?: boolean | null;
  show_debit?: boolean | null;
}

interface EndingInventoryReportQuery {
  item_id?: string | null;
  class_id?: string | null;
  store_id?: string | null;
  client_id?: string | null;
  code?: string | null;
  cost_center_id?: string | null;
  currency_id?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  price_type?: number | null;
  unit_type?: number | null;
  bill_types?: number[] | null;
}

interface BillProfitReportQuery {
  account_id?: string | null;
  bill_id?: string | null;
  client_id?: string | null;
  cost_center_id?: string | null;
  note?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  currency_id?: string | null;
}

interface BillDetailsReportQuery {
  account_id?: string | null;
  customer_id?: string | null;
  currency_id?: string | null;
  cost_center_id?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  bill_kind?: number[] | null;
}

interface BalanceSheetReportQuery {
  account_id?: string | null;
  observe_account_id?: string | null;
  cost_center_id?: string | null;
  currency_id?: string | null;
  date_from?: string | null;
  date_to?: string | null;
  level?: number | null;
}

interface AddPropertyPreparingBody {
  unit_type: 1 | 2 | 3 | 4 | 5;
  unit_id: string;
  workers: {
    description: string;
    category_id: string;
    category_problem_id: string;
    total_minutes: number;
  }[];
}

interface ChangeServiceStatusBody {
  service_id: string;
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

interface WorkerStartingAndEndServiceBody {
  service_id: string;
}

interface WorkerCrashesServiceBody {
  code: number;
  service_id: string;
  lack_reason_id?: string;
}

interface WorkerRequestMaterialsBody {
  service_id: string;
  materials: {
    name?: string;
    quantity: number;
  }[];
}

interface SupervisorAcceptMaterialsBody {
  requested_materials: {
    quantity: number;
    price?: number;
  }[];
}

interface CustomerBookServiceBody {
  unit_id: string;
  unit_type: 1 | 2 | 3 | 4 | 5;
  description?: string;
  end_date: string;
  category_id: string;
  category_problem_id: string;
}
interface GetOwnerMaintenanceBody {
  owner_account_id?: string;
  type?: number;
  unit_id?: string;
  problem_type?: string;
}

interface GetCategoryProblemsByCategoryIdBody {
  category_id: string;
}

interface GetUnitsByBuildingIdBody {
  building_id: string;
}

interface GetBookingsBody {
  status?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

interface UploadSchema {
  entity_type: string;
  id: string;
  attachment_type: string;
  file: any
}

interface CreateRecordParams {
  tableName: string;
}

interface CreateRecordBody {
  data: Record<string, any>;
}

interface CreateRecordResponse {
  success: boolean;
  message: string;
  record: Record<string, any>;
}

interface ReadRecordsParams {
  tableName: string;
}
interface ReadRecordsBody {
  offset?: number;
  limit?: number;
  conditions?: {
    type: "or" | "and";
    conditions: (string | number | (string | number)[])[][];
  }[];
  joins?: {
    type:
      | "join"
      | "innerJoin"
      | "leftJoin"
      | "leftOuterJoin"
      | "rightJoin"
      | "rightOuterJoin"
      | "fullOuterJoin"
      | "crossJoin";
    table: string;
    conditions: Record<string, string>;
  }[];
  sorts?: {
    column: string;
    order: "ASC" | "DESC";
    nulls?: "first" | "last";
  }[];
  columns?: string[];
  unions?: {
    columns: string[];
    table: string;
    conditions: (string | number | (string | number)[])[][];
  }[];
}

interface ReadRecordsResponse {
  success: boolean;
  message: string;
  result: Record<string, any>[];
}

interface UpdateRecordsParams {
  tableName: string;
}

interface UpdateRecordsBody {
  conditions?: {
    type: "or" | "and";
    conditions: (string | number | (string | number)[])[][];
  }[];
  updates: Record<string, any>;
}

interface UpdateRecordsResponse {
  success: boolean;
  message: string;
  updatedRecordsCount: number;
}

interface DeleteRecordsParams {
  tableName: string;
}

interface DeleteRecordsBody {
  conditions?: {
    type: "or" | "and";
    conditions: (string | number | (string | number)[])[][];
  }[];
}

interface DeleteRecordsResponse {
  success: boolean;
  message: string;
  deletedRecordsCount: number;
}

interface ContractReportBody {
  buildings?: any[];
  columns?: any[];
  contracts?: any[];
  filters?: Record<string, any>;
}

interface SendSMSBody {
  phone_number: string;
}

interface VerifyTokenBody {
  phone_number: string;
  token: string;
}

interface SignUpBody {
  password: string;
  fcm_token: string;
}

interface LoginBody {
  phone_number: string;
  password: string;
  fcm_token: string;
}

interface ForgetPasswordBody {
  password1: string;
  password2: string;
}

interface GetAllOwnerCashBody {
  owner_account_id: string;
  filters?: Record<string, any>;
}
