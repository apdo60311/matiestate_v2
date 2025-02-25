import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ShopPictures } from "../../entities/ShopPictures.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ShopPicturesRepository extends Repository<ShopPictures> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ShopPictures, datasource.createEntityManager());
    }

    async createPictures(pictures: Partial<ShopPictures>[]): Promise<string[] | null> {
        try {
            const result = await this.save(pictures);
            logger.info(`Shop Pictures created successfully with ids: ${result.map(picture => picture.id)}`);
            return result.map(picture => picture.id);
        } catch (error) {
            logger.error(`Error while creating Shop Pictures. ${error}`);
            return null;
        }
    }

    async getByShopId(shopId: string): Promise<ShopPictures[]> {
        try {
            return await this.find({ where: { shop: { id: shopId } } });
        } catch (error) {
            logger.error(`Error while fetching Shop Pictures. ${error}`);
            return [];
        }
    }

    async deletePicture(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Shop Picture with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Shop Picture. ${error}`);
            return false;
        }
    }
}