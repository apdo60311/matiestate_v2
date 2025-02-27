import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { LandRentalPrice } from "../../entities/LandRentalPrice Entity";


@injectable()
export class LandRentalPriceRepository extends Repository<LandRentalPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(LandRentalPrice, datasource.createEntityManager());
    }

    async createRentalPrice(price: Partial<LandRentalPrice>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Land Rental Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Land Rental Price. ${error}`);
            return null;
        }
    }

    async getRentalPricesByLandId(landId: string): Promise<LandRentalPrice[]> {
        try {
            const prices = await this.find({
                where: { land: { id: landId } },
                relations: ['currency', 'tenant']
            });
            logger.info(`Retrieved rental prices for land: ${landId}`);
            return prices;
        } catch (error) {
            logger.error(`Error while fetching Land Rental Prices. ${error}`);
            return [];
        }
    }
}