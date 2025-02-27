import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ParkingAccumulate } from "../../entities/ParkingAccumulate.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ParkingAccumulateRepository extends Repository<ParkingAccumulate> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ParkingAccumulate, datasource.createEntityManager());
    }

    async createAccumulates(accumulates: Partial<ParkingAccumulate>[]): Promise<string[] | null> {
        try {
            const result = await this.save(accumulates);
            logger.info(`Parking Accumulates created successfully with ids: ${result.map(acc => acc.id)}`);
            return result.map(acc => acc.id);
        } catch (error) {
            logger.error(`Error while creating Parking Accumulates. ${error}`);
            return null;
        }
    }

    async getAccumulatesByMainParkingId(mainParkingId: string): Promise<ParkingAccumulate[]> {
        try {
            const accumulates = await this.find({
                where: { main_parking: { id: mainParkingId } },
                relations: ['parking', 'tenant']
            });
            logger.info(`Retrieved accumulates for main parking: ${mainParkingId}`);
            return accumulates;
        } catch (error) {
            logger.error(`Error while fetching Parking Accumulates. ${error}`);
            return [];
        }
    }
}