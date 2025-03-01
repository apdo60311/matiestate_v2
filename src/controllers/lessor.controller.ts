import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { LessorService } from "../services/lessor.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { Lessor } from "../entities/Lessor.entity";
import { ILessorBody } from "../types/lessor.types";

@injectable()
export class LessorController {
    constructor(
        @inject(DI_TYPES.LessorService)
        private lessorService: LessorService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        ILessorBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, ILessorBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const lessorId = await this.lessorService.createLessor(req.body);
            if (!lessorId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create lessor"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Lessor created successfully",
                data: { id: lessorId }
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
        ResponseModel<{ lessors: Lessor[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ lessors: Lessor[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ lessors: Lessor[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const lessors = await this.lessorService.getAllLessors();
            return res.status(200).send({
                success: true,
                message: "Lessors retrieved successfully",
                data: { lessors }
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
        ResponseModel<{ lessor: Lessor }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ lessor: Lessor }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ lessor: Lessor }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const lessor = await this.lessorService.getLessorById(req.params.id);
            if (!lessor) {
                return res.status(404).send({
                    success: false,
                    message: "Lessor not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Lessor retrieved successfully",
                data: { lessor }
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
        Partial<Lessor>,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, Partial<Lessor>, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.lessorService.updateLessor(req.params.id, req.body);
            return res.status(200).send({
                success: result,
                message: result ? "Lessor updated successfully" : "Failed to update lessor"
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
            const result = await this.lessorService.deleteLessor(req.params.id);
            return res.status(200).send({
                success: result,
                message: result ? "Lessor deleted successfully" : "Failed to delete lessor"
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };
}