import { NextFunction, RequestHandler, Response } from "express";
import { CustomRequest } from "@/types/request.types";
import ResponseModel from "@/types/response.types";
import { ISendSmsBody } from "@/types/user.types";

export const getBookingsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  any,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    any,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      data: {
        services: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const customerBookService: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  ICustomerBookServiceRequestBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    ICustomerBookServiceRequestBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(201).send({
      success: true,
      message: "Service created successfully",
      data: {
        service_id: 1,
      },
    });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error creating service", error });
  }
};

export const customerUpdateServiceDate: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  ICustomerUpdateServiceDateBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    ICustomerUpdateServiceDateBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Service Date updated successfully!",
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
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
