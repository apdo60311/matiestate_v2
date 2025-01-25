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
export const reportsComplaintsReportController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IReportRequestBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IReportRequestBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Reports complaints returned successfully",
      data: {
        report_complaints: [],
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
export const reportsWareHouseReportController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IReportRequestBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IReportRequestBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Report warehouses returned successfully",
      data: {
        report_warehouse: {},
      },
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};
export const reportsWorkerReportController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IReportRequestBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IReportRequestBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Worker reports returned sucessfully.",
      data: {
        reports: [],
      },
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e?.message,
    });
  }
};
export const reportsOwnerExpensesReportController: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  IReportRequestBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    IReportRequestBody,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "Owner expenses report returned successfully",
      data: {
        report: {},
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
