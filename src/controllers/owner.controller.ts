import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "@/types/response.types";
import {
IGetAllOwnerCashBody,IGetOwnerFinancialDetailsBody,IGetOwnerItemBody,

} from "@/types/owner.types";
import { IGetPaginatedQuery } from "@/types/other.types";

export const getAllOwnerCashController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetAllOwnerCashBody,
  IGetPaginatedQuery,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetAllOwnerCashBody,
    IGetPaginatedQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all owner cash",
      data: {
        cash: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const getAllOwnerCheckController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetAllOwnerCashBody,
  IGetPaginatedQuery,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetAllOwnerCashBody,
    IGetPaginatedQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Successfully retrieved all owner checks",
      data: {
        checks: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const getOwnerContractController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetOwnerItemBody,
  IGetPaginatedQuery,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetOwnerItemBody,
    IGetPaginatedQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Owner Contract returned successfully.",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const getOwnerUnitsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetOwnerItemBody,
  IGetPaginatedQuery,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetOwnerItemBody,
    IGetPaginatedQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Owner units returned successfully",
      data: {
        units: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const ownerGetStatisticsChequesController: RequestHandler<
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
      message: "Statistics Cheques returned successfully.",
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const ownerGetStatisticsMaintenanceController: RequestHandler<
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
      message: "Statistics Maintenance returned successfully.",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

export const ownerGetStatisticsRevenueController: RequestHandler<
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
      message: "Statistics revenue returned successfully.",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};

export const ownerGetExpensesTypesController: RequestHandler<
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
      message: "Expenses types returned successfully",
      data: {
        expenses_types: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const ownerGetOwnerFinancialDetailsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetOwnerFinancialDetailsBody,
  IGetPaginatedQuery,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetOwnerFinancialDetailsBody,
    IGetPaginatedQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Owner financial details returned successfully",
      data: {
        financial_details: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
