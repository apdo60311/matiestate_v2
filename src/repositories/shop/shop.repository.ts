import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Shop } from "../../entities/Shop.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ShopRepository extends Repository<Shop> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Shop, datasource.createEntityManager());
    }

    async createShop(shop: Partial<Shop>): Promise<string | null> {
        try {
            const result = await this.save(shop);
            logger.info(`Shop Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Shop. ${error}`);
            return null;
        }
    }

    async getShopById(id: string): Promise<Shop | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: [
                    'building',
                    'cost_center',
                    'property_values',
                    'tenant'
                ]
            });
            logger.info(`Fetched Shop with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Shop. ${error}`);
            return null;
        }
    }

    async getShopsByBuildingId(buildingId: string): Promise<Shop[]> {
        try {
            const result = await this.find({
                where: { building: { id: buildingId } },
                relations: [
                    'cost_center',
                    'property_values',
                    'tenant'
                ]
            });
            logger.info(`Fetched Shops for building: ${buildingId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Shops. ${error}`);
            return [];
        }
    }

    async updateShop(id: string, shop: Partial<Shop>): Promise<boolean> {
        try {
            await this.update(id, shop);
            logger.info(`Updated Shop with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Shop. ${error}`);
            return false;
        }
    }

    async deleteShop(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Shop with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Shop. ${error}`);
            return false;
        }
    }
}