import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { ParkingRentalPrice } from "../../entities/ParkingRentalPrice.entity";

@injectable()
export class ParkingRentalPriceRepository extends Repository<ParkingRentalPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ParkingRentalPrice, datasource.createEntityManager());
    }

    async createRentalPrice(rentalPrice: Partial<ParkingRentalPrice>): Promise<string | null> {
        try {
            const result = await this.save(rentalPrice);
            logger.info(`Parking Rental Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Parking Rental Price. ${error}`);
            return null;
        }
    }

    async getRentalPricesByParkingId(parkingId: string): Promise<ParkingRentalPrice[]> {
        try {
            const prices = await this.find({
                where: { parking: { id: parkingId } },
                relations: ['currency', 'tenant']
            });
            logger.info(`Retrieved rental prices for parking: ${parkingId}`);
            return prices;
        } catch (error) {
            logger.error(`Error while fetching Parking Rental Prices. ${error}`);
            return [];
        }
    }
}