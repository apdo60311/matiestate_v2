interface IGetCategoryProblemBody {
    category_id: string;
}
interface IGetUnitBuildingBody {
    building_id: string;
}

interface IGetMaterialsParams {
    category_id: string;
    name: string;
}


interface IUploadParams {
    entity_type: 'contract' | 'user' | 'building' | 'avatar';
    id: string; // UUID format
    attachment_type: string;
}

interface IUploadBody {
    file: any; 
}

interface ICreateRecordParams {
    table_name: string;
}

interface ICreateRecordBody {
    data: Record<string, any>;
}

interface IReadRecordsParams {
    table_name: string;
}

interface IReadRecordsBody {
  offset: number;
  limit: number;
  conditions: Array<{
    type: "or" | "and";
    conditions: Array<Array<any>>;
  }>;
  joins: Array<{
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
  }>;
  sorts: Array<{
    column: string;
    order: "ASC" | "DESC";
    nulls: "first" | "last";
  }>;
  columns: Array<string>;
  unions: Array<{
    columns: Array<string>;
    table: string;
    conditions: Array<Array<any>>;
  }>;
}

interface IUpdateRecordsParams {
    table_name: string;
}

interface IUpdateRecordsBody {
    conditions: Array<{
        type: 'or' | 'and';
        conditions: Array<Array<any>>;
    }>;
    updates: Record<string, string>;
}

interface IDeleteRecordsParams {
    table_name: string;
}

interface IDeleteRecordsBody {
    conditions: Array<{
        type: 'or' | 'and';
        conditions: Array<Array<any>>;
    }>;
}

interface IGetPaginatedQuery {
    limit: number;
    offset: number;
}


interface IGetAllOwnerCashBody {
    owner_account_id: string;
    filters: Record<string, any>;
}

interface IGetOwnerItemBody {
    filters: Record<string, any>;    
}

interface IGetCustomerItemBody {
    filters: Record<string, any>; 
}

interface IGetContractDetailsBody {
    contract_id: string;
}

interface IGetCustomerPaymentBody {
    contract_id: string;
    type: number;
}

interface IGetTechnicansBody {
    name: string;
}

interface IRateWorkerBody {
    data: Record<string, any>;
}
interface IAddRequestEvacuationBody {
    data: Record<string, any>;
}

interface IUpdateRequestEvacuationStatusBody {
    request_id:string;
    status: string;
}

interface ISupervisorGetAssetsBody {
    filters: Record<string, any>;
}

interface IGetServicesStatisticsBody {
    code: string;
}

interface IGetServiceWorkerDetailsBody {
    service_worker_id: string;
}

interface IGetServiceByIdBody {
    service_id: string;
}

interface IGetOwnerFinancialDetailsBody {
    filters: Record<string, any>;
}

interface IGetUnitContractBody {
    unit_id: string;
    unit_type: string;
}

interface IReportRequestBody {
    columns: Record<string, any>;
    filter: Record<string, any>;
}

interface IGetWorkerByServiceParam {
    service_id: string;
}