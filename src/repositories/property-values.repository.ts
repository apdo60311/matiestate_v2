import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { PropertyValues } from "../entities/PropertyValues.entity";
import { inject, injectable } from "inversify";
import { DataSource, In, Repository } from "typeorm";

@injectable()
export class PropertyValuesRepository extends Repository<PropertyValues> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(PropertyValues, datasource.createEntityManager());
    }

    async createPropertyValue(propertyValues: Partial<PropertyValues>): Promise<string | null> {
        try {
            const result = await this.save(propertyValues);
            logger.info(`Property Values created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Property Values: ${error}`);
            return null;
        }
    }

    async createPropertyValues(propertyValues: Partial<PropertyValues>[]): Promise<string[] | null> {
        try {
            const result = await this.save(propertyValues);

            const insertedIds = result.map((item) => item.id);
            logger.info(`Property Values created successfully with ids: ${insertedIds}`);

            return insertedIds;
        } catch (error) {
            logger.error(`Error while creating Property Values: ${error}`);
            return null;
        }
    }


    async getPropertyValuesById(id: string): Promise<PropertyValues | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['tenant']
            });
            logger.info(`Fetched Property Values with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Property Values: ${error}`);
            return null;
        }
    }

    async getPropertyValuesByBuildingId(buildingId: string): Promise<PropertyValues[]> {
        try {
            const values = await this.find({
                where: { building_id: buildingId },
                relations: ['tenant']
            });
            logger.info(`Retrieved property values for building: ${buildingId}`);
            return values;
        } catch (error) {
            logger.error(`Error while fetching Property Values by building: ${error}`);
            return [];
        }
    }

    async getPropertyValuesByIds(propertyIds: string[]): Promise<PropertyValues[]> {
        try {
            const values = await this.findBy({id: In(propertyIds)});
            logger.info(`Retrieved property values for ids: ${propertyIds}`);
            return values;
        } catch (error) {
            logger.error(`Error while fetching Property Values by ids: ${error}`);
            return [];
        }
    }

    async updatePropertyValues(id: string, propertyValues: Partial<PropertyValues>): Promise<boolean> {
        try {
            await this.update(id, propertyValues);
            logger.info(`Updated Property Values with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Property Values: ${error}`);
            return false;
        }
    }

    async deletePropertyValues(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Property Values with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Property Values: ${error}`);
            return false;
        }
    }
}