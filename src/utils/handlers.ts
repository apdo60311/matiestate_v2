import { NextFunction,Request, Response } from "express";

export const asyncHandler = <T>(
    fn: (req: Request, res: Response<T>, next: NextFunction) => Promise<any>
  ) => {
    return (req: Request, res: Response<T>, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };