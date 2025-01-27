import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "@/types/response.types";
import { IGetServiceByIdBody, IGetServicesStatisticsBody, IGetWorkerByServiceParam } from '@/types/service.types';

export const getServicesStatisticsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetServicesStatisticsBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetServicesStatisticsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Service statistics returned successfully",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const getServiceByIdController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetServiceByIdBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetServiceByIdBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Service returned successfully",
      data: {
        service_details: {},
        register_materials: [],
        unregister_materials: [],
        lack_reasons: [],
        customerImage: [],
        workerImage: [],
        customerFile: [],
        workerFile: [],
        worker: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const getWorkerByServiceController: RequestHandler<
  IGetWorkerByServiceParam,
  ResponseModel<Record<string, any>>,
  unknown,
  unknown,
  any
> = async (
  req: CustomRequest<
    IGetWorkerByServiceParam,
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
      message: "Worker returned successfully.",
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
