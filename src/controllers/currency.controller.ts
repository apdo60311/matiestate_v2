import { RequestHandler, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { CurrencyService } from "../services/currency.service";
import { Currency } from "../entities/Currency.entity";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";

@injectable()
export class CurrencyController {
    constructor(
        @inject(DI_TYPES.CurrencyService)
        private currencyService: CurrencyService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        Partial<Currency>,
        unknown
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, Partial<Currency>, unknown,any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const currencyId = await this.currencyService.createCurrency(req.body);
            if (!currencyId) {
                res.status(500).json({
                    success: false,
                    message: "Failed to create currency"
                });
                return;
            }
            res.status(201).json({
                success: true,
                message: "Currency created successfully",
                data: { id: currencyId }
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error?.message || "Internal server error"
            });
        }
    };

    public getAll: RequestHandler<
        unknown,
        ResponseModel<Currency[]>
    > = async (
        req: CustomRequest<unknown,ResponseModel<Currency[]>, unknown,any,any>,
        res: Response<ResponseModel<Currency[]>>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const currencies = await this.currencyService.getAllCurrencies();
            res.status(200).json({
                success: true,
                data: currencies,
                message: "Currencies retrieved successfully"
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error?.message || "Internal server error"
            });
        }
    };

    public getById: RequestHandler<
        { id: string },
        ResponseModel<Currency>,
        unknown
    > = async (
        req: CustomRequest<{ id: string },ResponseModel<Currency>, unknown,any,any>,
        res: Response<ResponseModel<Currency>>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const currency = await this.currencyService.getCurrencyById(req.params.id);
            if (!currency) {
                res.status(404).json({
                    success: false,
                    message: "Currency not found"
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: currency,
                message: "Currency retrieved successfully"
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error?.message || "Internal server error"
            });
        }
    };

    public update: RequestHandler<
        { id: string },
        ResponseModel<null>,
        Partial<Currency>
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<null>, Partial<Currency>,any,any>,
        res: Response<ResponseModel<null>>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const success = await this.currencyService.updateCurrency(req.params.id, req.body);
            if (!success) {
                res.status(500).json({
                    success: false,
                    message: "Failed to update currency"
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Currency updated successfully"
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error?.message || "Internal server error"
            });
        }
    };

    public delete: RequestHandler<
        { id: string },
        ResponseModel<null>
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<null>, unknown,any,any>,
        res: Response<ResponseModel<null>>,
        next: NextFunction
    ): Promise<void> => {
        try {
            const success = await this.currencyService.deleteCurrency(req.params.id);
            if (!success) {
                res.status(500).json({
                    success: false,
                    message: "Failed to delete currency"
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Currency deleted successfully"
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error?.message || "Internal server error"
            });
        }
    };
}