import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ContractPattern } from "../../entities/ContractPattern.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractPatternRepository extends Repository<ContractPattern> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ContractPattern, datasource.createEntityManager());
    }

    async createPattern(pattern: Partial<ContractPattern>): Promise<string | null> {
        try {
            const result = await this.save(pattern);
            logger.info(`Contract Pattern created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Contract Pattern: ${error}`);
            throw error;
        }
    }

    async getPatternById(id: string): Promise<ContractPattern | null> {
        try {
            const pattern = await this.findOne({
                where: { id },
                relations: [
                    'tenant',
                    'defaultRevenueAccount',
                    'defaultCommissionFromClientAccount',
                    'defaultCommissionFromOwnerAccount'
                ]
            });
            logger.info(`Retrieved Contract Pattern with id: ${id}`);
            return pattern;
        } catch (error) {
            logger.error(`Error getting Contract Pattern: ${error}`);
            throw error;
        }
    }

    async getPatternByCode(code: number): Promise<ContractPattern | null> {
        try {
            const pattern = await this.findOne({
                where: { code },
                relations: [
                    'tenant',
                    'defaultRevenueAccount',
                    'defaultCommissionFromClientAccount',
                    'defaultCommissionFromOwnerAccount'
                ]
            });
            logger.info(`Retrieved Contract Pattern with code: ${code}`);
            return pattern;
        } catch (error) {
            logger.error(`Error getting Contract Pattern: ${error}`);
            throw error;
        }
    }

    async updatePattern(id: string, pattern: Partial<ContractPattern>): Promise<boolean> {
        try {
            await this.update(id, pattern);
            logger.info(`Updated Contract Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Contract Pattern: ${error}`);
            throw error;
        }
    }

    async deletePattern(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Contract Pattern with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting Contract Pattern: ${error}`);
            throw error;
        }
    }
    async findByCode(code: number): Promise<ContractPattern | null> {
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
    async findByTenant(tenant_id: string): Promise<ContractPattern[] | null> {
        try {
            const patterns = await this.find({
                where: { tenantId: tenant_id },
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