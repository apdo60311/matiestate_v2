import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { OpDeportation } from "../../entities/OPDeportation.entity";
import { DataSource, Repository } from "typeorm";

@injectable()
export class OpDeportationRepository extends Repository<OpDeportation> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(OpDeportation, datasource.createEntityManager());
    }

    async createOpDeportation(
        opDeportation: Partial<OpDeportation>
    ): Promise<string | null> {
        try {
            const result = await this.insert(opDeportation);
            logger.info(`OpDeportation Created successfully with id: ${result.identifiers[0].id}`);
            return result.identifiers[0].id;
        } catch (error) {
            logger.error(`Error while creating OpDeportation. ${error}`);
            return null;
        }
    }

    async updateOpDeportation(
        id: string,
        opDeportation: Partial<OpDeportation>
    ): Promise<boolean> {
        try {
            const result = await this.update(id, opDeportation);
            logger.info(`OpDeportation Updated successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating OpDeportation. ${error}`);
            return false;
        }
    }

    async getOpDeportations(): Promise<OpDeportation[]> {
        try {
            return await this.find();
        } catch (error) {
            logger.error(`Error while fetching OpDeportations. ${error}`);
            return [];
        }
    }

    async getOpDeportationById(id: string): Promise<OpDeportation | null> {
        try {
            return await this.findOneBy({ id });
        } catch (error) {
            logger.error(`Error while fetching OpDeportation by ID. ${error}`);
            return null;
        }
    }

    async deleteOpDeportation(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            if (result.affected && result.affected > 0) {
                logger.info(`OpDeportation Deleted successfully with id: ${id}`);
                return true;
            }
            logger.warn(`OpDeportation with id: ${id} not found for deletion.`);
            return false;
        } catch (error) {
            logger.error(`Error while deleting OpDeportation. ${error}`);
            return false;
        }
    }
}