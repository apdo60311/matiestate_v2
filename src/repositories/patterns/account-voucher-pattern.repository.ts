import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { AccountingVoucherPattern } from "../../entities/AccountVoucherPattern.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class AccountingVoucherPatternRepository extends Repository<AccountingVoucherPattern> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(AccountingVoucherPattern, datasource.createEntityManager());
    }

    async createPattern(pattern: Partial<AccountingVoucherPattern>): Promise<string | null> {
        try {
            const result = await this.save(pattern);
            logger.info(`Accounting Voucher Pattern created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Accounting Voucher Pattern: ${error}`);
            throw error;
        }
    }

    async getPatternById(id: string): Promise<AccountingVoucherPattern | null> {
        try {
            const pattern = await this.findOne({
                where: { id },
                relations: [
                    'tenant',
                    'defaultAccount'
                ]
            });
            logger.info(`Retrieved Accounting Voucher Pattern with id: ${id}`);
            return pattern;
        } catch (error) {
            logger.error(`Error getting Accounting Voucher Pattern: ${error}`);
            throw error;
        }
    }

    async updatePattern(id: string, pattern: Partial<AccountingVoucherPattern>): Promise<boolean> {
        try {
            await this.update(id, pattern);
            logger.info(`Updated Accounting Voucher Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Accounting Voucher Pattern: ${error}`);
            throw error;
        }
    }

    async deletePattern(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Accounting Voucher Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting Accounting Voucher Pattern: ${error}`);
            throw error;
        }
    }

    async findByCode(code: number): Promise<AccountingVoucherPattern | null> {
        try {
            const pattern = await this.findOne({
                where: { code },
                relations: [
                    'tenant',
                    'defaultAccount'
                ]
            });
            logger.info(`Retrieved Accounting Voucher Pattern with code: ${code}`);
            return pattern;
        } catch (error) {
            logger.error(`Error getting Accounting Voucher Pattern by code: ${error}`);
            throw error;
        }
    }
    async findByTenant(tenant_id: string): Promise<AccountingVoucherPattern[] | null> {
        try {
            const patterns = await this.find({
                where: { tenant_id },
                relations: [
                    'tenant',
                    'defaultAccount'
                ]
            });
            logger.info(`Retrieved Accounting Voucher Patterns for tenant: ${tenant_id}`);
            return patterns;
        } catch (error) {
            logger.error(`Error getting Accounting Voucher Patterns by tenant: ${error}`);
            throw error;
        }
    }
}