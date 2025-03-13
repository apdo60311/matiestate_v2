import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { OpService } from "../services/op.service";
import { CreateOpCollectionDto, CreateOpDeportationDto, CreateOpPartialCollectionDto, CreateOpReturnDto } from "../dtos/create-op.dto";

@injectable()
export class OpController {
    constructor(
        @inject(DI_TYPES.OpService)
        private opService: OpService
    ) { }

    public createCollection: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        CreateOpCollectionDto,
        unknown
    > = async (
        req: CustomRequest<unknown, ResponseModel<Record<string, any>>, CreateOpCollectionDto, any, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.opService.createOpCollection(req.body);
                return res.status(201).send({
                    success: true,
                    message: "Collection created successfully",
                    data: { id: result },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getAllCollections: RequestHandler = async (req, res): Promise<any> => {
        try {
            const collections = await this.opService.getOpCollections();
            return res.status(200).send({
                success: true,
                message: "Collections retrieved successfully",
                data: { collections },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };

    public getCollectionById: RequestHandler<{ id: string }> = async (req, res): Promise<any> => {
        try {
            const collection = await this.opService.getOpCollectionById(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Collection retrieved successfully",
                data: { collection },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };

    public createDeportation: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        CreateOpDeportationDto,
        unknown
    > = async (
        req: CustomRequest<unknown, ResponseModel<Record<string, any>>, CreateOpDeportationDto, any, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.opService.createOpDeportation(req.body);
                return res.status(201).send({
                    success: true,
                    message: "Deportation created successfully",
                    data: { id: result },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getAllDeportations: RequestHandler = async (req, res): Promise<any> => {
        try {
            const deportations = await this.opService.getOpDeportations();
            return res.status(200).send({
                success: true,
                message: "Deportations retrieved successfully",
                data: { deportations },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };

    public getDeportationById: RequestHandler<{ id: string }> = async (req, res): Promise<any> => {
        try {
            const deportation = await this.opService.getOpDeportationById(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Deportation retrieved successfully",
                data: { deportation },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };

    public createPartialCollection: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        CreateOpPartialCollectionDto,
        unknown
    > = async (
        req: CustomRequest<unknown, ResponseModel<Record<string, any>>, CreateOpPartialCollectionDto, any, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.opService.createOpPartialCollection(req.body);
                return res.status(201).send({
                    success: true,
                    message: "Partial Collection created successfully",
                    data: { id: result },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getAllPartialCollections: RequestHandler = async (req, res): Promise<any> => {
        try {
            const partialCollections = await this.opService.getOpPartialCollections();
            return res.status(200).send({
                success: true,
                message: "Partial Collections retrieved successfully",
                data: { partialCollections },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };

    public getPartialCollectionById: RequestHandler<{ id: string }> = async (req, res): Promise<any> => {
        try {
            const partialCollection = await this.opService.getOpPartialCollectionById(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Partial Collection retrieved successfully",
                data: { partialCollection },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };

    public createReturn: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        CreateOpReturnDto,
        unknown
    > = async (
        req: CustomRequest<unknown, ResponseModel<Record<string, any>>, CreateOpReturnDto, any, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.opService.createOpReturn(req.body);
                return res.status(201).send({
                    success: true,
                    message: "Return created successfully",
                    data: { id: result },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getAllReturns: RequestHandler = async (req, res): Promise<any> => {
        try {
            const returns = await this.opService.getOpReturns();
            return res.status(200).send({
                success: true,
                message: "Returns retrieved successfully",
                data: { returns },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };

    public getReturnById: RequestHandler<{ id: string }> = async (req, res): Promise<any> => {
        try {
            const opReturn = await this.opService.getOpReturnById(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Return retrieved successfully",
                data: { opReturn },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };

    public getReturnsByChequeId: RequestHandler<{ chequeId: string }> = async (req, res): Promise<any> => {
        try {
            const returns = await this.opService.findOpReturnsByChequeId(req.params.chequeId);
            return res.status(200).send({
                success: true,
                message: "Returns retrieved successfully",
                data: { returns },
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message,
            });
        }
    };
}
