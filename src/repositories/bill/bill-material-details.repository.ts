import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { BillMaterialDetail } from "../../entities/BillMaterialDetails.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class BillMaterialDetailsRepository extends Repository<BillMaterialDetail> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(BillMaterialDetail, datasource.createEntityManager());
    }

    async createMaterialDetail(detail: Partial<BillMaterialDetail>): Promise<string | null> {
        try {
            const result = await this.save(detail);
            logger.info(`Bill Material Detail created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Bill Material Detail: ${error}`);
            return null;
        }
    }

    async createMultipleMaterialDetails(details: Partial<BillMaterialDetail>[]): Promise<string[] | null> {
        try {
            const result = await this.save(details);
            const ids = result.map(detail => detail.id);
            logger.info(`Bill Material Details created successfully with ids: ${ids.join(', ')}`);
            return ids;
        } catch (error) {
            logger.error(`Error creating multiple Bill Material Details: ${error}`);
            return null;
        }
    }

    async getMaterialDetailById(id: string): Promise<BillMaterialDetail | null> {
        try {
            const detail = await this.findOne({
                where: { id },
                relations: ['bill', 'material', 'tenant']
            });
            logger.info(`Retrieved Bill Material Detail with id: ${id}`);
            return detail;
        } catch (error) {
            logger.error(`Error getting Bill Material Detail: ${error}`);
            return null;
        }
    }

    async getMaterialDetailsByBillId(billId: string): Promise<BillMaterialDetail[]> {
        try {
            const details = await this.find({
                where: { billId },
                relations: ['bill', 'material', 'tenant']
            });
            logger.info(`Retrieved Bill Material Details for bill: ${billId}`);
            return details;
        } catch (error) {
            logger.error(`Error getting Bill Material Details by bill id: ${error}`);
            return [];
        }
    }

    async updateMaterialDetail(id: string, detail: Partial<BillMaterialDetail>): Promise<boolean> {
        try {
            await this.update(id, detail);
            logger.info(`Updated Bill Material Detail with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Bill Material Detail: ${error}`);
            return false;
        }
    }

    async deleteMaterialDetail(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Bill Material Detail with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting Bill Material Detail: ${error}`);
            return false;
        }
    }
}