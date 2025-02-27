import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Land } from "../../entities/Land.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class LandRepository extends Repository<Land> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Land, datasource.createEntityManager());
    }

    async createLand(land: Partial<Land>): Promise<string | null> {
        try {
            const result = await this.save(land);
            logger.info(`Land Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Land. ${error}`);
            return null;
        }
    }

    async getLandById(id: string): Promise<Land | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: [
                    'account',
                    'costCenter',
                    'customerOwner',
                    'tenant'
                ]
            });
            logger.info(`Fetched Land with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Land. ${error}`);
            return null;
        }
    }

    async getAllLands(): Promise<Land[]> {
        try {
            const lands = await this.find({
                relations: ['account', 'costCenter', 'tenant']
            });
            logger.info('Fetched all Lands successfully');
            return lands;
        } catch (error) {
            logger.error(`Error while fetching Lands. ${error}`);
            return [];
        }
    }

    async updateLand(id: string, land: Partial<Land>): Promise<boolean> {
        try {
            await this.update(id, land);
            logger.info(`Updated Land with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Land. ${error}`);
            return false;
        }
    }

    async deleteLand(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Land with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Land. ${error}`);
            return false;
        }
    }
}