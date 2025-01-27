export interface IGetCustomerItemBody {
    filters: Record<string, any>; 
}

export interface IGetCustomerPaymentBody {
    contract_id: string;
    type: number;
}

export interface IGetContractDetailsBody {
    contract_id: string;
}

export interface IGetUnitContractBody {
    unit_id: string;
    unit_type: string;
}

export interface IRateWorkerBody {
    data: Record<string, any>;
}
export interface IAddRequestEvacuationBody {
    data: Record<string, any>;
}

export interface IUpdateRequestEvacuationStatusBody {
    request_id:string;
    status: string;
}

export interface ICustomerBookServiceRequestBody {
    unit_id: string;
    unit_type: 1 | 2 | 3 | 4 | 5;
    description?: string;
    end_date?: string;
    category_id: string;
    category_problem_id: string;
    start_date: string;
    total_minutes: number;
  }
  
  export interface ICustomerUpdateServiceDateBody {
      service_id: string;
      new_date: string;
  }
  