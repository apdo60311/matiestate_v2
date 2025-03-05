import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { VoucherService } from "../services/voucher.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { logger } from "../utils/logger";
import { IVoucherBody, IVoucherGridDataBody, IVoucherMainDataBody } from "../types/voucher.types";
import { VoucherMainData } from "../entities/VoucherMainData.entity";
import { VoucherGridData } from "../entities/VoucherGridData.entity";
import { VoucherPictures } from "../entities/VoucherPictures.entity";

@injectable()
export class VoucherController {
    constructor(
        @inject(DI_TYPES.VoucherService)
        private voucherService: VoucherService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IVoucherBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IVoucherBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const voucherId = await this.voucherService.createVoucherWithDetails(req.body);
            if (!voucherId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create voucher"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Voucher created successfully",
                data: { id: voucherId }
            });
        } catch (error: any) {
            logger.error(`Error in create voucher controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getById: RequestHandler<
        { id: string },
        ResponseModel<{ voucher: VoucherMainData }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const voucher = await this.voucherService.getVoucherById(req.params.id);
            if (!voucher) {
                return res.status(404).send({
                    success: false,
                    message: "Voucher not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Voucher retrieved successfully",
                data: { voucher }
            });
        } catch (error: any) {
            logger.error(`Error in get voucher controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAll: RequestHandler<
        unknown,
        ResponseModel<{ vouchers: VoucherMainData[] }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const vouchers = await this.voucherService.getVouchers();
            if (!vouchers) {
                return res.status(404).send({
                    success: false,
                    message: "Vouchers not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Vouchers retrieved successfully",
                data: {
                    vouchers
                }
            });
        } catch (error: any) {
            logger.error(`Error in get vouchers controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };


    public getGridEntries: RequestHandler<
        { id: string },
        ResponseModel<{ entries: VoucherGridData[] }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const entries = await this.voucherService.getVoucherGridEntries(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Voucher grid entries retrieved successfully",
                data: { entries }
            });
        } catch (error: any) {
            logger.error(`Error in get grid entries controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getPictures: RequestHandler<
        { id: string },
        ResponseModel<{ pictures: VoucherPictures[] }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const pictures = await this.voucherService.getVoucherPictures(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Voucher pictures retrieved successfully",
                data: { pictures }
            });
        } catch (error: any) {
            logger.error(`Error in get pictures controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };
}