import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { Bank } from "../entities/Bank.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class BankRepository extends Repository<Bank> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Bank, datasource.createEntityManager());
    }

    async createBank(bank: Partial<Bank>): Promise<string | null> {
        try {
            const result = await this.save(bank);
            logger.info(`Bank created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Bank. ${error}`);
            return null;
        }
    }

    async getBankById(id: string): Promise<Bank | null> {
        try {
            return await this.findOne({ where: { id } });
        } catch (error) {
            logger.error(`Error while fetching Bank. ${error}`);
            return null;
        }
    }

    async getAllBanks(): Promise<Bank[]> {
        try {
            return await this.find();
        } catch (error) {
            logger.error(`Error while fetching Banks. ${error}`);
            return [];
        }
    }

    async updateBank(id: string, bank: Partial<Bank>): Promise<boolean> {
        try {
            await this.update(id, bank);
            logger.info(`Bank updated successfully with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Bank. ${error}`);
            return false;
        }
    }

    async deleteBank(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Bank deleted successfully with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Bank. ${error}`);
            return false;
        }
    }
}