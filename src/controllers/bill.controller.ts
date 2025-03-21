import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { BillService } from "../services/bill.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { logger } from "../utils/logger";
import { Bill } from "../entities/Bill.entity";
import { BillMaterialDetail } from "../entities/BillMaterialDetails.entity";
import { BillDiscountsDetails } from "../entities/BillDiscountsDetails.entity";

@injectable()
export class BillController {
    constructor(
        @inject(DI_TYPES.BillService)
        private billService: BillService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        {
            bill: Partial<Bill>,
            materialDetails: Partial<BillMaterialDetail>[],
            discountDetails: Partial<BillDiscountsDetails>[]
        },
        unknown,
        any
    > = async (
        req: CustomRequest<
            unknown, 
            ResponseModel<Record<string, any>>,
            {
                bill: Partial<Bill>,
                materialDetails: Partial<BillMaterialDetail>[],
                discountDetails: Partial<BillDiscountsDetails>[]
            },
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const { bill, materialDetails, discountDetails } = req.body;
            const id = await this.billService.createBill(bill, materialDetails, discountDetails);
            
            if (!id) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create bill"
                });
            }

            return res.status(201).send({
                success: true,
                message: "Bill created successfully",
                data: { id }
            });
        } catch (error: any) {
            logger.error(`Error in create bill controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getById: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.billService.getBillById(req.params.id);
            if (!result.bill) {
                return res.status(404).send({
                    success: false,
                    message: "Bill not found"
                });
            }

            return res.status(200).send({
                success: true,
                message: "Bill retrieved successfully",
                data: result
            });
        } catch (error: any) {
            logger.error(`Error in get bill controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public update: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        {
            bill: Partial<Bill>,
            materialDetails: Partial<BillMaterialDetail>[],
            discountDetails: Partial<BillDiscountsDetails>[]
        },
        unknown,
        any
    > = async (
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            {
                bill: Partial<Bill>,
                materialDetails: Partial<BillMaterialDetail>[],
                discountDetails: Partial<BillDiscountsDetails>[]
            },
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const { bill, materialDetails, discountDetails } = req.body;
            const success = await this.billService.updateBill(
                req.params.id,
                bill,
                materialDetails,
                discountDetails
            );

            return res.status(200).send({
                success: true,
                message: success ? "Bill updated successfully" : "Failed to update bill"
            });
        } catch (error: any) {
            logger.error(`Error in update bill controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
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
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const success = await this.billService.deleteBill(req.params.id);
            return res.status(200).send({
                success: true,
                message: success ? "Bill deleted successfully" : "Failed to delete bill"
            });
        } catch (error: any) {
            logger.error(`Error in delete bill controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getByDateRange: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        unknown,
        { startDate: string; endDate: string },
        any
    > = async (
        req: CustomRequest<
            unknown,
            ResponseModel<Record<string, any>>,
            unknown,
            { startDate: string; endDate: string },
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const { startDate, endDate } = req.query;
            const bills = await this.billService.getBillsByDateRange(
                new Date(startDate),
                new Date(endDate)
            );

            return res.status(200).send({
                success: true,
                message: "Bills retrieved successfully",
                data: { bills }
            });
        } catch (error: any) {
            logger.error(`Error in get bills by date range controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getByTenant: RequestHandler<
        { tenantId: string },
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { tenantId: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const bills = await this.billService.getBillsByTenant(req.params.tenantId);
            return res.status(200).send({
                success: true,
                message: "Bills retrieved successfully",
                data: { bills }
            });
        } catch (error: any) {
            logger.error(`Error in get bills by tenant controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getByCustomer: RequestHandler<
        { customerAccountId: string },
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { customerAccountId: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const bills = await this.billService.getBillsByCustomer(req.params.customerAccountId);
            return res.status(200).send({
                success: true,
                message: "Bills retrieved successfully",
                data: { bills }
            });
        } catch (error: any) {
            logger.error(`Error in get bills by customer controller: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };
}