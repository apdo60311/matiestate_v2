import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { ChequePattern } from "../entities/ChequePattern.entity";
import { ContractPattern } from "../entities/ContractPattern.entity";
import { BillPattern } from "../entities/BillPattern.entity";
import { VoucherPattern } from "../entities/VoucherPattern.entity";
import { AccountingVoucherPattern } from "../entities/AccountVoucherPattern.entity";
import { ChequePatternRepository } from "../repositories/patterns/cheque-pattern.repository";
import { ContractPatternRepository } from "../repositories/patterns/contract-pattern.repository";
import { BillPatternRepository } from "../repositories/patterns/bill-pattern.repository";
import { VoucherPatternRepository } from "../repositories/patterns/voucher-pattern.repository";
import { AccountingVoucherPatternRepository } from "../repositories/patterns/account-voucher-pattern.repository";
import { logger } from "../utils/logger";
import { IAccountingVoucherPatternBody, IBillPatternBody, IChequePatternBody, IContractPatternBody, IVoucherPatternBody } from "../types/pattern.types";

@injectable()
export class PatternService {
    constructor(
        @inject(DI_TYPES.ChequePatternRepository)
        private chequePatternRepository: ChequePatternRepository,
        @inject(DI_TYPES.ContractPatternRepository)
        private contractPatternRepository: ContractPatternRepository,
        @inject(DI_TYPES.BillPatternRepository)
        private billPatternRepository: BillPatternRepository,
        @inject(DI_TYPES.VoucherPatternRepository)
        private voucherPatternRepository: VoucherPatternRepository,
        @inject(DI_TYPES.AccountingVoucherPatternRepository)
        private accountingVoucherPatternRepository: AccountingVoucherPatternRepository
    ) { }

    // Cheque Pattern Methods
    async createChequePattern(pattern: IChequePatternBody): Promise<string | null> {
        try {
            return await this.chequePatternRepository.createPattern(pattern);
        } catch (error) {
            logger.error(`Error creating cheque pattern: ${error}`);
            throw error;
        }
    }

    async getChequePatternById(id: string): Promise<ChequePattern | null> {
        try {
            return await this.chequePatternRepository.getPatternById(id);
        } catch (error) {
            logger.error(`Error getting cheque pattern: ${error}`);
            throw error;
        }
    }

    async updateChequePattern(id: string, pattern: Partial<ChequePattern>): Promise<boolean> {
        try {
            return await this.chequePatternRepository.updatePattern(id, pattern);
        } catch (error) {
            logger.error(`Error updating cheque pattern: ${error}`);
            throw error;
        }
    }

    async deleteChequePattern(id: string): Promise<boolean> {
        try {
            return await this.chequePatternRepository.deletePattern(id);
        } catch (error) {
            logger.error(`Error deleting cheque pattern: ${error}`);
            throw error;
        }
    }

    // Contract Pattern Methods
    async createContractPattern(pattern: IContractPatternBody): Promise<string | null> {
        try {
            return await this.contractPatternRepository.createPattern(pattern);
        } catch (error) {
            logger.error(`Error creating contract pattern: ${error}`);
            throw error;
        }
    }

    async getContractPatternById(id: string): Promise<ContractPattern | null> {
        try {
            return await this.contractPatternRepository.getPatternById(id);
        } catch (error) {
            logger.error(`Error getting contract pattern: ${error}`);
            throw error;
        }
    }

    async updateContractPattern(id: string, pattern: Partial<ContractPattern>): Promise<boolean> {
        try {
            return await this.contractPatternRepository.updatePattern(id, pattern);
        } catch (error) {
            logger.error(`Error updating contract pattern: ${error}`);
            throw error;
        }
    }

    async deleteContractPattern(id: string): Promise<boolean> {
        try {
            return await this.contractPatternRepository.deletePattern(id);
        } catch (error) {
            logger.error(`Error deleting contract pattern: ${error}`);
            throw error;
        }
    }

    // Bill Pattern Methods
    async createBillPattern(pattern: IBillPatternBody): Promise<string | null> {
        try {
            return await this.billPatternRepository.createPattern(pattern);
        } catch (error) {
            logger.error(`Error creating bill pattern: ${error}`);
            throw error;
        }
    }

