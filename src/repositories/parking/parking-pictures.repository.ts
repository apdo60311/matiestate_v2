import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ParkingPictures } from "../../entities/ParkingPicture.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ParkingPicturesRepository extends Repository<ParkingPictures> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ParkingPictures, datasource.createEntityManager());
    }

    async createPictures(pictures: Partial<ParkingPictures>[]): Promise<string[] | null> {
        try {
            const result = await this.save(pictures);
            logger.info(`Parking Pictures created successfully with ids: ${result.map(pic => pic.id)}`);
            return result.map(pic => pic.id);
        } catch (error) {
            logger.error(`Error while creating Parking Pictures. ${error}`);
            return null;
        }
    }

    async getByParkingId(parkingId: string): Promise<ParkingPictures[]> {
        try {
            return await this.find({
                where: { parking: { id: parkingId } },
                relations: ['tenant']
            });
        } catch (error) {
            logger.error(`Error while fetching Parking Pictures. ${error}`);
            return [];
        }
    }

    async deletePicture(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Parking Picture with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Parking Picture. ${error}`);
            return false;
        }
    }
}