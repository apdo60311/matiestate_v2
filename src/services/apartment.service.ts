import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { ApartmentRepository } from "../repositories/apartment/apartment.repository";
import { Apartment } from "../entities/Apartment.entity";
import { ApartmentPictures } from "../entities/ApartmentPictures.entity";
import { ApartmentRentalPrice } from "../entities/ApartmentRentalPrice.entity";
import { ApartmentSellingPrice } from "../entities/ApartmentSellingPrice.entity";
import { ApartmentAccumulate } from "../entities/ApartmentAccumulate.entity";
import { ApartmentPicturesRepository } from "../repositories/apartment/apartment-picture.repository";
import { ApartmentAccumulateRepository } from "../repositories/apartment/apartment-accumulate.repository";
import { ApartmentRentalPriceRepository } from "../repositories/apartment/apartment-rental-price.repository";
import { ApartmentSellingPriceRepository } from "../repositories/apartment/apartment-selling-price.repository";
import { IApartmentAccumulate, IApartmentBody, IApartmentPicture, IApartmentRentalPrice, IApartmentSellingPrice } from "../types/apartment.types";
import { logger } from "../utils/logger";

@injectable()
export class ApartmentService {
  constructor(
    @inject(DI_TYPES.ApartmentRepository)
    private apartmentRepository: ApartmentRepository,
    @inject(DI_TYPES.ApartmentPicturesRepository)
    private apartmentPictureRepository: ApartmentPicturesRepository,
    @inject(DI_TYPES.ApartmentAccumulateRepository)
    private apartmentAccumulateRepository: ApartmentAccumulateRepository,
    @inject(DI_TYPES.ApartmentRentalPriceRepository)
    private apartmentRentalPriceRepository: ApartmentRentalPriceRepository,
    @inject(DI_TYPES.ApartmentSellingPriceRepository)
    private apartmentSellingPriceRepository: ApartmentSellingPriceRepository
  ) {}

  async createApartment(data: Partial<Apartment>): Promise<string | null> {
    return await this.apartmentRepository.createApartment(data);
  }

  async createApartments(data: Partial<Apartment>[]): Promise<string[] | null> {
    try {
      const apartmentIds = await this.apartmentRepository.createApartments(
        data
      );

      return apartmentIds;
    } catch (error) {
      logger.error(`Error in createApartments: ${error}`);
      return null;
    }
  }

  async createApartmentWithRelations(
    data: IApartmentBody
  ): Promise<string | null> {
    try {
      // Create apartment
      const apartmentId = await this.createApartment(data);
      if (!apartmentId) return null;

      if (data.pictures) {
        await this.addApartmentPictures(apartmentId, data.pictures);
      }

      if (data.rental_price) {
        data.rental_price.apartment_id = apartmentId;
        await this.addRentalPrice(data.rental_price);
      }

      if (data.selling_price) {
        data.selling_price.apartment_id = apartmentId;
        await this.addSellingPrice(data.selling_price);
      }

      if (data.accumulates) {
        await this.addAccumulations(data.accumulates);
      }

      return apartmentId;
    } catch (error) {
      logger.error(`Error in createApartmentWithRelations: ${error}`);
      return null;
    }
  }

  async getApartmentById(id: string): Promise<Apartment | null> {
    return await this.apartmentRepository.getApartmentById(id);
  }

  async getAllApartments(): Promise<Apartment[]> {
    return await this.apartmentRepository.getAllApartments();
  }

  async getApartmentsByBuildingId(buildingId: string): Promise<Apartment[]> {
    try {
      const apartments =
        await this.apartmentRepository.getApartmentsByBuildingId(buildingId);
      logger.info("Fetched all Apartments successfully.");
      return apartments;
    } catch (error) {
      logger.error(`Error in getApartmentsByBuildingId: ${error}`);
      return [];
    }
  }

  async updateApartment(
    id: string,
    data: Partial<Apartment>
  ): Promise<boolean> {
    return await this.apartmentRepository.updateApartment(id, data);
  }

  async deleteApartment(id: string): Promise<boolean> {
    return await this.apartmentRepository.deleteApartment(id);
  }

  async addApartmentPicture(
    picture: Partial<ApartmentPictures>
  ): Promise<string | null> {
    return await this.apartmentPictureRepository.createPicture(picture);
  }

  async addApartmentPictures(
    apartmentId: string,
    pictures: Partial<IApartmentPicture>[]
  ): Promise<string[]> {
    try {
      const apartmentPictures: ApartmentPictures[] = pictures.map(
        (pictures) => {
          const picturesEntity = new ApartmentPictures();
          Object.assign(picturesEntity, pictures);
          return picturesEntity;
        }
      );

      const picturesIds = await this.apartmentPictureRepository.createPictures(
        apartmentId,
        apartmentPictures
      );

      logger.info(`Created pictures successfully with ids: ${picturesIds}`);

      return picturesIds;
    } catch (error) {
      logger.error(`Error in addApartmentPictures: ${error}`);
      return [];
    }
  }

  async addRentalPrice(price: IApartmentRentalPrice): Promise<string | null> {
    return await this.apartmentRentalPriceRepository.createRentalPrice(price);
  }

  async addSellingPrice(price: IApartmentSellingPrice): Promise<string | null> {
    return await this.apartmentSellingPriceRepository.createSellingPrice(price);
  }

  async addAccumulation(
    accumulation: IApartmentAccumulate
  ): Promise<string | null> {
    return await this.apartmentAccumulateRepository.createAccumulate(
      accumulation
    );
  }

  async addAccumulations(
    accumulations: IApartmentAccumulate[]
  ): Promise<string[]> {
    try {
      const apartmentAccumulates: ApartmentAccumulate[] = accumulations.map(
        (accumulation) => {
          const accumulationEntity = new ApartmentAccumulate();
          Object.assign(accumulationEntity, accumulation);
          return accumulationEntity;
        }
      );

      const accumulationsIds =
        await this.apartmentAccumulateRepository.createAccumulates(
          apartmentAccumulates
        );

      logger.info(
        `Created accumulates successfully with ids: ${accumulationsIds}`
      );

      return accumulationsIds ?? [];
    } catch (error) {
      logger.error(`Error in addAccumulations: ${error}`);
      return [];
    }
  }

  async getApartmentPictures(
    apartmentId: string
  ): Promise<ApartmentPictures[]> {
    return await this.apartmentPictureRepository.getPicturesByApartmentId(
      apartmentId
    );
  }

  async getRentalPriceHistory(
    apartmentId: string
  ): Promise<ApartmentRentalPrice[]> {
    return await this.apartmentRentalPriceRepository.getRentalPriceHistory(
      apartmentId
    );
  }

  async getSellingPriceHistory(
    apartmentId: string
  ): Promise<ApartmentSellingPrice[]> {
    return await this.apartmentSellingPriceRepository.getSellingPriceHistory(
      apartmentId
    );
  }
}
