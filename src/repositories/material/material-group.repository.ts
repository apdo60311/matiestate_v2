import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { MaterialGroup } from "../../entities/MaterialGroup.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class MaterialGroupRepository extends Repository<MaterialGroup> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(MaterialGroup, datasource.createEntityManager());
    }

    async createMaterialGroup(group: Partial<MaterialGroup>): Promise<string | null> {
        try {
            const result = await this.save(group);
            logger.info(`Material Group created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Material Group: ${error}`);
            return null;
        }
    }

    async getMaterialGroupById(id: string): Promise<MaterialGroup | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['tenant']
            });
            logger.info(`Retrieved material group with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Group: ${error}`);
            return null;
        }
    }

    async getAllMaterialGroups(): Promise<MaterialGroup[]> {
        try {
            const result = await this.find({
                relations: ['tenant']
            });
            logger.info('Retrieved all material groups');
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Groups: ${error}`);
            return [];
        }
    }

    async updateMaterialGroup(id: string, group: Partial<MaterialGroup>): Promise<boolean> {
        try {
            await this.update(id, group);
            logger.info(`Updated material group with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Material Group: ${error}`);
            return false;
        }
    }

    async deleteMaterialGroup(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted material group with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Material Group: ${error}`);
            return false;
        }
    }
}