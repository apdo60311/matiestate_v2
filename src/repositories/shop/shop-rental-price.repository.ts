import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ShopRentalPrice } from "../../entities/ShopRentalPrice.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ShopRentalPriceRepository extends Repository<ShopRentalPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ShopRentalPrice, datasource.createEntityManager());
    }

    async createRentalPrice(price: Partial<ShopRentalPrice>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Shop Rental Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Shop Rental Price. ${error}`);
            return null;
        }
    }

    async getByShopId(shopId: string): Promise<ShopRentalPrice | null> {
        try {
            return await this.findOne({ where: { shop: { id: shopId } } });
        } catch (error) {
            logger.error(`Error while fetching Shop Rental Price. ${error}`);
            return null;
        }
    }

    async updateRentalPrice(id: string, price: Partial<ShopRentalPrice>): Promise<boolean> {
        try {
            await this.update(id, price);
            logger.info(`Updated Shop Rental Price with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Shop Rental Price. ${error}`);
            return false;
        }
    }
}