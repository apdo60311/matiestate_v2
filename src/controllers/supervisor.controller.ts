import { NextFunction, RequestHandler, Response } from "express";
import { CustomRequest } from "@/types/request.types";
import ResponseModel from "@/types/response.types";
import {
  IAddPropertyPreparingBody,
  ISupervisorGetAssetsBody,
  IWorkerStartingAndEndServiceBody,
  ISupervisorAcceptMaterialsBody,
  IAddNewProblemBody,
  IRemoveProblemBody,
  IChangeServiceStatusBody,
  IGetTechnicansBody,
  IGetServiceWorkerDetailsBody,
  ISupervisorSearchWorkerParams,
  ISupervisorSearchWorkerQuery
} from '@/types/supervisor.types';
import { IGetPaginatedQuery } from "@/types/other.types";

export const supervisorGetServiceProblems: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IWorkerStartingAndEndServiceBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IWorkerStartingAndEndServiceBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      data: {
        problems: [],
      },
    });
  } catch (error: any) {
    res.send(error);
  }
};

export const supervisorAddPropertyPreparing: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IAddPropertyPreparingBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IAddPropertyPreparingBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "Property prepare request done successfully",
      data: {
        service_id: 1,
        problemsIds: [1],
      },
    });
  } catch (error: any) {
    res.send({
      success: false,
      error,
      message: "Property prepare request can't be done right now",
    });
  }
};
export const supervisorAddNewProblem: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IAddNewProblemBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IAddNewProblemBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "Added new problem successfully",
      data: {
        problemsIds: [1],
      },
    });
  } catch (error: any) {
    res.send({
      error,
      success: false,
      message: "failed to add new problem, please try again later",
    });
  }
};
export const supervisorRemoveProblem: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IRemoveProblemBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IRemoveProblemBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "deleted problem successfully",
    });
  } catch (error: any) {
    res.send({
      error,
      success: false,
      message: "failed to remove problem, please try again later",
    });
  }
};
export const supervisorEndPropertyPreparingService: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IWorkerStartingAndEndServiceBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IWorkerStartingAndEndServiceBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "Property Preparing Service ended successfully",
    });
  } catch (error: any) {
    res.status(500).send({ success: false, message: "Internal Server Error." });
  }
};

export const supervisorAcceptMaterials: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  ISupervisorAcceptMaterialsBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    ISupervisorAcceptMaterialsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "Materials accepted successfully",
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: "Unable to accept materials",
    });
  }
};

export const supervisorChangeServiceStatus: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IChangeServiceStatusBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IChangeServiceStatusBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "Service status changed successfully",
    });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, message: "Failed to change service" });
  }
};

export const supervisorGetTechniciansController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetTechnicansBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetTechnicansBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Technicians have been returned successfully",
      data: {
        technicians: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const supervisorGetAssetsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  ISupervisorGetAssetsBody,
  IGetPaginatedQuery,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    ISupervisorGetAssetsBody,
    IGetPaginatedQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Assets have been returned succesfully",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};

export const supervisorGetServiceWorkerDetailsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetServiceWorkerDetailsBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetServiceWorkerDetailsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      data: {
        service_details: {},
        register_materials: [],
        unregister_materials: [],
        lack_reasons: [],
        supervisorImage: [],
        workerImage: [],
        supervisorFile: [],
        workerFile: [],
        worker: {},
      },
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};

export const supervisorGetStatisticsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  unknown,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Supervisor statistics returned successfully",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};


export const supervisorSearchWorkersController: RequestHandler<
  ISupervisorSearchWorkerParams,
  ResponseModel<Record<string, any>>,
  unknown,
  ISupervisorSearchWorkerQuery,
  any
> = async (
  req: CustomRequest<
    ISupervisorSearchWorkerParams,
    ResponseModel<Record<string, any>>,
    unknown,
    ISupervisorSearchWorkerQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Worker returned successfully",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};