    async getBillPatternById(id: string): Promise<BillPattern | null> {
        try {
            return await this.billPatternRepository.getPatternById(id);
        } catch (error) {
            logger.error(`Error getting bill pattern: ${error}`);
            throw error;
        }
    }

    async updateBillPattern(id: string, pattern: Partial<BillPattern>): Promise<boolean> {
        try {
            return await this.billPatternRepository.updatePattern(id, pattern);
        } catch (error) {
            logger.error(`Error updating bill pattern: ${error}`);
            throw error;
        }
    }

    async deleteBillPattern(id: string): Promise<boolean> {
        try {
            return await this.billPatternRepository.deletePattern(id);
        } catch (error) {
            logger.error(`Error deleting bill pattern: ${error}`);
            throw error;
        }
    }

    // Voucher Pattern Methods
    async createVoucherPattern(pattern: IVoucherPatternBody): Promise<string | null> {
        try {
            return await this.voucherPatternRepository.createPattern(pattern);
        } catch (error) {
            logger.error(`Error creating voucher pattern: ${error}`);
            throw error;
        }
    }

    async getVoucherPatternById(id: string): Promise<VoucherPattern | null> {
        try {
            return await this.voucherPatternRepository.getPatternById(id);
        } catch (error) {
            logger.error(`Error getting voucher pattern: ${error}`);
            throw error;
        }
    }

    async updateVoucherPattern(id: string, pattern: Partial<VoucherPattern>): Promise<boolean> {
        try {
            return await this.voucherPatternRepository.updatePattern(id, pattern);
        } catch (error) {
            logger.error(`Error updating voucher pattern: ${error}`);
            throw error;
        }
    }

    async deleteVoucherPattern(id: string): Promise<boolean> {
        try {
            return await this.voucherPatternRepository.deletePattern(id);
        } catch (error) {
            logger.error(`Error deleting voucher pattern: ${error}`);
            throw error;
        }
    }

    // Accounting Voucher Pattern Methods  
    async createAccountingVoucherPattern(pattern: IAccountingVoucherPatternBody): Promise<string | null> {
        try {
            return await this.accountingVoucherPatternRepository.createPattern(pattern);
        } catch (error) {
            logger.error(`Error creating accounting voucher pattern: ${error}`);
            throw error;
        }
    }

    async getAccountingVoucherPatternById(id: string): Promise<AccountingVoucherPattern | null> {
        try {
            return await this.accountingVoucherPatternRepository.getPatternById(id);
        } catch (error) {
            logger.error(`Error getting accounting voucher pattern: ${error}`);
            throw error;
        }
    }

    async updateAccountingVoucherPattern(id: string, pattern: Partial<AccountingVoucherPattern>): Promise<boolean> {
        try {
            return await this.accountingVoucherPatternRepository.updatePattern(id, pattern);
        } catch (error) {
            logger.error(`Error updating accounting voucher pattern: ${error}`);
            throw error;
        }
    }

    async deleteAccountingVoucherPattern(id: string): Promise<boolean> {
        try {
            return await this.accountingVoucherPatternRepository.deletePattern(id);
        } catch (error) {
            logger.error(`Error deleting accounting voucher pattern: ${error}`);
            throw error;
        }
    }

    // Get all cheque patterns
    async getAllChequePatterns(): Promise<ChequePattern[]> {
        try {
            return await this.chequePatternRepository.find({
                relations: ['tenant', 'defaultAccount']
            });
        } catch (error) {
            logger.error(`Error getting all cheque patterns: ${error}`);
            throw error;
        }
    }

    // Get all contract patterns 
    async getAllContractPatterns(): Promise<ContractPattern[]> {
        try {
            return await this.contractPatternRepository.find({
                relations: ['tenant', 'defaultRevenueAccount']
            });
        } catch (error) {
            logger.error(`Error getting all contract patterns: ${error}`);
            throw error;
        }
    }

    // Get all bill patterns
    async getAllBillPatterns(): Promise<BillPattern[]> {
        try {
            return await this.billPatternRepository.find({
                relations: ['tenant', 'defaultStore']
            });
        } catch (error) {
            logger.error(`Error getting all bill patterns: ${error}`);
            throw error;
        }
    }

