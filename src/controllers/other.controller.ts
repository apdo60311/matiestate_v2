import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "@/types/response.types";

export const getCategoriesController: RequestHandler<
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
    return res.send({
      success: true,
      message: "Retrieved categories successfully",
      data: {
        categories: [],
      },
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
};

export const getCategoryProblemsByCategoryIdController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetCategoryProblemBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetCategoryProblemBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.send({
      success: true,
      message: "Retrieved category problems successfully",
      data: {
        problems: [],
      },
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
};
export const getOwnerBuildingsController: RequestHandler<
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
    return res.send({
      success: true,
      message: "Retrieved owner buildings successfully",
      data: {
        buildings: [],
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};
export const getUserBuildingController: RequestHandler<
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
    return res.send({
      success: true,
      message: "Retrieved user buildings successfully",
      data: {
        buildings: [],
      },
    });
  } catch (error: any) {
    return res
      .status(500)
      .send({ success: false, error: "Internal Server Error" });
  }
};
export const getBuildingsController: RequestHandler<
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
    res.status(200).send({
      success: true,
      message: "Retrieved buildings successfully",
      data: {
        buildings: [],
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to retrieve date",
        error: "Internal Server Error",
      });
  }
};
export const getUserCategoriesController: RequestHandler<
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
    res.status(200).send({
      success: true,
      message: "Retrieved categories successfully",
      data: {
        categories: [],
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to retrieve date",
        error: "Internal Server Error",
      });
  }
};
export const getUnitsByBuildingIdController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IGetUnitBuildingBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IGetUnitBuildingBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "Units retrieved successfully",
      data: {
        units: [],
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .send({
        success: false,
        message: "An error occurred while retrieving units.",
        error: "Internal Server Error.",
      });
  }
};

export const getMaterialsController: RequestHandler<
  IGetMaterialsParams,
  ResponseModel<Record<string, any>>,
  unknown,
  unknown,
  any
> = async (
  req: Request<
    IGetMaterialsParams,
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.send({
      success: true,
      message: "Retrieved Materials successfully",
      data: {
        materials: [],
      },
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: "Unable to get materials" });
  }
};

export const uploadAttachmentController: RequestHandler<
  IUploadParams,
  ResponseModel<Record<string, any>>,
  IUploadBody,
  unknown,
  any
> = async (
  req: Request<
    IUploadParams,
    ResponseModel<Record<string, any>>,
    IUploadBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "upload done successfully",
      data: [],
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: "upload failed",
    });
  }
};
export const createRecordController: RequestHandler<
  ICreateRecordParams,
  ResponseModel<Record<string, any>>,
  ICreateRecordBody,
  unknown,
  any
> = async (
  req: Request<
    ICreateRecordParams,
    ResponseModel<Record<string, any>>,
    ICreateRecordBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "Record created successfully",
      data: {
        record: {},
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: `Error Creating Record`,
    });
  }
};
export const readRecordsController: RequestHandler<
  IReadRecordsParams,
  ResponseModel<Record<string, any>>,
  IReadRecordsBody,
  unknown,
  any
> = async (
  req: Request<
    IReadRecordsParams,
    ResponseModel<Record<string, any>>,
    IReadRecordsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "Records retrieved successfully",
      data: {
        result: [],
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: `Error Reading Record/s`,
    });
  }
};
export const updateRecordsController: RequestHandler<
  IUpdateRecordsParams,
  ResponseModel<Record<string, any>>,
  IUpdateRecordsBody,
  unknown,
  any
> = async (
  req: Request<
    IUpdateRecordsParams,
    ResponseModel<Record<string, any>>,
    IUpdateRecordsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "No record were Updated",
      data: {
        updatedRecordsCount: 0,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: `Error Reading Record/s`,
    });
  }
};
export const deleteRecordsController: RequestHandler<
  IDeleteRecordsParams,
  ResponseModel<Record<string, any>>,
  IDeleteRecordsBody,
  unknown,
  any
> = async (
  req: Request<
    IDeleteRecordsParams,
    ResponseModel<Record<string, any>>,
    IDeleteRecordsBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    res.send({
      success: true,
      message: "No record were deleted",
      data: {
        deletedRecordsCount: 0,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: `Error Creating Record`,
    });
  }
};
export const getNotificationsController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  unknown,
  IGetPaginatedQuery,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IGetPaginatedQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      data: {
        notifications: [],
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
        },
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const getUnreadNotificationsCountController: RequestHandler<
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
      message: "Unread Notifications Count retrieved successfully",
      data: {
        count: 0,
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const updateNotificationsStatusController: RequestHandler<
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
      message: "Successfully updated Notification status",
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};

export const getContractCashController: RequestHandler<
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
      message: "Contract Cash returned successfully.",
      data: {},
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
