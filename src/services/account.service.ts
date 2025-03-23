import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { AccountRepository } from "../repositories/account/account.repository";
import { AccountAssemblyRepository } from "../repositories/account/account-assembly.repository";
import { AccountDistributiveRepository } from "../repositories/account/account-distributive.repository";
import { AccountAssembly } from "../entities/AccountAssembly.entity";
import { AccountDistributive } from "../entities/AccountDistributive.entity";
import { logger } from "../utils/logger";
import {
    IAccountBody,
    IAccountAssemblyBody,
    IAccountDistributiveBody,
    IAccountResponse
} from "../types/account.type";
import { MAIN_USERS_CODE, USER_CUSTOMER_CODE } from "@/constants/default.constants";

@injectable()
export class AccountService {
    constructor(
        @inject(DI_TYPES.AccountRepository)
        private accountRepository: AccountRepository,
        @inject(DI_TYPES.AccountAssemblyRepository)
        private accountAssemblyRepository: AccountAssemblyRepository,
        @inject(DI_TYPES.AccountDistributiveRepository)
        private accountDistributiveRepository: AccountDistributiveRepository
    ) { }

    // Account Methods
    async createAccount(data: IAccountBody): Promise<string | null> {
        try {
            return await this.accountRepository.createAccount(data);
        } catch (error) {
            logger.error(`Error creating account: ${error}`);
            throw error;
        }
    }

    async updateAccount(id: string, data: Partial<IAccountBody>): Promise<boolean> {
        try {
            return await this.accountRepository.updateAccount(id, data);
        } catch (error) {
            logger.error(`Error updating account: ${error}`);
            throw error;
        }
    }

    async getAccountById(id: string): Promise<IAccountResponse | null> {
        try {
            return await this.accountRepository.getAccountById(id);
        } catch (error) {
            logger.error(`Error getting account by id: ${error}`);
            throw error;
        }
    }

    async getAccountByCode(code: number): Promise<IAccountResponse | null> {
        try {
            return await this.accountRepository.getAccountByCode(code);
        } catch (error) {
            logger.error(`Error getting account by code: ${error}`);
            throw error;
        }
    }

    async getCustomersAccounts(): Promise<IAccountResponse[]> {
        try {

            const parentAccount = await this.getAccountByCode(MAIN_USERS_CODE.USER_CUSTOMER_CODE);

            if (!parentAccount) {
                throw new Error("Parent account not found");
            }

            const customerAccounts = await this.accountRepository.getAccountsByParrentId(parentAccount?.id);

            if (!customerAccounts) {
                throw new Error("Customer accounts not found");
            }

            return customerAccounts;
        } catch (error) {
            logger.error(`Error getting customers accounts: ${error}`);
            throw error;
        }
    }

    async getSuppliersAccounts(): Promise<IAccountResponse[]> {
        try {

            const parentAccount = await this.getAccountByCode(MAIN_USERS_CODE.USER_SUPPLIER_CODE);

            if (!parentAccount) {
                throw new Error("Parent account not found");
            }

            const supplierAccounts = await this.accountRepository.getAccountsByParrentId(parentAccount?.id);

            if (!supplierAccounts) {
                throw new Error("Customer accounts not found");
            }

            return supplierAccounts;
        } catch (error) {
            logger.error(`Error getting supplier accounts: ${error}`);
            throw error;
        }
    }

    async getAccounts(): Promise<IAccountResponse[]> {
        try {
            const customerParentAccount = await this.getAccountByCode(MAIN_USERS_CODE.USER_CUSTOMER_CODE);
            const supplierParentAccount = await this.getAccountByCode(MAIN_USERS_CODE.USER_SUPPLIER_CODE);

            if (!customerParentAccount || !supplierParentAccount) {
                throw new Error("Parent accounts not found");
            }

            const customerAccountsPromise = this.accountRepository.getAccountsByParrentId(customerParentAccount?.id);
            const supplierAccountsPromise = this.accountRepository.getAccountsByParrentId(supplierParentAccount?.id);

            const [customerAccounts, supplierAccounts] = await Promise.all([customerAccountsPromise, supplierAccountsPromise]);

            if (!customerAccounts || !supplierAccounts) {
                throw new Error("Customer or Supplier accounts not found");
            }
            return [...customerAccounts, ...supplierAccounts];

        } catch (error) {
            logger.error(`Error getting accounts: ${error}`);
            throw error;
        }
    }

    // Account Assembly Methods
    async createAccountAssembly(data: IAccountAssemblyBody): Promise<string | null> {
        try {
            return await this.accountAssemblyRepository.createAccountAssembly(data);
        } catch (error) {
            logger.error(`Error creating account assembly: ${error}`);
            throw error;
        }
    }

    async updateAccountAssembly(id: string, data: Partial<IAccountAssemblyBody>): Promise<boolean> {
        try {
            return await this.accountAssemblyRepository.updateAccountAssembly(id, data);
        } catch (error) {
            logger.error(`Error updating account assembly: ${error}`);
            throw error;
        }
    }

    async getAccountAssemblyById(id: string): Promise<AccountAssembly | null> {
        try {
            return await this.accountAssemblyRepository.getAccountAssemblyById(id);
        } catch (error) {
            logger.error(`Error getting account assembly by id: ${error}`);
            throw error;
        }
    }

    async getAccountAssemblies(): Promise<AccountAssembly[]> {
        try {
            return await this.accountAssemblyRepository.getAccountAssemblies();
        } catch (error) {
            logger.error(`Error getting account assemblies: ${error}`);
            throw error;
        }
    }

    async getAccountAssembliesByAccount(accountId: string): Promise<AccountAssembly[]> {
        try {
            return await this.accountAssemblyRepository.getAccountAssembliesByAccount(accountId);
        } catch (error) {
            logger.error(`Error getting account assemblies by account: ${error}`);
            throw error;
        }
    }

    // Account Distributive Methods
    async createAccountDistributive(data: IAccountDistributiveBody): Promise<string | null> {
        try {
            return await this.accountDistributiveRepository.createAccountDistributive(data);
        } catch (error) {
            logger.error(`Error creating account distributive: ${error}`);
            throw error;
        }
    }

    async updateAccountDistributive(id: string, data: Partial<IAccountDistributiveBody>): Promise<boolean> {
        try {
            return await this.accountDistributiveRepository.updateAccountDistributive(id, data);
        } catch (error) {
            logger.error(`Error updating account distributive: ${error}`);
            throw error;
        }
    }

    async getAccountDistributiveById(id: string): Promise<AccountDistributive | null> {
        try {
            return await this.accountDistributiveRepository.getAccountDistributiveById(id);
        } catch (error) {
            logger.error(`Error getting account distributive by id: ${error}`);
            throw error;
        }
    }

    async getAccountDistributives(): Promise<AccountDistributive[]> {
        try {
            return await this.accountDistributiveRepository.getAccountDistributives();
        } catch (error) {
            logger.error(`Error getting account distributives: ${error}`);
            throw error;
        }
    }

    async getAccountDistributivesByAccount(accountId: string): Promise<AccountDistributive[]> {
        try {
            return await this.accountDistributiveRepository.getAccountDistributivesByAccount(accountId);
        } catch (error) {
            logger.error(`Error getting account distributives by account: ${error}`);
            throw error;
        }
    }
}