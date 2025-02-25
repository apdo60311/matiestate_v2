import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { ApartmentAccumulate } from "../entities/ApartmentAccumulate.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ApartmentAccumulateRepository extends Repository<ApartmentAccumulate> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ApartmentAccumulate, datasource.createEntityManager());
    }

    async createAccumulate(accumulate: Partial<ApartmentAccumulate>): Promise<string | null> {
        try {
            const result = await this.save(accumulate);
            logger.info(`Apartment Accumulate created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Apartment Accumulate. ${error}`);
            return null;
        }
    }

    async createAccumulates(accumulates: Partial<ApartmentAccumulate>[]): Promise<string[] | null> {
        try {
            const result = await this.save(accumulates);
            logger.info(`Apartment Accumulates created successfully with ids: ${result.map(accumulate => accumulate.id)}`);
            return result.map(accumulate => accumulate.id);
        } catch (error) {
            logger.error(`Error while creating Apartment Accumulates. ${error}`);
            return null;
        }
    }

    async getAccumulatesByMainApartmentId(mainApartmentId: string): Promise<ApartmentAccumulate[]> {
        try {
            const accumulates = await this.find({
                where: { main_apartment: { id: mainApartmentId } },
                relations: ['apartment', 'tenant']
            });
            logger.info(`Retrieved accumulates for main apartment: ${mainApartmentId}`);
            return accumulates;
        } catch (error) {
            logger.error(`Error while fetching Apartment Accumulates. ${error}`);
            return [];
        }
    }
}