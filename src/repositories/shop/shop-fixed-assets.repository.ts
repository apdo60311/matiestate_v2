import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ShopFixedAssets } from "../../entities/ShopFixedAssets.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ShopFixedAssetsRepository extends Repository<ShopFixedAssets> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ShopFixedAssets, datasource.createEntityManager());
    }

    async createFixedAssets(assets: Partial<ShopFixedAssets>[]): Promise<string[] | null> {
        try {
            const result = await this.save(assets);
            logger.info(`Shop Fixed Assets created successfully with ids: ${result.map(asset => asset.id)}`);
            return result.map(asset => asset.id);
        } catch (error) {
            logger.error(`Error while creating Shop Fixed Assets. ${error}`);
            return null;
        }
    }

    async getByShopId(shopId: string): Promise<ShopFixedAssets[]> {
        try {
            return await this.find({ where: { shop: { id: shopId } } });
        } catch (error) {
            logger.error(`Error while fetching Shop Fixed Assets. ${error}`);
            return [];
        }
    }
}