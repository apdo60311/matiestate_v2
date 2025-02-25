import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ApartmentRentalPrice } from "../../entities/ApartmentRentalPrice.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ApartmentRentalPriceRepository extends Repository<ApartmentRentalPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ApartmentRentalPrice, datasource.createEntityManager());
    }

    async createRentalPrice(price: Partial<ApartmentRentalPrice>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Apartment Rental Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Apartment Rental Price. ${error}`);
            return null;
        }
    }

    async getRentalPriceHistory(apartmentId: string): Promise<ApartmentRentalPrice[]> {
        try {
            const prices = await this.find({
                where: { apartment: { id: apartmentId } },
                relations: ['currency', 'tenant'],
                order: { date: 'DESC' }
            });
            logger.info(`Retrieved rental price history for apartment: ${apartmentId}`);
            return prices;
        } catch (error) {
            logger.error(`Error while fetching Apartment Rental Prices. ${error}`);
            return [];
        }
    }
}