import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { VillaSellingPrice } from "../../entities/VillaSellingPrice.entity";


@injectable()
export class VillaSellingPriceRepository extends Repository<VillaSellingPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(VillaSellingPrice, datasource.createEntityManager());
    }

    async createSellingPrice(price: Partial<VillaSellingPrice>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Villa Selling Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Villa Selling Price. ${error}`);
            return null;
        }
    }

    async getSellingPricesByVillaId(villaId: string): Promise<VillaSellingPrice[]> {
        try {
            const prices = await this.find({
                where: { villa: { id: villaId } },
                relations: ['currency', 'tenant']
            });
            logger.info(`Retrieved selling prices for villa: ${villaId}`);
            return prices;
        } catch (error) {
            logger.error(`Error while fetching Villa Selling Prices. ${error}`);
            return [];
        }
    }
}