    // Get all voucher patterns
    async getAllVoucherPatterns(): Promise<VoucherPattern[]> {
        try {
            return await this.voucherPatternRepository.find({
                relations: ['tenant', 'defaultAccount']
            });
        } catch (error) {
            logger.error(`Error getting all voucher patterns: ${error}`);
            throw error;
        }
    }

    // Get all accounting voucher patterns
    async getAllAccountingVoucherPatterns(): Promise<AccountingVoucherPattern[]> {
        try {
            return await this.accountingVoucherPatternRepository.find({
                relations: ['tenant', 'defaultAccount']
            });
        } catch (error) {
            logger.error(`Error getting all accounting voucher patterns: ${error}`);
            throw error;
        }
    }

    async getChequePatternByCode(code: number): Promise<ChequePattern | null> {
        try {
            return await this.chequePatternRepository.findByCode(code);
        } catch (error) {
            logger.error(`Error getting cheque pattern by code: ${error}`);
            return null;
        }
    }

    async getBillPatternByCode(code: number): Promise<BillPattern | null> {
        try {
            return await this.billPatternRepository.findByCode(code);
        } catch (error) {
            logger.error(`Error getting bill pattern by code: ${error}`);
            return null;
        }
    }

    async getContractPatternByCode(code: number): Promise<ContractPattern | null> {
        try {
            return await this.contractPatternRepository.findByCode(code);
        } catch (error) {
            logger.error(`Error getting contract pattern by code: ${error}`);
            return null;
        }
    }

    async getVoucherPatternByCode(code: number): Promise<VoucherPattern | null> {
        try {
            return await this.voucherPatternRepository.findByCode(code);
        } catch (error) {
            logger.error(`Error getting voucher pattern by code: ${error}`);
            return null;
        }
    }

    async getAccountingVoucherPatternByCode(code: number): Promise<AccountingVoucherPattern | null> {
        try {
            return await this.accountingVoucherPatternRepository.findByCode(code);
        } catch (error) {
            logger.error(`Error getting accounting voucher pattern by code: ${error}`);
            return null;
        }
    }

    async getPatternsByTenant(tenantId: string): Promise<{
        chequePatterns: ChequePattern[];
        contractPatterns: ContractPattern[];
        billPatterns: BillPattern[];
        voucherPatterns: VoucherPattern[];
        accountingVoucherPatterns: AccountingVoucherPattern[];
    }> {
        try {
            let [
                chequePatterns,
                contractPatterns,
                billPatterns,
                voucherPatterns,
                accountingVoucherPatterns
            ] = await Promise.all([
                this.chequePatternRepository.findByTenant(tenantId),
                this.contractPatternRepository.findByTenant(tenantId),
                this.billPatternRepository.findByTenant(tenantId),
                this.voucherPatternRepository.findByTenant(tenantId),
                this.accountingVoucherPatternRepository.findByTenant(tenantId)
            ]);

            chequePatterns ??= [];
            contractPatterns ??= [];
            billPatterns ??= [];
            voucherPatterns ??= [];
            accountingVoucherPatterns ??= [];

            return {
                chequePatterns,
                contractPatterns,
                billPatterns,
                voucherPatterns,
                accountingVoucherPatterns
            };
        } catch (error) {
            logger.error(`Error getting patterns by tenant: ${error}`);
            throw error;
        }
    }

    async validatePattern(patternId: string, type: string): Promise<boolean> {
        try {
            switch (type) {
                case 'cheque':
                    return !!(await this.getChequePatternById(patternId));
                case 'contract':
                    return !!(await this.getContractPatternById(patternId));
                case 'bill':
                    return !!(await this.getBillPatternById(patternId));
                case 'voucher':
                    return !!(await this.getVoucherPatternById(patternId));
                case 'accounting':
                    return !!(await this.getAccountingVoucherPatternById(patternId));
                default:
                    return false;
            }
        } catch (error) {
            logger.error(`Error validating pattern: ${error}`);
            return false;
        }
    }

}