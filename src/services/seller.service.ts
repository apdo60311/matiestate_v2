import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Seller } from "../entities/Seller.entity";
import { SellerRepository } from "../repositories/seller.repository";
import { logger } from "../utils/logger";

@injectable()
export class SellerService {
    constructor(
        @inject(DI_TYPES.SellerRepository)
        private sellerRepository: SellerRepository
    ) {}

    async createSeller(data: Partial<Seller>): Promise<string | null> {
        try {
            const sellerId = await this.sellerRepository.createSeller(data);
            if (!sellerId) {
                logger.error('Failed to create seller');
                return null;
            }
            logger.info(`Seller created successfully with id: ${sellerId}`);
            return sellerId;
        } catch (error) {
            logger.error(`Error creating seller: ${error}`);
            return null;
        }
    }

    async getSellerById(id: string): Promise<Seller | null> {
        try {
            const seller = await this.sellerRepository.getSellerById(id);
            if (!seller) {
                logger.warn(`No seller found with id: ${id}`);
                return null;
            }
            return seller;
        } catch (error) {
            logger.error(`Error fetching seller by id: ${error}`);
            return null;
        }
    }

    async getAllSellers(): Promise<Seller[]> {
        try {
            return await this.sellerRepository.getAllSellers();
        } catch (error) {
            logger.error(`Error fetching all sellers: ${error}`);
            return [];
        }
    }

    async updateSeller(id: string, data: Partial<Seller>): Promise<boolean> {
        try {
            const result = await this.sellerRepository.updateSeller(id, data);
            if (!result) {
                logger.error(`Failed to update seller with id: ${id}`);
            }
            return result;
        } catch (error) {
            logger.error(`Error updating seller: ${error}`);
            return false;
        }
    }

    async deleteSeller(id: string): Promise<boolean> {
        try {
            const result = await this.sellerRepository.deleteSeller(id);
            if (!result) {
                logger.error(`Failed to delete seller with id: ${id}`);
            }
            return result;
        } catch (error) {
            logger.error(`Error deleting seller: ${error}`);
            return false;
        }
    }

    async getSellersByTenantId(tenantId: string): Promise<Seller[]> {
        try {
            return await this.sellerRepository.getSellerByTenantId(tenantId);
        } catch (error) {
            logger.error(`Error fetching sellers by tenant id: ${error}`);
            return [];
        }
    }
}