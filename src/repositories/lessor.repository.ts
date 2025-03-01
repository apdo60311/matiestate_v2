import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { Lessor } from "../entities/Lessor.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class LessorRepository extends Repository<Lessor> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Lessor, datasource.createEntityManager());
    }

    async createLessor(lessor: Partial<Lessor>): Promise<string | null> {
        try {
            const result = await this.save(lessor);
            logger.info(`Lessor Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Lessor. ${error}`);
            return null;
        }
    }

    async getLessorById(id: string): Promise<Lessor | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['tenant', 'buildings']
            });
            logger.info(`Fetched Lessor with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Lessor. ${error}`);
            return null;
        }
    }

    async getAllLessors(): Promise<Lessor[]> {
        try {
            const lessors = await this.find({
                relations: ['tenant', 'buildings']
            });
            logger.info('Fetched all Lessors successfully');
            return lessors;
        } catch (error) {
            logger.error(`Error while fetching Lessors. ${error}`);
            return [];
        }
    }

    async updateLessor(id: string, lessor: Partial<Lessor>): Promise<boolean> {
        try {
            await this.update(id, lessor);
            logger.info(`Updated Lessor with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Lessor. ${error}`);
            return false;
        }
    }

    async deleteLessor(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Lessor with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Lessor. ${error}`);
            return false;
        }
    }
}