import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { ApartmentSellingPrice } from "../entities/ApartmentSellingPrice.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ApartmentSellingPriceRepository extends Repository<ApartmentSellingPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ApartmentSellingPrice, datasource.createEntityManager());
    }

    async createSellingPrice(price: Partial<ApartmentSellingPrice>): Promise<string | null> {
        try {
            const result = await this.save(price);
            logger.info(`Apartment Selling Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Apartment Selling Price. ${error}`);
            return null;
        }
    }

    async getSellingPriceHistory(apartmentId: string): Promise<ApartmentSellingPrice[]> {
        try {
            const prices = await this.find({
                where: { apartment: { id: apartmentId } },
                relations: ['currency', 'tenant'],
                order: { date: 'DESC' }
            });
            logger.info(`Retrieved selling price history for apartment: ${apartmentId}`);
            return prices;
        } catch (error) {
            logger.error(`Error while fetching Apartment Selling Prices. ${error}`);
            return [];
        }
    }
}