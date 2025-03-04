import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { MaterialPrices } from "../../entities/MaterialPrices.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class MaterialPricesRepository extends Repository<MaterialPrices> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(MaterialPrices, datasource.createEntityManager());
    }

    async createMaterialPrice(price: Partial<MaterialPrices>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Material Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Material Price: ${error}`);
            return null;
        }
    }

    async getMaterialPriceById(id: string): Promise<MaterialPrices | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['material', 'currency', 'tenant']
            });
            logger.info(`Retrieved material price with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Price: ${error}`);
            return null;
        }
    }

    async getMaterialPricesByMaterialId(materialId: string): Promise<MaterialPrices[]> {
        try {
            const result = await this.find({
                where: { material_id: materialId },
                relations: ['currency', 'tenant']
            });
            logger.info(`Retrieved prices for material: ${materialId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Prices: ${error}`);
            return [];
        }
    }

    async updateMaterialPrice(id: string, price: Partial<MaterialPrices>): Promise<boolean> {
        try {
            await this.update(id, price);
            logger.info(`Updated material price with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Material Price: ${error}`);
            return false;
        }
    }

    async deleteMaterialPrice(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted material price with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Material Price: ${error}`);
            return false;
        }
    }
}