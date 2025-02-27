import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { ParkingSellingPrice } from "../../entities/ParkingSellingPrice";

@injectable()
export class ParkingSellingPriceRepository extends Repository<ParkingSellingPrice> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ParkingSellingPrice, datasource.createEntityManager());
    }

    async createSellingPrice(sellingPrice: Partial<ParkingSellingPrice>): Promise<string | null> {
        try {
            const result = await this.save(sellingPrice);
            logger.info(`Parking Selling Price created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Parking Selling Price. ${error}`);
            return null;
        }
    }

    async getSellingPricesByParkingId(parkingId: string): Promise<ParkingSellingPrice[]> {
        try {
            const prices = await this.find({
                where: { parking: { id: parkingId } },
                relations: ['currency', 'tenant']
            });
            logger.info(`Retrieved selling prices for parking: ${parkingId}`);
            return prices;
        } catch (error) {
            logger.error(`Error while fetching Parking Selling Prices. ${error}`);
            return [];
        }
    }
}