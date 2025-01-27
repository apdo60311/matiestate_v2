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


