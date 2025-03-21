import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { BillDiscountsDetails } from "../../entities/BillDiscountsDetails.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class BillDiscountsDetailsRepository extends Repository<BillDiscountsDetails> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(BillDiscountsDetails, datasource.createEntityManager());
    }

    async createDiscountDetail(detail: Partial<BillDiscountsDetails>): Promise<string | null> {
        try {
            const result = await this.save(detail);
            logger.info(`Bill Discount Detail created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Bill Discount Detail: ${error}`);
            return null;
        }
    }

    async createMultipleDiscountDetails(details: Partial<BillDiscountsDetails>[]): Promise<string[] | null> {
        try {
            const result = await this.save(details);
            const ids = result.map(detail => detail.id);
            logger.info(`Bill Discount Details created successfully with ids: ${ids.join(', ')}`);
            return ids;
        } catch (error) {
            logger.error(`Error creating multiple Bill Discount Details: ${error}`);
            return null;
        }
    }

    async getDiscountDetailById(id: string): Promise<BillDiscountsDetails | null> {
        try {
            const detail = await this.findOne({
                where: { id },
                relations: ['bill', 'account', 'currency', 'costCenter', 'obverseAccount', 'tenant']
            });
            logger.info(`Retrieved Bill Discount Detail with id: ${id}`);
            return detail;
        } catch (error) {
            logger.error(`Error getting Bill Discount Detail: ${error}`);
            return null;
        }
    }

    async getDiscountDetailsByBillId(billId: string): Promise<BillDiscountsDetails[]> {
        try {
            const details = await this.find({
                where: { bill_id: billId },
                relations: ['bill', 'account', 'currency', 'costCenter', 'obverseAccount', 'tenant']
            });
            logger.info(`Retrieved Bill Discount Details for bill: ${billId}`);
            return details;
        } catch (error) {
            logger.error(`Error getting Bill Discount Details by bill id: ${error}`);
            return [];
        }
    }

    async updateDiscountDetail(id: string, detail: Partial<BillDiscountsDetails>): Promise<boolean> {
        try {
            await this.update(id, detail);
            logger.info(`Updated Bill Discount Detail with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Bill Discount Detail: ${error}`);
            return false;
        }
    }

    async deleteDiscountDetail(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Bill Discount Detail with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting Bill Discount Detail: ${error}`);
            return false;
        }
    }
}