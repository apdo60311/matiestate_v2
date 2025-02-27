import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { VillaService } from "../services/villa.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { IVillaBody } from "../types/villa.types";
import { Villa } from "../entities/Villa.entity";

@injectable()
export class VillaController {
    constructor(
        @inject(DI_TYPES.VillaService)
        private villaService: VillaService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IVillaBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IVillaBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const villaId = await this.villaService.createVilla(req.body);
            if (!villaId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create villa"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Villa created successfully",
                data: { id: villaId }
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
        ResponseModel<{ villas: Villa[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ villas: Villa[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ villas: Villa[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const villas = await this.villaService.getAllVillas();
            return res.status(200).send({
                success: true,
                message: "Villas retrieved successfully",
                data: { villas }
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
        ResponseModel<{ villa: Villa }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ villa: Villa }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ villa: Villa }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const villa = await this.villaService.getVillaById(req.params.id);
            if (!villa) {
                return res.status(404).send({
                    success: false,
                    message: "Villa not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Villa retrieved successfully",
                data: { villa }
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
        Partial<Villa>,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, Partial<Villa>, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.villaService.updateVilla(req.params.id, req.body);
            return res.status(200).send({
                success: result,
                message: result ? "Villa updated successfully" : "Failed to update villa"
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
            const result = await this.villaService.deleteVilla(req.params.id);
            return res.status(200).send({
                success: result,
                message: result ? "Villa deleted successfully" : "Failed to delete villa"
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };
}