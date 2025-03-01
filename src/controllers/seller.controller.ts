import { RequestHandler, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { SellerService } from "../services/seller.service";
import { Seller } from "../entities/Seller.entity";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";

@injectable()
export class SellerController {
    constructor(
        @inject(DI_TYPES.SellerService)
        private sellerService: SellerService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        Partial<Seller>,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, Partial<Seller>, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const sellerId = await this.sellerService.createSeller(req.body);
            if (!sellerId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create seller"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Seller created successfully",
                data: { id: sellerId }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getAll: RequestHandler<
        unknown,
        ResponseModel<{ sellers: Seller[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ sellers: Seller[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ sellers: Seller[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const sellers = await this.sellerService.getAllSellers();
            return res.status(200).send({
                success: true,
                message: "Sellers retrieved successfully",
                data: { sellers }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getById: RequestHandler<
        { id: string },
        ResponseModel<{ seller: Seller }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ seller: Seller }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ seller: Seller }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const seller = await this.sellerService.getSellerById(req.params.id);
            if (!seller) {
                return res.status(404).send({
                    success: false,
                    message: "Seller not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Seller retrieved successfully",
                data: { seller }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public update: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        Partial<Seller>,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, Partial<Seller>, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.sellerService.updateSeller(req.params.id, req.body);
            return res.status(200).send({
                success: result,
                message: result ? "Seller updated successfully" : "Failed to update seller"
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
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
        req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, unknown, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.sellerService.deleteSeller(req.params.id);
            return res.status(200).send({
                success: result,
                message: result ? "Seller deleted successfully" : "Failed to delete seller"
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };
}