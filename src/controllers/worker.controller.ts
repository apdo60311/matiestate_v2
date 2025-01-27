import { NextFunction, RequestHandler, Response, Request } from "express";
import { CustomRequest } from "@/types/request.types";
import ResponseModel from "@/types/response.types";

export const workerStartingService: RequestHandler<
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
    res.send({ success: true, message: "Service started successfully" });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      error,
      message: "Failed to start service status",
    });
  }
};

export const workerCrashesService: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IWorkerCrashesServiceBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IWorkerCrashesServiceBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({ success: true, message: "Service crashed successfully" });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, error, message: "Failed to crash service" });
  }
};
export const workerRequestMaterials: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IWorkerRequestMaterialsBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IWorkerRequestMaterialsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res
      .status(201)
      .send({ success: true, message: "Materials requested successfully" });
  } catch (error: any) {
    res.send({ success: false, message: "Unable to request materials" });
  }
};
export const workerEndService: RequestHandler<
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
      message: "service ended successfully",
    });
  } catch (error: any) {
    res.send({
      success: true,
      message: "Unable to end service",
    });
  }
};
export const workerGetServiceLackReason: RequestHandler<
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
    res.json({
      success: true,
      data: ["reason1", "reason2", "reason3"],
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: "Unable to get service lack reason",
    });
  }
};

export const workerStartPropertyPreparingService: RequestHandler<
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
      message: "Property Preparing Service started successfully",
    });
  } catch (error: any) {
    res
      .status(500)
      .send({ success: false, message: "Failed to start service" });
  }
};
export const workerCompletePropertyPreparingService: RequestHandler<
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
      message: "property preparing completed successfully",
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: "Unable to complete Property Preparing Service",
    });
  }
};

export const workerGetStatisticsController: RequestHandler<
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
    return res.status(200).send({
      success: true,
      message: "Worker statistics returned successfully.",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
