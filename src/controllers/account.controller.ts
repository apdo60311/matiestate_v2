import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { AccountService } from "../services/account.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { logger } from "../utils/logger";
import { IAccountBody, IAccountResponse, IAccountAssemblyBody, IAccountDistributiveBody } from "../types/account.types";
import { AccountDistributive } from "../entities/AccountDistributive.entity";
import { AccountAssembly } from "../entities/AccountAssembly.entity";

@injectable()
export class AccountController {
    constructor(
        @inject(DI_TYPES.AccountService)
        private accountService: AccountService
    ) { }

    public createAccount: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IAccountBody,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IAccountBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const id = await this.accountService.createAccount(req.body);
                return res.status(201).send({
                    success: true,
                    message: "Account created successfully",
                    data: { id: id! }
                });
            } catch (error: any) {
                logger.error(`Error creating account: ${error.message}`);
                return res.status(500).send({
                    success: false,
                    message: error.message
                });
            }
        };

    public getAccountById: RequestHandler<
        { id: string },
        ResponseModel<{ account: IAccountResponse }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const account = await this.accountService.getAccountById(req.params.id);
            if (!account) {
                return res.status(404).send({
                    success: false,
                    message: "Account not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Account retrieved successfully",
                data: { account }
            });
        } catch (error: any) {
            logger.error(`Error getting account: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAccounts: RequestHandler<
        unknown,
        ResponseModel<{ accounts: IAccountResponse[] }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const accounts = await this.accountService.getAccounts();
            return res.status(200).send({
                success: true,
                message: "Accounts retrieved successfully",
                data: { accounts }
            });
        } catch (error: any) {
            logger.error(`Error getting accounts: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getCustomerAccounts: RequestHandler<
        unknown,
        ResponseModel<{ accounts: IAccountResponse[] }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const accounts = await this.accountService.getCustomersAccounts();
            return res.status(200).send({
                success: true,
                message: "Customer accounts retrieved successfully",
                data: { accounts }
            });
        } catch (error: any) {
            logger.error(`Error getting customer accounts: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getSupplierAccounts: RequestHandler<
        unknown,
        ResponseModel<{ accounts: IAccountResponse[] }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const accounts = await this.accountService.getSuppliersAccounts();
            return res.status(200).send({
                success: true,
                message: "Supplier accounts retrieved successfully",
                data: { accounts }
            });
        } catch (error: any) {
            logger.error(`Error getting supplier accounts: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    // Account Assembly Controllers
    public createAccountAssembly: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IAccountAssemblyBody,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const id = await this.accountService.createAccountAssembly(req.body);
            return res.status(201).send({
                success: true,
                message: "Account assembly created successfully",
                data: { id: id! }
            });
        } catch (error: any) {
            logger.error(`Error creating account assembly: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAccountAssemblyById: RequestHandler<
        { id: string },
        ResponseModel<{ assembly: AccountAssembly }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const assembly = await this.accountService.getAccountAssemblyById(req.params.id);
            if (!assembly) {
                return res.status(404).send({
                    success: false,
                    message: "Account assembly not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Account assembly retrieved successfully",
                data: { assembly }
            });
        } catch (error: any) {
            logger.error(`Error getting account assembly: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    // Account Distributive Controllers
    public createAccountDistributive: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IAccountDistributiveBody,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const id = await this.accountService.createAccountDistributive(req.body);
            return res.status(201).send({
                success: true,
                message: "Account distributive created successfully",
                data: { id: id! }
            });
        } catch (error: any) {
            logger.error(`Error creating account distributive: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getAccountDistributiveById: RequestHandler<
        { id: string },
        ResponseModel<{ distributive: AccountDistributive }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const distributive = await this.accountService.getAccountDistributiveById(req.params.id);
            if (!distributive) {
                return res.status(404).send({
                    success: false,
                    message: "Account distributive not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Account distributive retrieved successfully",
                data: { distributive }
            });
        } catch (error: any) {
            logger.error(`Error getting account distributive: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };

    public getLeafAccounts: RequestHandler<
        unknown,
        ResponseModel<{ accounts: IAccountResponse[] }>,
        unknown,
        unknown,
        any
    > = async (req, res, next): Promise<any> => {
        try {
            const accounts = await this.accountService.getLeafAccounts();
            return res.status(200).send({
                success: true,
                message: "Leaf accounts retrieved successfully",
                data: { accounts }
            });
        } catch (error: any) {
            logger.error(`Error getting leaf accounts: ${error.message}`);
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    }
}