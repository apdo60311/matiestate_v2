import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { VoucherPattern } from "../../entities/VoucherPattern.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class VoucherPatternRepository extends Repository<VoucherPattern> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(VoucherPattern, datasource.createEntityManager());
    }

    async createPattern(pattern: Partial<VoucherPattern>): Promise<string | null> {
        try {
            const result = await this.save(pattern);
            logger.info(`Voucher Pattern created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Voucher Pattern: ${error}`);
            throw error;
        }
    }

    async getPatternById(id: string): Promise<VoucherPattern | null> {
        try {
            const pattern = await this.findOne({
                where: { id },
                relations: [
                    'tenant',
                    'defaultAccount'
                ]
            });
            logger.info(`Retrieved Voucher Pattern with id: ${id}`);
            return pattern;
        } catch (error) {
            logger.error(`Error getting Voucher Pattern: ${error}`);
            throw error;
        }
    }

    async updatePattern(id: string, pattern: Partial<VoucherPattern>): Promise<boolean> {
        try {
            await this.update(id, pattern);
            logger.info(`Updated Voucher Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Voucher Pattern: ${error}`);
            throw error;
        }
    }

    async deletePattern(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Voucher Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting Voucher Pattern: ${error}`);
            throw error;
        }
    }
}