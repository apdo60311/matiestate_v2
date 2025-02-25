import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ShopSellingPrice } from "../../entities/ShopSellingPrice.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ShopSellingPriceRepository extends Repository<ShopSellingPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ShopSellingPrice, datasource.createEntityManager());
    }

    async createSellingPrice(price: Partial<ShopSellingPrice>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Shop Selling Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Shop Selling Price. ${error}`);
            return null;
        }
    }

    async getByShopId(shopId: string): Promise<ShopSellingPrice | null> {
        try {
            return await this.findOne({ where: { shop: { id: shopId } } });
        } catch (error) {
            logger.error(`Error while fetching Shop Selling Price. ${error}`);
            return null;
        }
    }

    async updateSellingPrice(id: string, price: Partial<ShopSellingPrice>): Promise<boolean> {
        try {
            await this.update(id, price);
            logger.info(`Updated Shop Selling Price with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Shop Selling Price. ${error}`);
            return false;
        }
    }
}