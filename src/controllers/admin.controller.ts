import { CustomRequest } from '@/types/request.types';
import ResponseModel from '@/types/response.types';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export class CompanyController {
  static create: RequestHandler<
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
        res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static update: RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static delete: RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error:any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static getAll: RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static getOne
  : RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error:any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export class PackageController {
  static create: RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error:any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static update: RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static delete: RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static getAll: RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static getOne: RequestHandler<
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
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export class TenantController {
    static create: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static update: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static delete: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static getAll: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static getOne: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static renewal: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static getNearExpired: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }

export class ManagerController {
    static create: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static update: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static delete: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static getAll: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  
    static getOne: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
  
export class StatisticsController {
    static getCountStatistics: RequestHandler<
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
        res.status(200).json({ success: true });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
    