// src/controllers/bank.controller.ts
import { RequestHandler, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { BankService } from "../services/bank.service";
import { Bank } from "../entities/Bank.entity";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";

@injectable()
export class BankController {
    constructor(
        @inject(DI_TYPES.BankService)
        private bankService: BankService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        Partial<Bank>,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, Partial<Bank>, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const bankId = await this.bankService.createBank(req.body);
            if (!bankId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create bank"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Bank created successfully",
                data: { id: bankId }
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
        ResponseModel<{ banks: Bank[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ banks: Bank[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ banks: Bank[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const banks = await this.bankService.getAllBanks();
            return res.status(200).send({
                success: true,
                message: "Banks retrieved successfully",
                data: { banks }
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
        ResponseModel<{ bank: Bank }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ bank: Bank }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ bank: Bank }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const bank = await this.bankService.getBankById(req.params.id);
            if (!bank) {
                return res.status(404).send({
                    success: false,
                    message: "Bank not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Bank retrieved successfully",
                data: { bank }
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
        Partial<Bank>,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, Partial<Bank>, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.bankService.updateBank(req.params.id, req.body);
            return res.status(200).send({
                success: result,
                message: result ? "Bank updated successfully" : "Failed to update bank"
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
            const result = await this.bankService.deleteBank(req.params.id);
            return res.status(200).send({
                success: result,
                message: result ? "Bank deleted successfully" : "Failed to delete bank"
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };
}