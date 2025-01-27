import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "@/types/response.types";
import {IGetCustomerItemBody, IGetCustomerPaymentBody, IGetContractDetailsBody, IGetUnitContractBody, IRateWorkerBody, IAddRequestEvacuationBody, IUpdateRequestEvacuationStatusBody, ICustomerBookServiceRequestBody, ICustomerUpdateServiceDateBody} from "@/types/customer.types";
import { IGetPaginatedQuery } from "@/types/other.types";

export const getCustomerUnitsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetCustomerItemBody,
  IGetPaginatedQuery,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetCustomerItemBody,
    IGetPaginatedQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Customer Units returned successfully",
      data: {
        units: [],
      },
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};

export const getContractDetailsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetContractDetailsBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetContractDetailsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Get Customer Contract Details successfully",
      data: {
        details: {},
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const getContractChequeController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetContractDetailsBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetContractDetailsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Customer contract cheque successfully",
      data: {
        cheque: {},
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const customerGetPaymentsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetCustomerPaymentBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetCustomerPaymentBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Customer payment returned successfully",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};

export const customerRateWorkerController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IRateWorkerBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IRateWorkerBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: `Thank you for rating`,
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const customerAddRequestEvacuationController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IAddRequestEvacuationBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IAddRequestEvacuationBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Your evacuation request has been sent",
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const customerGetRequestsEvacuationController: RequestHandler<
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
      message: "Request evacuations returned sucessfully",
      data: {
        requests: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const customerUpdateEvacuationRequestStatusController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IUpdateRequestEvacuationStatusBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IUpdateRequestEvacuationStatusBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Your request has been updated successfully!",
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const customerGetAllCustomerChequesCountController: RequestHandler<
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
      message: "All Customer cheques count returned successfully",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};
export const customerGetAllCustomerContractCountController: RequestHandler<
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
      message: "All customer contacts count returned successfully",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const customerGetUnitContractController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetUnitContractBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetUnitContractBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Unit contract returned successfully.",
      data: {
        unit_contract: {},
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
