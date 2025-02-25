import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { ShopService } from "../services/shop.service";
import { Shop } from "../entities/Shop.entity";
import { IShopBody } from "../types/shop.types";

@injectable()
export class ShopController {
  constructor(
    @inject(DI_TYPES.ShopService)
    private shopService: ShopService
  ) {}

  public create: RequestHandler<
    unknown,
    ResponseModel<{ id: string }>,
    IShopBody,
    unknown,
    any
  > = async (
    req: CustomRequest<unknown, ResponseModel<{ id: string }>, IShopBody, unknown, any>,
    res: Response<ResponseModel<{ id: string }>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const shopId = await this.shopService.createShop(req.body);
      
      if (!shopId) {
        return res.status(500).send({
          success: false,
          message: "Shop creation failed",
        });
      } 

      return res.status(201).send({
        success: true,
        message: "Shop created successfully",
        data: { id: shopId },
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
    ResponseModel<{ shops: Shop[] }>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<unknown, ResponseModel<{ shops: Shop[] }>, unknown, unknown, any>,
    res: Response<ResponseModel<{ shops: Shop[] }>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const shops = await this.shopService.getAllShops();
      return res.status(200).send({
        success: true,
        message: "Shops retrieved successfully",
        data: { shops },
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
    ResponseModel<{ shop: Shop }>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<{ id: string }, ResponseModel<{ shop: Shop }>, unknown, unknown, any>,
    res: Response<ResponseModel<{ shop: Shop }>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const shop = await this.shopService.getShopById(req.params.id);
      if (!shop) {
        return res.status(404).send({
          success: false,
          message: "Shop not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Shop retrieved successfully",
        data: { shop },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };
}
