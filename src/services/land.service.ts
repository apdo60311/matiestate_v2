import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Land } from "../entities/Land.entity";
import { LandRepository } from "../repositories/land/land.repository";
import { LandRentalPriceRepository } from "../repositories/land/land-rental-price.repository";
import { LandSellingPriceRepository } from "../repositories/land/land-selling-price.repository";
import { LandAccumulateRepository } from "../repositories/land/land-accumulate.repository";
import { LandWalletRepository } from "../repositories/land/land-wallet.repository";
import { logger } from "../utils/logger";
import { ILandAccumulate, ILandBody, ILandRentalPrice, ILandSellingPrice, ILandWallet } from "../types/land.types";
import { LandAccumulate } from "../entities/LandAccumulate.entity";
import { LandWallet } from "../entities/LandWallet.entity";

@injectable()
export class LandService {
    constructor(
        @inject(DI_TYPES.LandRepository)
        private landRepository: LandRepository,
        @inject(DI_TYPES.LandRentalPriceRepository)
        private landRentalPriceRepository: LandRentalPriceRepository,
        @inject(DI_TYPES.LandSellingPriceRepository)
        private landSellingPriceRepository: LandSellingPriceRepository,
        @inject(DI_TYPES.LandAccumulateRepository)
        private landAccumulateRepository: LandAccumulateRepository,
        @inject(DI_TYPES.LandWalletRepository)
        private landWalletRepository: LandWalletRepository
    ) {}

    async createLand(data: Partial<ILandBody>): Promise<string | null> {
        try {
            const landId = await this.landRepository.createLand(data);
            if (!landId) return null;

            if (data.rental_price) {
                await this.createLandRentalPrice(landId, data.rental_price);
            }

            if (data.selling_price) {
                await this.createLandSellingPrice(landId, data.selling_price);
            }

            if (data.accumulates?.length) {
                await this.createLandAccumulates(landId, data.accumulates);
            }

            if (data.wallet) {
                await this.createLandWallet(landId, data.wallet);
            }

            logger.info(`Land created successfully with id: ${landId}`);
            return landId;
        } catch (error) {
            logger.error(`Error creating land: ${error}`);
            return null;
        }
    }

    async createLandRentalPrice(landId: string, price: ILandRentalPrice): Promise<string | null> {
        try {
            price.land_id = landId;
            return await this.landRentalPriceRepository.createRentalPrice(price);
        } catch (error) {
            logger.error(`Error creating land rental price: ${error}`);
            return null;
        }
    }

    async getLandRentalPrices(landId: string) {
        return await this.landRentalPriceRepository.getRentalPricesByLandId(landId);
    }

    async createLandSellingPrice(landId: string, price: ILandSellingPrice): Promise<string | null> {
        try {
            price.land_id = landId;
            return await this.landSellingPriceRepository.createSellingPrice(price);
        } catch (error) {
            logger.error(`Error creating land selling price: ${error}`);
            return null;
        }
    }

    async getLandSellingPrices(landId: string) {
        return await this.landSellingPriceRepository.getSellingPricesByLandId(landId);
    }

    async createLandAccumulates(landId: string, accumulates: ILandAccumulate[]): Promise<string[] | null> {
        try {
            const accumulatesToInsert: LandAccumulate[] = accumulates.map((accumulate) => {
                const landAccumulate: LandAccumulate = new LandAccumulate();
                accumulate.main_land_id = landId;
                Object.assign(landAccumulate, accumulate);
                return landAccumulate;
            });
            return await this.landAccumulateRepository.createAccumulates(accumulatesToInsert);
        } catch (error) {
            logger.error(`Error creating land accumulates: ${error}`);
            return null;
        }
    }

    async getLandAccumulates(landId: string) {
        return await this.landAccumulateRepository.getAccumulatesByMainLandId(landId);
    }

    async createLandWallet(landId: string, wallet: ILandWallet): Promise<string | null> {
        try {
            const landWallet: LandWallet = new LandWallet();
            wallet.land_id = landId;
            Object.assign(landWallet, wallet);
            return await this.landWalletRepository.createWallet(landWallet);
        } catch (error) {
            logger.error(`Error creating land wallet: ${error}`);
            return null;
        }
    }

    async getLandWallets(landId: string) {
        return await this.landWalletRepository.getWalletsByLandId(landId);
    }

    async updateLandWallet(id: string, wallet: ILandWallet): Promise<boolean> {
        return await this.landWalletRepository.updateWallet(id, wallet);
    }

    async deleteLandWallet(id: string): Promise<boolean> {
        return await this.landWalletRepository.deleteWallet(id);
    }

    async getLandById(id: string): Promise<Land | null> {
        return await this.landRepository.getLandById(id);
    }

    async getAllLands(): Promise<Land[]> {
        return await this.landRepository.getAllLands();
    }

    async updateLand(id: string, data: Partial<Land>): Promise<boolean> {
        return await this.landRepository.updateLand(id, data);
    }

    async deleteLand(id: string): Promise<boolean> {
        return await this.landRepository.deleteLand(id);
    }
}