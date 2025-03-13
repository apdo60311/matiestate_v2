import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { OpPartialCollection } from "../../entities/OPPartialCollection.entity";
import { DataSource, Repository } from "typeorm";

@injectable()
export class OpPartialCollectionRepository extends Repository<OpPartialCollection> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(OpPartialCollection, datasource.createEntityManager());
    }

    async createOpPartialCollection(
        opPartialCollection: Partial<OpPartialCollection>
    ): Promise<string | null> {
        try {
            const result = await this.insert(opPartialCollection);
            logger.info(`OpPartialCollection Created successfully with id: ${result.identifiers[0].id}`);
            return result.identifiers[0].id;
        } catch (error) {
            logger.error(`Error while creating OpPartialCollection. ${error}`);
            return null;
        }
    }

    async updateOpPartialCollection(
        id: string,
        opPartialCollection: Partial<OpPartialCollection>
    ): Promise<boolean> {
        try {
            const result = await this.update(id, opPartialCollection);
            logger.info(`OpPartialCollection Updated successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating OpPartialCollection. ${error}`);
            return false;
        }
    }

    async getOpPartialCollections(): Promise<OpPartialCollection[]> {
        try {
            return await this.find();
        } catch (error) {
            logger.error(`Error while fetching OpPartialCollections. ${error}`);
            return [];
        }
    }

    async getOpPartialCollectionById(id: string): Promise<OpPartialCollection | null> {
        try {
            return await this.findOneBy({ id });
        } catch (error) {
            logger.error(`Error while fetching OpPartialCollection by ID. ${error}`);
            return null;
        }
    }

    async getOpPartialCollectionByNumber(number: number): Promise<OpPartialCollection | null> {
        try {
            return await this.findOneBy({ number });
        } catch (error) {
            logger.error(`Error while fetching OpPartialCollection by Number. ${error}`);
            return null;
        }
    }

    async deleteOpPartialCollection(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            if (result.affected && result.affected > 0) {
                logger.info(`OpPartialCollection Deleted successfully with id: ${id}`);
                return true;
            }
            logger.warn(`OpPartialCollection with id: ${id} not found for deletion.`);
            return false;
        } catch (error) {
            logger.error(`Error while deleting OpPartialCollection. ${error}`);
            return false;
        }
    }
}