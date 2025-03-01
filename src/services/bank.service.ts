import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Bank } from "../entities/Bank.entity";
import { BankRepository } from "../repositories/bank.repository";
import { logger } from "../utils/logger";

@injectable()
export class BankService {
    constructor(
        @inject(DI_TYPES.BankRepository)
        private bankRepository: BankRepository
    ) {}

    async createBank(bankData: Partial<Bank>): Promise<string | null> {
        try {
            return await this.bankRepository.createBank(bankData);
        } catch (error) {
            logger.error(`Error creating bank: ${error}`);
            return null;
        }
    }

    async getBankById(id: string): Promise<Bank | null> {
        try {
            return await this.bankRepository.getBankById(id);
        } catch (error) {
            logger.error(`Error getting bank by id: ${error}`);
            return null;
        }
    }

    async getAllBanks(): Promise<Bank[]> {
        try {
            return await this.bankRepository.getAllBanks();
        } catch (error) {
            logger.error(`Error getting all banks: ${error}`);
            return [];
        }
    }

    async updateBank(id: string, bankData: Partial<Bank>): Promise<boolean> {
        try {
            return await this.bankRepository.updateBank(id, bankData);
        } catch (error) {
            logger.error(`Error updating bank: ${error}`);
            return false;
        }
    }

    async deleteBank(id: string): Promise<boolean> {
        try {
            return await this.bankRepository.deleteBank(id);
        } catch (error) {
            logger.error(`Error deleting bank: ${error}`);
            return false;
        }
    }
}