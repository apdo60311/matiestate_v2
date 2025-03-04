import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Material } from "../../entities/Material.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class MaterialRepository extends Repository<Material> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Material, datasource.createEntityManager());
    }

    async createMaterial(material: Partial<Material>): Promise<string | null> {
        try {
            const result = await this.save(material);
            logger.info(`Material created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Material: ${error}`);
            return null;
        }
    }

    async getMaterialById(id: string): Promise<Material | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['materialGroup', 'tenant']
            });
            logger.info(`Retrieved material with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material: ${error}`);
            return null;
        }
    }

    async getAllMaterials(): Promise<Material[]> {
        try {
            const result = await this.find({
                relations: ['materialGroup', 'tenant']
            });
            logger.info('Retrieved all materials');
            return result;
        } catch (error) {
            logger.error(`Error while fetching Materials: ${error}`);
            return [];
        }
    }

    async updateMaterial(id: string, material: Partial<Material>): Promise<boolean> {
        try {
            await this.update(id, material);
            logger.info(`Updated material with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Material: ${error}`);
            return false;
        }
    }

    async deleteMaterial(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted material with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Material: ${error}`);
            return false;
        }
    }
}