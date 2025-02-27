import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { LandService } from "../services/land.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { ILandBody } from "../types/land.types";
import { Land } from "../entities/Land.entity";

@injectable()
export class LandController {
    constructor(
        @inject(DI_TYPES.LandService)
        private landService: LandService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        ILandBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, ILandBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const landId = await this.landService.createLand(req.body);
            if (!landId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create land"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Land created successfully",
                data: { id: landId }
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
        ResponseModel<{ lands: Land[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ lands: Land[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ lands: Land[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const lands = await this.landService.getAllLands();
            return res.status(200).send({
                success: true,
                message: "Lands retrieved successfully",
                data: { lands }
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
        ResponseModel<{ land: Land }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ land: Land }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ land: Land }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const land = await this.landService.getLandById(req.params.id);
            if (!land) {
                return res.status(404).send({
                    success: false,
                    message: "Land not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Land retrieved successfully",
                data: { land }
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
        Partial<Land>,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, Partial<Land>, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.landService.updateLand(req.params.id, req.body);
            return res.status(200).send({
                success: result,
                message: result ? "Land updated successfully" : "Failed to update land"
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
            const result = await this.landService.deleteLand(req.params.id);
            return res.status(200).send({
                success: result,
                message: result ? "Land deleted successfully" : "Failed to delete land"
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };
}