import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Parking } from "../entities/Parking.entity";
import { ParkingRepository } from "../repositories/parking/parking.repository";
import { ParkingPicturesRepository } from "../repositories/parking/parking-pictures.repository";
import { ParkingRentalPriceRepository } from "../repositories/parking/parking-rental-price.repository";
import { ParkingSellingPriceRepository } from "../repositories/parking/parking-selling-price.repositroy";
import { ParkingAccumulateRepository } from "../repositories/parking/parking-accumulate.repository";
import { ParkingWalletRepository } from "../repositories/parking/parking-wallet.repository";
import { logger } from "../utils/logger";
import { IParkingAccumulate, IParkingBody, IParkingPicture, IParkingRentalPrice, IParkingSellingPrice } from "../types/parking.types";
import { ParkingPictures } from "../entities/ParkingPicture.entity";
import { ParkingRentalPrice } from "../entities/ParkingRentalPrice.entity";
import { ParkingSellingPrice } from "../entities/ParkingSellingPrice";
import { ParkingAccumulate } from "../entities/ParkingAccumulate.entity";
import { ParkingWallet } from "../entities/ParkingWallet.entity";

@injectable()
export class ParkingService {
    constructor(
        @inject(DI_TYPES.ParkingRepository)
        private parkingRepository: ParkingRepository,
        @inject(DI_TYPES.ParkingPicturesRepository)
        private parkingPicturesRepository: ParkingPicturesRepository,
        @inject(DI_TYPES.ParkingRentalPriceRepository)
        private parkingRentalPriceRepository: ParkingRentalPriceRepository,
        @inject(DI_TYPES.ParkingSellingPriceRepository)
        private parkingSellingPriceRepository: ParkingSellingPriceRepository,
        @inject(DI_TYPES.ParkingAccumulateRepository)
        private parkingAccumulateRepository: ParkingAccumulateRepository,
        @inject(DI_TYPES.ParkingWalletRepository)
        private parkingWalletRepository: ParkingWalletRepository
    ) {}

    async createParking(data: Partial<IParkingBody>): Promise<string | null> {
        try {
            const parkingId = await this.parkingRepository.createParking(data);
            if (!parkingId) return null;

            if (data.pictures?.length) {
                await this.createParkingPictures(parkingId, data.pictures);
            }

            if (data.rental_price) {
                await this.createParkingRentalPrice(parkingId, data.rental_price);
            }

            if (data.selling_price) {
                await this.createParkingSellingPrice(parkingId, data.selling_price);
            }

            if (data.accumulates?.length) {
                await this.createParkingAccumulates(parkingId, data.accumulates);
            }

            logger.info(`Parking created with id: ${parkingId}`);
            return parkingId;
        } catch (error) {
            logger.error(`Error creating parking: ${error}`);
            return null;
        }
    }

    async createParkings(data: Partial<Parking>[]): Promise<string[] | null> {
        try {
            const parkingIds = await this.parkingRepository.createParkings(data);

            return parkingIds;
        } catch (error) {
            logger.error(`Error creating parkings: ${error}`);
            return null;
        }
    }

    async createParkingPictures(parkingId: string, pictures: Partial<IParkingPicture>[]): Promise<string[] | null> {
        try {
            const picturesToInsert: ParkingPictures[] = pictures.map((picture) => {
                const parkingPictures = new ParkingPictures();
                picture.parking_id = parkingId;
                Object.assign(parkingPictures, picture);
                return parkingPictures;
            });

            return await this.parkingPicturesRepository.createPictures(picturesToInsert);
        } catch (error) {
            logger.error(`Error creating parking pictures: ${error}`);
            return null;
        }
    }

    async getParkingPictures(parkingId: string): Promise<ParkingPictures[]> {
        return await this.parkingPicturesRepository.getByParkingId(parkingId);
    }

    async deleteParkingPicture(id: string): Promise<boolean> {
        return await this.parkingPicturesRepository.deletePicture(id);
    }

    async createParkingRentalPrice(parkingId: string, price: Partial<IParkingRentalPrice>): Promise<string | null> {
        try {
            price.parking_id = parkingId; 
            return await this.parkingRentalPriceRepository.createRentalPrice(price);
        } catch (error) {
            logger.error(`Error creating parking rental price: ${error}`);
            return null;
        }
    }

    async getParkingRentalPrices(parkingId: string): Promise<ParkingRentalPrice[]> {
        return await this.parkingRentalPriceRepository.getRentalPricesByParkingId(parkingId);
    }

    async createParkingSellingPrice(parkingId: string, price: Partial<IParkingSellingPrice>): Promise<string | null> {
        try {
            price.parking_id = parkingId; 
            return await this.parkingSellingPriceRepository.createSellingPrice(price);
        } catch (error) {
            logger.error(`Error creating parking selling price: ${error}`);
            return null;
        }
    }

    async getParkingSellingPrices(parkingId: string): Promise<ParkingSellingPrice[]> {
        return await this.parkingSellingPriceRepository.getSellingPricesByParkingId(parkingId);
    }

    async createParkingAccumulates(parkingId: string, accumulates: Partial<IParkingAccumulate>[]): Promise<string[] | null> {
        try {
            const accumulatesToInsert: ParkingAccumulate[] = accumulates.map((accumulateToInsert) =>{
                const parkingAccumulate = new ParkingAccumulate();
                accumulateToInsert.parking_id = parkingId;
                Object.assign(parkingAccumulate, accumulateToInsert);
                return parkingAccumulate;
            });

            return await this.parkingAccumulateRepository.createAccumulates(accumulatesToInsert);
        } catch (error) {
            logger.error(`Error creating parking accumulates: ${error}`);
            return null;
        }
    }

    async getParkingAccumulates(parkingId: string): Promise<ParkingAccumulate[]> {
        return await this.parkingAccumulateRepository.getAccumulatesByMainParkingId(parkingId);
    }

    async createParkingWallet(parkingId: string, wallet: Partial<ParkingWallet>): Promise<string | null> {
        try {
            wallet.parking = { id: parkingId } as any;
            return await this.parkingWalletRepository.createWallet(wallet);
        } catch (error) {
            logger.error(`Error creating parking wallet: ${error}`);
            return null;
        }
    }

    async getParkingWallets(parkingId: string): Promise<ParkingWallet[]> {
        return await this.parkingWalletRepository.getWalletsByParkingId(parkingId);
    }

    // Basic CRUD methods
    async getParkingById(id: string): Promise<Parking | null> {
        return await this.parkingRepository.getParkingById(id);
    }

    async getAllParkings(): Promise<Parking[]> {
        return await this.parkingRepository.find();
    }

    async getParkingsByBuildingId(buildingId: string): Promise<Parking[]> {
        return await this.parkingRepository.getParkingsByBuildingId(buildingId);
    }

    async updateParking(id: string, data: Partial<Parking>): Promise<boolean> {
        return await this.parkingRepository.updateParking(id, data);
    }

    async deleteParking(id: string): Promise<boolean> {
        return await this.parkingRepository.deleteParking(id);
    }
}