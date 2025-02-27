import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { LandSellingPrice } from "../../entities/LandSellingPrice.Entity";

@injectable()
export class LandSellingPriceRepository extends Repository<LandSellingPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(LandSellingPrice, datasource.createEntityManager());
    }

    async createSellingPrice(price: Partial<LandSellingPrice>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Land Selling Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Land Selling Price. ${error}`);
            return null;
        }
    }

    async getSellingPricesByLandId(landId: string): Promise<LandSellingPrice[]> {
        try {
            const prices = await this.find({
                where: { land: { id: landId } },
                relations: ['currency', 'tenant']
            });
            logger.info(`Retrieved selling prices for land: ${landId}`);
            return prices;
        } catch (error) {
            logger.error(`Error while fetching Land Selling Prices. ${error}`);
            return [];
        }
    }
}