import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { Building } from "../entities/Building.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm"

@injectable()
export class BuildingsRepository extends Repository<Building> {

    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {

        super(Building, datasource.createEntityManager());
    }

    async createBuilding(building: Partial<Building>): Promise<string | null> {
        try {
            const result = await this.insert(building);
            logger.info(`Building Created successfully with id: ${result.identifiers.at(0)}`);
            return result.identifiers[0].id;
        } catch (error) {
            logger.error(`Error while creating Building. ${error}`);
            return null;
        }
    }

    async updateBuilding(id: string, building: Partial<Building>): Promise<boolean> {
        try {
            const result = await this.update(id, building);
            logger.info(`Building Updated successfully with indetifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Building. ${error}`);
            return false;
        }
    }

    async getBuildings(): Promise<Building[]> {
        try {
            const buildings = await this.find();
            logger.info(`Buildings returned successfully ${JSON.stringify(buildings)}`);
            return buildings;
        } catch (error) {
            logger.info(`Error occurred while getting buildings: ${error}`);
            return [];
        }
    }
}