export interface ISupervisorGetAssetsBody {
    filters: Record<string, any>;
}

export interface IWorkerStartingAndEndServiceBody {
    service_id: string;
  }
  

  export interface IRequestedMaterial {
    quantity: number;
    price?: number;
  }  

  export interface ISupervisorAcceptMaterialsBody {
    requested_materials: IRequestedMaterial[];
  }
  

  export interface IWorkerServiceDetails {
    description: string;
    category_id: string;
    category_problem_id: string; 
    total_minutes: number;
  }
  

  export interface IAddPropertyPreparingBody {
    unit_type: 1 | 2 | 3 | 4 | 5;
    unit_id: string;
    workers: IWorkerServiceDetails[];
  }

  
  export interface IAddNewProblemBody {
    service_id: string;
    worker: IWorkerServiceDetails;
}

export interface IRemoveProblemBody {
    service_id: string;
}

export interface IChangeServiceStatusBody {
  service_id: string;
  status?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface IGetTechnicansBody {
  name: string;
}

export interface IGetServiceWorkerDetailsBody {
  service_worker_id: string;
}
