import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { ApartmentPictures } from "../entities/ApartmentPictures.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ApartmentPicturesRepository extends Repository<ApartmentPictures> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ApartmentPictures, datasource.createEntityManager());
    }

    async createPicture(picture: Partial<ApartmentPictures>): Promise<string | null> {
        try {
            const result = await this.save(picture);
            logger.info(`Apartment Picture created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Apartment Picture. ${error}`);
            return null;
        }
    }

    async createPictures(apartmentId: string, pictures: Partial<ApartmentPictures>[]) {
        try {
            // map apartmentId to each picture
            pictures = pictures.map((picture) => {
                picture.apartment_id = apartmentId;
                return picture;
            });
            const result = await this.save(pictures);
            logger.info(`Apartment Pictures created successfully with ids: ${result.map((picture) => picture.id)}`);
            return result.map((picture) => picture.id);
        } catch (error) {
            logger.error(`Error while creating Apartment Pictures. ${error}`);
            return [];
        }
    }

    async getPicturesByApartmentId(apartmentId: string): Promise<ApartmentPictures[]> {
        try {
            const pictures = await this.find({
                where: { apartment: { id: apartmentId } },
                relations: ['tenant']
            });
            logger.info(`Retrieved pictures for apartment: ${apartmentId}`);
            return pictures;
        } catch (error) {
            logger.error(`Error while fetching Apartment Pictures. ${error}`);
            return [];
        }
    }
}