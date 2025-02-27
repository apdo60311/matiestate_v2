import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Villa } from "../entities/Villa.entity";
import { VillaRepository } from "../repositories/villa/villa.repository";
import { VillaRentalPriceRepository } from "../repositories/villa/villa-rental-price.repository";
import { VillaSellingPriceRepository } from "../repositories/villa/villa-selling-price.repository";
import { logger } from "../utils/logger";
import { IVillaBody, IVillaRentalPrice, IVillaSellingPrice } from "../types/villa.types";
import { VillaRentalPrice } from "../entities/VillaRentalPrice.entity";
import { VillaSellingPrice } from "../entities/VillaSellingPrice.entity";

@injectable()
export class VillaService {
    constructor(
        @inject(DI_TYPES.VillaRepository)
        private villaRepository: VillaRepository,
        @inject(DI_TYPES.VillaRentalPriceRepository)
        private villaRentalPriceRepository: VillaRentalPriceRepository,
        @inject(DI_TYPES.VillaSellingPriceRepository)
        private villaSellingPriceRepository: VillaSellingPriceRepository
    ) {}

    async createVilla(data: Partial<IVillaBody>): Promise<string | null> {
        try {
            const villaId = await this.villaRepository.createVilla(data);
            if (!villaId) return null;

            if (data.rental_price) {
                await this.createVillaRentalPrice(villaId, data.rental_price);
            }

            if (data.selling_price) {
                await this.createVillaSellingPrice(villaId, data.selling_price);
            }

            logger.info(`Villa created successfully with id: ${villaId}`);
            return villaId;
        } catch (error) {
            logger.error(`Error creating villa: ${error}`);
            return null;
        }
    }

    async createVillaRentalPrice(villaId: string, price: IVillaRentalPrice): Promise<string | null> {
        try {
            price.villa_id = villaId;
            
            const villaRentalPrice: VillaRentalPrice = new VillaRentalPrice();
            Object.assign(villaRentalPrice, price);

            return await this.villaRentalPriceRepository.createRentalPrice(villaRentalPrice);
        } catch (error) {
            logger.error(`Error creating villa rental price: ${error}`);
            return null;
        }
    }

    async getVillaRentalPrices(villaId: string) {
        return await this.villaRentalPriceRepository.getRentalPricesByVillaId(villaId);
    }

    async createVillaSellingPrice(villaId: string, price: IVillaSellingPrice): Promise<string | null> {
        try {
            price.villa_id = villaId;

            const villaSellingPrice: VillaSellingPrice = new VillaSellingPrice();
            Object.assign(villaSellingPrice, price);
            
            return await this.villaSellingPriceRepository.createSellingPrice(villaSellingPrice);
        } catch (error) {
            logger.error(`Error creating villa selling price: ${error}`);
            return null;
        }
    }

    async getVillaSellingPrices(villaId: string) {
        return await this.villaSellingPriceRepository.getSellingPricesByVillaId(villaId);
    }

    async getVillaById(id: string): Promise<Villa | null> {
        return await this.villaRepository.getVillaById(id);
    }

    async getAllVillas(): Promise<Villa[]> {
        return await this.villaRepository.getAllVillas();
    }

    async updateVilla(id: string, data: Partial<Villa>): Promise<boolean> {
        return await this.villaRepository.updateVilla(id, data);
    }

    async deleteVilla(id: string): Promise<boolean> {
        return await this.villaRepository.deleteVilla(id);
    }
}