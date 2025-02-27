import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Villa } from "../../entities/Villa.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class VillaRepository extends Repository<Villa> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Villa, datasource.createEntityManager());
    }

    async createVilla(villa: Partial<Villa>): Promise<string | null> {
        try {
            const result = await this.save(villa);
            logger.info(`Villa Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Villa. ${error}`);
            return null;
        }
    }

    async getVillaById(id: string): Promise<Villa | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: [
                    'ownerAccount',
                    'villaAccount',
                    'costCenter',
                    'bankAccount',
                    'cashAccount',
                    'insuranceAccount',
                    'lessor',
                    'tenant'
                ]
            });
            logger.info(`Fetched Villa with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Villa. ${error}`);
            return null;
        }
    }

    async getAllVillas(): Promise<Villa[]> {
        try {
            const villas = await this.find({
                relations: ['costCenter', 'tenant', 'lessor']
            });
            logger.info('Fetched all Villas successfully');
            return villas;
        } catch (error) {
            logger.error(`Error while fetching Villas. ${error}`);
            return [];
        }
    }

    async updateVilla(id: string, villa: Partial<Villa>): Promise<boolean> {
        try {
            await this.update(id, villa);
            logger.info(`Updated Villa with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Villa. ${error}`);
            return false;
        }
    }

    async deleteVilla(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Villa with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Villa. ${error}`);
            return false;
        }
    }
}