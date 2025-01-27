export interface IGetCategoryProblemBody {
    category_id: string;
}
export interface IGetUnitBuildingBody {
    building_id: string;
}

export interface IGetMaterialsParams {
    category_id: string;
    name: string;
}
export interface IGetContractDetailsBody {
    contract_id: string;
}

export interface IUploadParams {
    entity_type: 'contract' | 'user' | 'building' | 'avatar';
    id: string; // UUID format
    attachment_type: string;
}

export interface IUploadBody {
    file: any; 
}

export interface ICreateRecordParams {
    table_name: string;
}

export interface ICreateRecordBody {
    data: Record<string, any>;
}

export interface IReadRecordsParams {
    table_name: string;
}

export interface IReadRecordsBody {
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

export interface IUpdateRecordsParams {
    table_name: string;
}

export interface IUpdateRecordsBody {
    conditions: Array<{
        type: 'or' | 'and';
        conditions: Array<Array<any>>;
    }>;
    updates: Record<string, string>;
}

export interface IDeleteRecordsParams {
    table_name: string;
}

export interface IDeleteRecordsBody {
    conditions: Array<{
        type: 'or' | 'and';
        conditions: Array<Array<any>>;
    }>;
}

export interface IGetPaginatedQuery {
    limit: number;
    offset: number;
}
