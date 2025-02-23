import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { BuildingsService } from "../services/buildings.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { NextFunction, RequestHandler, Response } from "express";
import { IBuildingsBody } from "../types/buildings.types";

@injectable()
export class BuildingsController {

    constructor(@inject(DI_TYPES.BuildingsService) private buildingsService : BuildingsService) {}

    public getAll: RequestHandler<
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
      let buildings = await this.buildingsService.getBuildings();
      
      if(!buildings || buildings.length === 0) {
        return res.status(200).send({
          success: true,
          message: 'No buildings found!',
        });
      }

      return res.status(200).send({
        success: true,
        message: 'Buildings successfully retrieved',
        data: {
          buildings,
        },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };


  public get: RequestHandler<
  { id: string },
  ResponseModel<Record<string, any>>,
  any,
  unknown,
  any
> = async (
  req: CustomRequest<
    {id:string},
    ResponseModel<Record<string, any>>,
    any,
    unknown,
    any
  >,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
    let building = await this.buildingsService.getBuilding(req.params.id);    
    
    if(!building) {
      return res.status(200).send({
        success: true,
        message: 'No such building!',
      });
    }

    return res.status(200).send({
      success: true,
      data: {
        building,
      },
    });
  } catch (e: any) {
    return res.status(500).send({
      success: false,
      message: e?.message,
    });
  }
};

public create: RequestHandler<
unknown,
ResponseModel<Record<string, any>>,
IBuildingsBody,
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

  const result = await this.buildingsService.createBuilding(req.body);
  
  return res.status(200).send({
    success: true,
    message:'Building successfully created',
    data: result,
  });
} catch (e: any) {
  return res.status(500).send({
    success: false,
    message: e?.message,
  });
}
};


public update: RequestHandler<
{id: string},
ResponseModel<Record<string, any>>,
IBuildingsBody,
unknown,
any
> = async (
req: CustomRequest<
  {id:string},
  ResponseModel<Record<string, any>>,
  any,
  unknown,
  any
>,
res: Response<ResponseModel<Record<string, any>>>,
next: NextFunction
): Promise<any> => {
try {
  const result = await this.buildingsService.updateBuilding(req.params.id, req.body)
  
  return res.status(200).send({
    success: true,
    message: 'Building updated successfully',
    data: result,
  });
} catch (e: any) {
  return res.status(500).send({
    success: false,
    message: e?.message,
  });
}
};


}
