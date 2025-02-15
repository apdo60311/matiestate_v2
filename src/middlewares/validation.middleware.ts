import ResponseModel from "@/types/response.types";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validateDto = (dtoClass: any): (
  (req: Request, res: Response<ResponseModel<Record<string, any>>>, next: NextFunction) => any) => {
  return async (
    req: Request,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        })),
      });
    }

    req.body = dtoInstance;
    next();
  };
};
