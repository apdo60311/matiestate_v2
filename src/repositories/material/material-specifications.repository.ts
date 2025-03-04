import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { MaterialSpecifications } from "../../entities/MaterialSpecifications.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class MaterialSpecificationsRepository extends Repository<MaterialSpecifications> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(MaterialSpecifications, datasource.createEntityManager());
    }

    async createSpecifications(specification: Partial<MaterialSpecifications>): Promise<string | null> {
        try {
            const result = await this.save(specification);
            logger.info(`Material Specification created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Material Specification: ${error}`);
            return null;
        }
    }

    async createMultipleSpecifications(specification: Partial<MaterialSpecifications>[]): Promise<string[] | null> {
        try {
            const result = await this.save(specification);
            const ids = result.map((spec) => spec.id);
            logger.info(`Material Specifications created successfully with ids: ${ids}`);
            return ids;
        } catch (error) {
            logger.error(`Error while creating Material Specification: ${error}`);
            return null;
        }
    }


    async getById(id: string): Promise<MaterialSpecifications | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['material', 'tenant']
            });
            logger.info(`Retrieved material specification with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Specification: ${error}`);
            return null;
        }
    }

    async getByMaterialId(materialId: string): Promise<MaterialSpecifications[]> {
        try {
            const result = await this.find({
                where: { material_id: materialId },
                relations: ['material', 'tenant']
            });
            logger.info(`Retrieved specifications for material: ${materialId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Specifications: ${error}`);
            return [];
        }
    }

    async updateSpecifications(id: string, specification: Partial<MaterialSpecifications>): Promise<boolean> {
        try {
            await this.save({
                id,
                ...specification
            });
            logger.info(`Updated material specification with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Material Specification: ${error}`);
            return false;
        }
    }

    async deleteSpecifications(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted material specification with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Material Specification: ${error}`);
            return false;
        }
    }
}