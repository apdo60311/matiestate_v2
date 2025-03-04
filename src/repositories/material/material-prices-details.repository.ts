import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { MaterialPricesDetails } from "../../entities/MaterialPricesDetails.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class MaterialPricesDetailsRepository extends Repository<MaterialPricesDetails> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(MaterialPricesDetails, datasource.createEntityManager());
    }

    async createPriceDetails(details: Partial<MaterialPricesDetails>): Promise<string | null> {
        try {
            const result = await this.save(details);
            logger.info(`Material Price Details created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Material Price Details: ${error}`);
            return null;
        }
    }

    async getPriceDetailsById(id: string): Promise<MaterialPricesDetails | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['material', 'tenant']
            });
            logger.info(`Retrieved material price details with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Price Details: ${error}`);
            return null;
        }
    }

    async getPriceDetailsByMaterialId(materialId: string): Promise<MaterialPricesDetails[]> {
        try {
            const result = await this.find({
                where: { material_id: materialId },
                relations: ['material', 'tenant']
            });
            logger.info(`Retrieved price details for material: ${materialId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Price Details: ${error}`);
            return [];
        }
    }

    async updatePriceDetails(id: string, details: Partial<MaterialPricesDetails>): Promise<boolean> {
        try {
            await this.update(id, details);
            logger.info(`Updated material price details with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Material Price Details: ${error}`);
            return false;
        }
    }

    async deletePriceDetails(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted material price details with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Material Price Details: ${error}`);
            return false;
        }
    }
}