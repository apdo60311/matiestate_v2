import { Response, NextFunction, RequestHandler } from "express";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "@/types/response.types";

export const createUserSelectorMiddleware
:RequestHandler<
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
) : Promise<any> =>  {
    return async (req: CustomRequest<any,ResponseModel<Record<string,any>>,any,any,any>, res: Response, next: NextFunction) => {
      req.user = {
            id: 1,
            account_id: 1,
            tenant_id: 1,
            member_id:1,
            card_type: 1,
          };
      next();
    };
};

export const isSuplierPreHandler
:RequestHandler<
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
) : Promise<any> =>  {
  if (req.user?.card_type !== 2) {
    return res
      .status(403)
      .json({success:false, message: "You don't have permission to do this action!" });
  }
  next();
};
export const isWorkerPreHandler
:RequestHandler<
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
) : Promise<any> =>  {
  if (req.user?.card_type !== 4) {
    return res
      .status(403)
      .send({success:false, message: "You don't have permission to do this action!" });
  }
  next();
};

export const isSupervisorPreHandler
:RequestHandler<
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
) : Promise<any> =>  {
  if (req.user?.card_type !== 3) {
    return res
      .status(403)
      .send({success:false, message: "You don't have permission to do this action!" });
  }
  next();
};

export const isCustomerPreHandler
:RequestHandler<
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
) : Promise<any> =>  {
  if (req.user?.card_type !== 1) {
    return res
      .status(403)
      .json({success:false, message: "You don't have permission to do this action!" });
  }
  next();
};