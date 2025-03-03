import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { PatternService } from "../services/pattern.service";
import { logger } from "../utils/logger";
import { 
    IChequePatternBody, 
    IContractPatternBody,
    IBillPatternBody,
    IVoucherPatternBody,
    IAccountingVoucherPatternBody 
} from "../types/pattern.types";

@injectable()
export class PatternController {
    constructor(
        @inject(DI_TYPES.PatternService)
        private patternService: PatternService
    ) {}

    /* Cheque Pattern Controllers */
    public createChequePattern: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IChequePatternBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IChequePatternBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const id = await this.patternService.createChequePattern(req.body);
            return res.status(201).send({
                success: true,
                message: "Cheque pattern created successfully",
                data: { id: id! }
            });
        } catch (error: any) {
            logger.error(`Error creating cheque pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getChequePatternById: RequestHandler<
        { id: string },
        ResponseModel<{ pattern: IChequePatternBody }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ pattern: IChequePatternBody }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ pattern: IChequePatternBody }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const pattern = await this.patternService.getChequePatternById(req.params.id);
            if (!pattern) {
                return res.status(404).send({
                    success: false,
                    message: "Cheque pattern not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Cheque pattern retrieved successfully",
                data: { pattern }
            });
        } catch (error: any) {
            logger.error(`Error getting cheque pattern: ${error.message}`);
            return res.status(500).send({
                success: false, 
                message: error.message
            });
        }
    };

    public getAllChequePatterns: RequestHandler<
    unknown,
    ResponseModel<{ patterns: IChequePatternBody[] }>,
    unknown,
    unknown,
    any
> = async (req, res, next): Promise<any> => {
    try {
        const patterns = await this.patternService.getAllChequePatterns();
        return res.status(200).send({
            success: true,
            message: "Cheque patterns retrieved successfully",
            data: { patterns }
        });
    } catch (error: any) {
        logger.error(`Error getting cheque patterns: ${error.message}`);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

    /* Contract Pattern Controllers */
    public createContractPattern: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IContractPatternBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IContractPatternBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction  
    ): Promise<any> => {
        try {
            const id = await this.patternService.createContractPattern(req.body);
            return res.status(201).send({
                success: true,
                message: "Contract pattern created successfully",
                data: { id: id! }
            });
        } catch (error: any) {
            logger.error(`Error creating contract pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getContractPatternById: RequestHandler<
        { id: string },
        ResponseModel<{ pattern: IContractPatternBody }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ pattern: IContractPatternBody }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ pattern: any }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const pattern = await this.patternService.getContractPatternById(req.params.id);
            if (!pattern) {
                return res.status(404).send({
                    success: false,
                    message: "Contract pattern not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Contract pattern retrieved successfully",
                data: { pattern }
            });
        } catch (error: any) {
            logger.error(`Error getting contract pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAllContractPatterns: RequestHandler<
    unknown,
    ResponseModel<{ patterns: any[] }>,
    unknown,
    unknown,
    any
> = async (req, res, next): Promise<any> => {
    try {
        const patterns = await this.patternService.getAllContractPatterns();
        return res.status(200).send({
            success: true,
            message: "Contract patterns retrieved successfully", 
            data: { patterns }
        });
    } catch (error: any) {
        logger.error(`Error getting contract patterns: ${error.message}`);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

    /* Bill Pattern Controllers */
    public createBillPattern: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IBillPatternBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IBillPatternBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const id = await this.patternService.createBillPattern(req.body);
            return res.status(201).send({
                success: true,
                message: "Bill pattern created successfully",
                data: { id: id! }
            });
        } catch (error: any) {
            logger.error(`Error creating bill pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getBillPatternById: RequestHandler<
        { id: string },
        ResponseModel<{ pattern: IBillPatternBody }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ pattern: IBillPatternBody }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ pattern: IBillPatternBody }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const pattern = await this.patternService.getBillPatternById(req.params.id);
            if (!pattern) {
                return res.status(404).send({
                    success: false,
                    message: "Bill pattern not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Bill pattern retrieved successfully",
                data: { pattern }
            });
        } catch (error: any) {
            logger.error(`Error getting bill pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAllBillPatterns: RequestHandler<
    unknown,
    ResponseModel<{ patterns: IBillPatternBody[] }>,
    unknown,
    unknown,
    any
> = async (req, res, next): Promise<any> => {
    try {
        const patterns = await this.patternService.getAllBillPatterns();
        return res.status(200).send({
            success: true,
            message: "Bill patterns retrieved successfully",
            data: { patterns }
        });
    } catch (error: any) {
        logger.error(`Error getting bill patterns: ${error.message}`);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

    /* Voucher Pattern Controllers */
    public createVoucherPattern: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IVoucherPatternBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IVoucherPatternBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const id = await this.patternService.createVoucherPattern(req.body);
            return res.status(201).send({
                success: true,
                message: "Voucher pattern created successfully",
                data: { id: id! }
            });
        } catch (error: any) {
            logger.error(`Error creating voucher pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getVoucherPatternById: RequestHandler<
        { id: string },
        ResponseModel<{ pattern: IVoucherPatternBody }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ pattern: IVoucherPatternBody }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ pattern: IVoucherPatternBody }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const pattern = await this.patternService.getVoucherPatternById(req.params.id);
            if (!pattern) {
                return res.status(404).send({
                    success: false,
                    message: "Voucher pattern not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Voucher pattern retrieved successfully",
                data: { pattern }
            });
        } catch (error: any) {
            logger.error(`Error getting voucher pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAllVoucherPatterns: RequestHandler<
    unknown,
    ResponseModel<{ patterns: IVoucherPatternBody[] }>,
    unknown,
    unknown,
    any
> = async (req, res, next): Promise<any> => {
    try {
        const patterns = await this.patternService.getAllVoucherPatterns();
        return res.status(200).send({
            success: true,
            message: "Voucher patterns retrieved successfully",
            data: { patterns }
        });
    } catch (error: any) {
        logger.error(`Error getting voucher patterns: ${error.message}`);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

    /* Accounting Voucher Pattern Controllers */
    public createAccountingVoucherPattern: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IAccountingVoucherPatternBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IAccountingVoucherPatternBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const id = await this.patternService.createAccountingVoucherPattern(req.body);
            return res.status(201).send({
                success: true,
                message: "Accounting voucher pattern created successfully",
                data: { id: id! }
            });
        } catch (error: any) {
            logger.error(`Error creating accounting voucher pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAccountingVoucherPatternById: RequestHandler<
        { id: string },
        ResponseModel<{ pattern: IAccountingVoucherPatternBody }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ pattern: IAccountingVoucherPatternBody }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ pattern: IAccountingVoucherPatternBody }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const pattern = await this.patternService.getAccountingVoucherPatternById(req.params.id);
            if (!pattern) {
                return res.status(404).send({
                    success: false,
                    message: "Accounting voucher pattern not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Accounting voucher pattern retrieved successfully",
                data: { pattern }
            });
        } catch (error: any) {
            logger.error(`Error getting accounting voucher pattern: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };
    
    public getAllAccountingVoucherPatterns: RequestHandler<
    unknown,
    ResponseModel<{ patterns: IAccountingVoucherPatternBody[] }>,
    unknown,
    unknown,
    any
> = async (req, res, next): Promise<any> => {
    try {
        const patterns = await this.patternService.getAllAccountingVoucherPatterns();
        return res.status(200).send({
            success: true,
            message: "Accounting voucher patterns retrieved successfully",
            data: { patterns }
        });
    } catch (error: any) {
        logger.error(`Error getting accounting voucher patterns: ${error.message}`);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
}