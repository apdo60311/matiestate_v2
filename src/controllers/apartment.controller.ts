import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { ApartmentService } from "../services/apartment.service";
import { Apartment } from "../entities/Apartment.entity";
import { IApartmentBody } from "../types/apartment.types";

@injectable()
export class ApartmentController {
  constructor(
    @inject(DI_TYPES.ApartmentService)
    private apartmentService: ApartmentService
  ) {}

  public create: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IApartmentBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IApartmentBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.apartmentService.createApartmentWithRelations(
        req.body
      );

      return res.status(201).send({
        success: true,
        message: "Apartment created successfully",
        data: { id: result },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public getAll: RequestHandler<
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
      const apartments = await this.apartmentService.getAllApartments();
      return res.status(200).send({
        success: true,
        message: "Apartments retrieved successfully",
        data: { apartments },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public getById: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { id: string },
      ResponseModel<Record<string, any>>,
      unknown,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const apartment = await this.apartmentService.getApartmentById(
        req.params.id
      );
      if (!apartment) {
        return res.status(404).send({
          success: false,
          message: "Apartment not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Apartment retrieved successfully",
        data: { apartment },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public getByBuildingId: RequestHandler<
    { buildingId: string },
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { buildingId: string },
      ResponseModel<Record<string, any>>,
      unknown,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const apartments = await this.apartmentService.getApartmentsByBuildingId(
        req.params.buildingId
      );
      return res.status(200).send({
        success: true,
        message: "Apartments retrieved successfully",
        data: { apartments },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public update: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    Partial<Apartment>,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { id: string },
      ResponseModel<Record<string, any>>,
      Partial<Apartment>,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.apartmentService.updateApartment(
        req.params.id,
        req.body
      );
      return res.status(200).send({
        success: result,
        message: result
          ? "Apartment updated successfully"
          : "Failed to update apartment",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public delete: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { id: string },
      ResponseModel<Record<string, any>>,
      unknown,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.apartmentService.deleteApartment(req.params.id);
      return res.status(200).send({
        success: result,
        message: result
          ? "Apartment deleted successfully"
          : "Failed to delete apartment",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };
  public getPictures: RequestHandler<
  { id: string },
  ResponseModel<Record<string, any>>,
  unknown,
  unknown,
  any
> = async (
  req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, unknown, unknown, any>,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
      const pictures = await this.apartmentService.getApartmentPictures(req.params.id);
      return res.status(200).send({
          success: true,
          message: "Apartment pictures retrieved successfully",
          data: { pictures }
      });
  } catch (e: any) {
      return res.status(500).send({
          success: false,
          message: e?.message
      });
  }
};

public getRentalHistory: RequestHandler<
  { id: string },
  ResponseModel<Record<string, any>>,
  unknown,
  unknown,
  any
> = async (
  req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, unknown, unknown, any>,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
      const history = await this.apartmentService.getRentalPriceHistory(req.params.id);
      return res.status(200).send({
          success: true,
          message: "Rental price history retrieved successfully",
          data: { history }
      });
  } catch (e: any) {
      return res.status(500).send({
          success: false,
          message: e?.message
      });
  }
};

public getSellingHistory: RequestHandler<
  { id: string },
  ResponseModel<Record<string, any>>,
  unknown,
  unknown,
  any
> = async (
  req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, unknown, unknown, any>,
  res: Response<ResponseModel<Record<string, any>>>,
  next: NextFunction
): Promise<any> => {
  try {
      const history = await this.apartmentService.getSellingPriceHistory(req.params.id);
      return res.status(200).send({
          success: true,
          message: "Selling price history retrieved successfully",
          data: { history }
      });
  } catch (e: any) {
      return res.status(500).send({
          success: false,
          message: e?.message
      });
  }
};
}
