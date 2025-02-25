import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ShopAccumulate } from "../../entities/ShopAccumulate.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ShopAccumulateRepository extends Repository<ShopAccumulate> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ShopAccumulate, datasource.createEntityManager());
    }

    async createAccumulates(accumulates: Partial<ShopAccumulate>[]): Promise<string[] | null> {
        try {
            const result = await this.save(accumulates);
            logger.info(`Shop Accumulates created successfully with ids: ${result.map(accumulate => accumulate.id)}`);
            return result.map(accumulate => accumulate.id);
        } catch (error) {
            logger.error(`Error while creating Shop Accumulates. ${error}`);
            return null;
        }
    }
}