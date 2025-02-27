import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { LandAccumulate } from "../../entities/LandAccumulate.entity";


@injectable()
export class LandAccumulateRepository extends Repository<LandAccumulate> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(LandAccumulate, datasource.createEntityManager());
    }

    async createAccumulates(accumulates: Partial<LandAccumulate>[]): Promise<string[] | null> {
        try {
            const result = await this.save(accumulates);
            logger.info(`Land Accumulates created successfully with ids: ${result.map(acc => acc.id)}`);
            return result.map(acc => acc.id);
        } catch (error) {
            logger.error(`Error while creating Land Accumulates. ${error}`);
            return null;
        }
    }

    async getAccumulatesByMainLandId(mainLandId: string): Promise<LandAccumulate[]> {
        try {
            const accumulates = await this.find({
                where: { main_land_id: mainLandId },
                relations: ['land', 'tenant']
            });
            logger.info(`Retrieved accumulates for main land: ${mainLandId}`);
            return accumulates;
        } catch (error) {
            logger.error(`Error while fetching Land Accumulates. ${error}`);
            return [];
        }
    }
}