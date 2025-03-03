import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { BillPattern } from "../../entities/BillPattern.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class BillPatternRepository extends Repository<BillPattern> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(BillPattern, datasource.createEntityManager());
    }

    async createPattern(pattern: Partial<BillPattern>): Promise<string | null> {
        try {
            const result = await this.save(pattern);
            logger.info(`Bill Pattern created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Bill Pattern: ${error}`);
            throw error;
        }
    }

    async getPatternById(id: string): Promise<BillPattern | null> {
        try {
            const pattern = await this.findOne({
                where: { id },
                relations: [
                    'tenant',
                    'defaultStore',
                    'costCenter',
                    'materialAccount',
                    'currency'
                ]
            });
            logger.info(`Retrieved Bill Pattern with id: ${id}`);
            return pattern;
        } catch (error) {
            logger.error(`Error getting Bill Pattern: ${error}`);
            throw error;
        }
    }

    async updatePattern(id: string, pattern: Partial<BillPattern>): Promise<boolean> {
        try {
            await this.update(id, pattern);
            logger.info(`Updated Bill Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Bill Pattern: ${error}`);
            throw error;
        }
    }

    async deletePattern(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Bill Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting Bill Pattern: ${error}`);
            throw error;
        }
    }
}