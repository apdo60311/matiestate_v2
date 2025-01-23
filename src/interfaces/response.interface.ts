interface SuccessResponse<T> {
    success: true;
    message?: string;
    result?: T;
    record?:T;
    data?: T;
    service_id?: number;
    problemsIds?:number[]
    deletedRecordsCount?: number;
    access_token?:string;
    user?:any;
    technicians?:any;
    services?:any[];
    buildings?:any[];
    categories?:any[];
    requests?:any[];
    problems?:any[];
    count?:number;
    attachments?:any[];
    building_id?:number;
    supervisorImage?:string[],
    workerImage?:string[],
    supervisorFile?:string[],
    workerFile?:string[],
    service_details?:any
    lack_reasons?:any
    register_materials?:any[]
    unregister_materials?:any[]
  }
  
interface ErrorResponse {
    success: false;
    message: string;
    error?: any;
    table?: string;
    column?: string;
    detail?: string;
    constraint?: string;
  }
  
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;