import { CustomRequest } from '@/types/request.types';
import ResponseModel from '@/types/response.types';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export class CompanyController {
  static create: RequestHandler<
  unknown,
  ResponseModel<Record<string, any>>,
  ICreateCompanyBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    ICreateCompanyBody,
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
  ICompanyRequestParam,
  ResponseModel<Record<string, any>>,
  IUpdateCompanyBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    ICompanyRequestParam,
    ResponseModel<Record<string, any>>,
    IUpdateCompanyBody,
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
  ICompanyRequestParam,
  ResponseModel<Record<string, any>>,
  any,
  unknown,
  any
> = async (
  req: CustomRequest<
    ICompanyRequestParam,
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
  ICompanyRequestParam,
  ResponseModel<Record<string, any>>,
  any,
  unknown,
  any
> = async (
  req: CustomRequest<
    ICompanyRequestParam,
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
  ICreatePackageBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    unknown,
    ResponseModel<Record<string, any>>,
    ICreatePackageBody,
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
  IPackageRequestParam,
  ResponseModel<Record<string, any>>,
  IUpdatePackageBody,
  unknown,
  any
> = async (
  req: CustomRequest<
    IPackageRequestParam,
    ResponseModel<Record<string, any>>,
    IUpdatePackageBody,
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
  IPackageRequestParam,
  ResponseModel<Record<string, any>>,
  any,
  unknown,
  any
> = async (
  req: CustomRequest<
    IPackageRequestParam,
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
  IPackageRequestParam,
  ResponseModel<Record<string, any>>,
  any,
  unknown,
  any
> = async (
  req: CustomRequest<
    IPackageRequestParam,
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
    ICreateTenantBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      ICreateTenantBody,
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
    ITenantRequestParam,
    ResponseModel<Record<string, any>>,
    IUpdateTenantBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      ITenantRequestParam,
      ResponseModel<Record<string, any>>,
      IUpdateTenantBody,
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
    ITenantRequestParam,
    ResponseModel<Record<string, any>>,
    any,
    unknown,
    any
  > = async (
    req: CustomRequest<
      ITenantRequestParam,
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
    ITenantRequestParam,
    ResponseModel<Record<string, any>>,
    any,
    unknown,
    any
  > = async (
    req: CustomRequest<
      ITenantRequestParam,
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
    ITenantRequestParam,
    ResponseModel<Record<string, any>>,
    ITenantRenewalBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      ITenantRequestParam,
      ResponseModel<Record<string, any>>,
      ITenantRenewalBody,
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
    ICreateManagerBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      ICreateManagerBody,
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
    IManagerRequestParam,
    ResponseModel<Record<string, any>>,
    IUpdateManagerBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      IManagerRequestParam,
      ResponseModel<Record<string, any>>,
      IUpdateManagerBody,
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
    IManagerRequestParam,
    ResponseModel<Record<string, any>>,
    any,
    unknown,
    any
  > = async (
    req: CustomRequest<
      IManagerRequestParam,
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
    IManagerRequestParam,
    ResponseModel<Record<string, any>>,
    any,
    unknown,
    any
  > = async (
    req: CustomRequest<
      IManagerRequestParam,
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
    