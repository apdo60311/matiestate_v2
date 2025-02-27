import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { VillaRentalPrice } from "../../entities/VillaRentalPrice.entity";


@injectable()
export class VillaRentalPriceRepository extends Repository<VillaRentalPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(VillaRentalPrice, datasource.createEntityManager());
    }

    async createRentalPrice(price: Partial<VillaRentalPrice>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Villa Rental Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Villa Rental Price. ${error}`);
            return null;
        }
    }

    async getRentalPricesByVillaId(villaId: string): Promise<VillaRentalPrice[]> {
        try {
            const prices = await this.find({
                where: { villa: { id: villaId } },
                relations: ['currency', 'tenant']
            });
            logger.info(`Retrieved rental prices for villa: ${villaId}`);
            return prices;
        } catch (error) {
            logger.error(`Error while fetching Villa Rental Prices. ${error}`);
            return [];
        }
    }
}