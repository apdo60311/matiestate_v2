import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { MaterialService } from "../services/material.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { Material } from "../entities/Material.entity";
import { MaterialGroup } from "../entities/MaterialGroup.entity";
import { MaterialBalance } from "../entities/MaterialBalance.entity";
import { MaterialPrices } from "../entities/MaterialPrices.entity";
import { MaterialPricesDetails } from "../entities/MaterialPricesDetails.entity";
import { IMaterialRequestBody, IMaterialResponseBody } from "@/types/material.types";

@injectable()
export class MaterialController {
    constructor(
        @inject(DI_TYPES.MaterialService)
        private materialService: MaterialService
    ) {}

    public createMaterial: RequestHandler<
        unknown,
        ResponseModel<IMaterialResponseBody>,
        IMaterialRequestBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<IMaterialResponseBody>, IMaterialRequestBody, unknown, any>,
        res: Response<ResponseModel<IMaterialResponseBody>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.materialService.createMaterial(req.body);
            
              if (!result?.material) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create material"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Material created successfully",
                data: result,
                
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getMaterialById: RequestHandler<
        { id: string },
        ResponseModel<{ material: Material }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ material: Material }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ material: Material }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const material = await this.materialService.getMaterialById(req.params.id);
            if (!material) {
                return res.status(404).send({
                    success: false,
                    message: "Material not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Material retrieved successfully",
                data: { material }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getAllMaterials: RequestHandler<
        unknown,
        ResponseModel<{ materials: Material[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ materials: Material[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ materials: Material[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const materials = await this.materialService.getAllMaterials();
            return res.status(200).send({
                success: true,
                message: "Materials retrieved successfully",
                data: { materials }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public createMaterialGroup: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        Partial<MaterialGroup>,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, Partial<MaterialGroup>, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const groupId = await this.materialService.createMaterialGroup(req.body);
            if (!groupId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create material group"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Material group created successfully",
                data: { id: groupId }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getAllMaterialGroups: RequestHandler<
        unknown,
        ResponseModel<{ groups: MaterialGroup[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ groups: MaterialGroup[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ groups: MaterialGroup[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const groups = await this.materialService.getAllMaterialGroups();
            return res.status(200).send({
                success: true,
                message: "Material groups retrieved successfully",
                data: { groups }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getMaterialGroupById: RequestHandler<
        { id: string },
        ResponseModel<{ group: MaterialGroup }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ group: MaterialGroup }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ group: MaterialGroup }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const group = await this.materialService.getMaterialGroupById(req.params.id);
            if (!group) {
                return res.status(404).send({
                    success: false,
                    message: "Material group not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Material group retrieved successfully",
                data: { group }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getBalanceByMaterialAndStore: RequestHandler<
        { materialId: string; storeId: string },
        ResponseModel<{ balance: MaterialBalance }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ materialId: string; storeId: string }, ResponseModel<{ balance: MaterialBalance }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ balance: MaterialBalance }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const balance = await this.materialService.getBalanceByMaterialAndStore(
                req.params.materialId,
                req.params.storeId
            );
            if (!balance) {
                return res.status(404).send({
                    success: false,
                    message: "Material balance not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Material balance retrieved successfully",
                data: { balance }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getMaterialPrices: RequestHandler<
        { materialId: string },
        ResponseModel<{ prices: MaterialPrices[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ materialId: string }, ResponseModel<{ prices: MaterialPrices[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ prices: MaterialPrices[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const prices = await this.materialService.getMaterialPricesByMaterialId(req.params.materialId);
            return res.status(200).send({
                success: true,
                message: "Material prices retrieved successfully",
                data: { prices }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };
}