import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { OpCollection } from "../../entities/OPCollection.entity";

@injectable()
export class OpCollectionRepository extends Repository<OpCollection> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(OpCollection, datasource.createEntityManager());
    }

    async createOpCollection(
        opCollection: Partial<OpCollection>
    ): Promise<string | null> {
        try {
            const result = await this.insert(opCollection);
            logger.info(`OpCollection Created successfully with id: ${result.identifiers[0].id}`);
            return result.identifiers[0].id;
        } catch (error) {
            logger.error(`Error while creating OpCollection. ${error}`);
            return null;
        }
    }

    async updateOpCollection(
        id: string,
        opCollection: Partial<OpCollection>
    ): Promise<boolean> {
        try {
            const result = await this.update(id, opCollection);
            logger.info(`OpCollection Updated successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating OpCollection. ${error}`);
            return false;
        }
    }

    async getOpCollections(): Promise<OpCollection[]> {
        try {
            return await this.find();
        } catch (error) {
            logger.error(`Error while fetching OpCollections. ${error}`);
            return [];
        }
    }

    async getOpCollectionById(id: string): Promise<OpCollection | null> {
        try {
            return await this.findOneBy({ id });
        } catch (error) {
            logger.error(`Error while fetching OpCollection by ID. ${error}`);
            return null;
        }
    }

    async deleteOpCollection(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            if (result.affected && result.affected > 0) {
                logger.info(`OpCollection Deleted successfully with id: ${id}`);
                return true;
            }
            logger.warn(`OpCollection with id: ${id} not found for deletion.`);
            return false;
        } catch (error) {
            logger.error(`Error while deleting OpCollection. ${error}`);
            return false;
        }
    }
}