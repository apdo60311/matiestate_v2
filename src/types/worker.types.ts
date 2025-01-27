export interface IWorkerStartingAndEndServiceBody {
    service_id: string;
}

export interface IWorkerCrashesServiceBody {
    code: number;
    service_id: string;
    lack_reason_id?: string;
}

export interface IMaterial {
    name?: string;
    quantity: number;
  }
  
export interface IWorkerRequestMaterialsBody {
    service_id: string;
    materials: IMaterial[];
  }
  