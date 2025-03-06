import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { ChequeService } from "../services/cheque.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { logger } from "../utils/logger";
import { Cheque } from "../entities/Cheque.entity";
import { IChequeBody, IChequeMainDataBody } from "../types/cheque.types";

@injectable()
export class ChequeController {
    constructor(
        @inject(DI_TYPES.ChequeService)
        private chequeService: ChequeService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IChequeBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IChequeBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const chequeId = await this.chequeService.createCheque(req.body.mainData);
            if (!chequeId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create cheque"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Cheque created successfully",
                data: { id: chequeId }
            });
        } catch (error: any) {
            logger.error(`Error in create cheque controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getById: RequestHandler<
        { id: string },
        ResponseModel<{ cheque: Cheque }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const cheque = await this.chequeService.getChequeById(req.params.id);
            if (!cheque) {
                return res.status(404).send({
                    success: false,
                    message: "Cheque not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Cheque retrieved successfully",
                data: { cheque }
            });
        } catch (error: any) {
            logger.error(`Error in get cheque controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAll: RequestHandler<
        unknown,
        ResponseModel<{ cheques: Cheque[] }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const cheques = await this.chequeService.getCheques();
            if (!cheques) {
                return res.status(404).send({
                    success: false,
                    message: "Cheques not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Cheques retrieved successfully",
                data: { cheques }
            });
        } catch (error: any) {
            logger.error(`Error in get cheques controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public update: RequestHandler<
        { id: string },
        ResponseModel<{ success: boolean }>,
        IChequeMainDataBody,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const success = await this.chequeService.updateCheque(req.params.id, req.body);
            if (!success) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to update cheque"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Cheque updated successfully"
            });
        } catch (error: any) {
            logger.error(`Error in update cheque controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };
}