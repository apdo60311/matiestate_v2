import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { MaterialMinimum } from "../../entities/MaterialMinimum.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class MaterialMinimumRepository extends Repository<MaterialMinimum> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(MaterialMinimum, datasource.createEntityManager());
    }

    async createMinimum(minimum: Partial<MaterialMinimum>): Promise<string | null> {
        try {
            const result = await this.save(minimum);
            logger.info(`Material Minimum created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Material Minimum: ${error}`);
            return null;
        }
    }

    async getMinimumById(id: string): Promise<MaterialMinimum | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['material', 'tenant']
            });
            logger.info(`Retrieved material minimum with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Minimum: ${error}`);
            return null;
        }
    }

    async getAllMinimums(): Promise<MaterialMinimum[]> {
        try {
            const result = await this.find({
                relations: ['material', 'tenant']
            });
            logger.info('Retrieved all material minimums');
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Minimums: ${error}`);
            return [];
        }
    }

    async updateMinimum(id: string, minimum: Partial<MaterialMinimum>): Promise<boolean> {
        try {
            await this.update(id, minimum);
            logger.info(`Updated material minimum with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Material Minimum: ${error}`);
            return false;
        }
    }

    async deleteMinimum(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted material minimum with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Material Minimum: ${error}`);
            return false;
        }
    }
}