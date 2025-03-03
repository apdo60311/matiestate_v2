import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ChequePattern } from "../../entities/ChequePattern.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ChequePatternRepository extends Repository<ChequePattern> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ChequePattern, datasource.createEntityManager());
    }

    async createPattern(pattern: Partial<ChequePattern>): Promise<string | null> {
        try {
            const result = await this.save(pattern);
            logger.info(`Cheque Pattern created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Cheque Pattern: ${error}`);
            throw error;
        }
    }

    async getPatternById(id: string): Promise<ChequePattern | null> {
        try {
            const pattern = await this.findOne({
                where: { id },
                relations: [
                    'tenant',
                    'defaultAccount',
                    'deportableDebitAccount',
                    'deportableCreditAccount'
                ]
            });
            logger.info(`Retrieved Cheque Pattern with id: ${id}`);
            return pattern;
        } catch (error) {
            logger.error(`Error getting Cheque Pattern: ${error}`);
            throw error;
        }
    }

    async updatePattern(id: string, pattern: Partial<ChequePattern>): Promise<boolean> {
        try {
            await this.update(id, pattern);
            logger.info(`Updated Cheque Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Cheque Pattern: ${error}`);
            throw error;
        }
    }

    async deletePattern(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Cheque Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting Cheque Pattern: ${error}`);
            throw error;
        }
    }
}