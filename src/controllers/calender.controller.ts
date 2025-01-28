import { IGetCalenderParams, IGetCalenderQuery } from "@/types/calender.types";
import { CustomRequest } from "@/types/request.types";
import ResponseModel from "@/types/response.types";
import { NextFunction, RequestHandler, Response } from "express";

export const getCalenderByCategoryAndBuildingId: RequestHandler<
  IGetCalenderParams,
  ResponseModel<Record<string, any>>,
  unknown,
  IGetCalenderQuery,
  any
> = async (
  req: CustomRequest<
    IGetCalenderParams,
    ResponseModel<Record<string, any>>,
    unknown,
    IGetCalenderQuery,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).send({
      success: true,
      message: "Calender returned successfully!",
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};
