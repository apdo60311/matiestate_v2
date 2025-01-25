
interface ICustomerBookServiceRequestBody {
  unit_id: string;
  unit_type: 1 | 2 | 3 | 4 | 5;
  description?: string;
  end_date?: string;
  category_id: string;
  category_problem_id: string;
  start_date: string;
  total_minutes: number;
}

interface ICustomerUpdateServiceDateBody {
    service_id: string;
    new_date: string;
}

interface IChangeServiceStatusBody {
  service_id: string;
  status?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

interface IWorkerStartingAndEndServiceBody {
  service_id: string;
}

interface IWorkerCrashesServiceBody {
  code: number;
  service_id: string;
  lack_reason_id?: string;
}

interface IMaterial {
  name?: string;
  quantity: number;
}

interface IWorkerRequestMaterialsBody {
  service_id: string;
  materials: IMaterial[];
}

interface IRequestedMaterial {
  quantity: number;
  price?: number;
}

interface ISupervisorAcceptMaterialsBody {
  requested_materials: IRequestedMaterial[];
}

interface IWorkerServiceDetails {
  description: string;
  category_id: string;
  category_problem_id: string; 
  total_minutes: number;
}

interface IAddPropertyPreparingBody {
  unit_type: 1 | 2 | 3 | 4 | 5;
  unit_id: string;
  workers: IWorkerServiceDetails[];
}
interface IAddNewProblemBody {
    service_id: string;
    worker: IWorkerServiceDetails;
}

interface IRemoveProblemBody {
    service_id: string;
}