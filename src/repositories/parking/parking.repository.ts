import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Parking } from "../../entities/Parking.entity";
import { inject, injectable } from "inversify";
import { DataSource, In, Not, Repository } from "typeorm";

@injectable()
export class ParkingRepository extends Repository<Parking> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Parking, datasource.createEntityManager());
    }

    async createParking(parking: Partial<Parking>): Promise<string | null> {
        try {
            const result = await this.save(parking);
            logger.info(`Parking Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Parking. ${error}`);
            return null;
        }
    }

    async createParkings(parkings: Partial<Parking>[]): Promise<string[] | null> {
        try {
            const result = await this.save(parkings);
            const parkingIds = result.map((parking) => parking.id);
            logger.info(`Parkings Created successfully with ids: ${parkingIds.join(', ')}`);
            return parkingIds;
        } catch (error) {
            logger.error(`Error while creating Parkings. ${error}`);
            return null;
        }
    }

    async getParkingById(id: string): Promise<Parking | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: [
                    'building',
                    'cost_center',
                    'main_cost_center',
                    'property_values',
                    'tenant'
                ]
            });
            logger.info(`Fetched Parking with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Parking. ${error}`);
            return null;
        }
    }

    async getParkingsByBuildingId(buildingId: string): Promise<Parking[]> {
        try {
            const result = await this.find({
                where: { building: { id: buildingId } },
                relations: ['cost_center', 'property_values', 'tenant']
            });
            logger.info(`Fetched Parkings for building: ${buildingId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Parkings. ${error}`);
            return [];
        }
    }

    async updateParking(id: string, parking: Partial<Parking>): Promise<boolean> {
        try {
            await this.update(id, parking);
            logger.info(`Updated Parking with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Parking. ${error}`);
            return false;
        }
    }

    async deleteParking(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Parking with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Parking. ${error}`);
            return false;
        }
    }

    async getAvailableParkings(occupiedIds: string[]): Promise<Parking[]> {
        try {
            const result = await this.find({
                where: {
                    blocked: false,
                    id: Not(In(occupiedIds))
                },
                relations: [
                    'building',
                    'cost_center',
                ]
            });
            logger.info(`Fetched available Parkings successfully`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching available Parkings. ${error}`);
            return [];
        }
    }

}