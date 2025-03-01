import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { Seller } from "../entities/Seller.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class SellerRepository extends Repository<Seller> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Seller, datasource.createEntityManager());
    }

    async createSeller(seller: Partial<Seller>): Promise<string | null> {
        try {
            const result = await this.save(seller);
            logger.info(`Seller Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Seller. ${error}`);
            return null;
        }
    }

    async getSellerById(id: string): Promise<Seller | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['tenant']
            });
            logger.info(`Fetched Seller with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Seller. ${error}`);
            return null;
        }
    }

    async getAllSellers(): Promise<Seller[]> {
        try {
            const sellers = await this.find({
                relations: ['tenant']
            });
            logger.info('Fetched all Sellers successfully');
            return sellers;
        } catch (error) {
            logger.error(`Error while fetching Sellers. ${error}`);
            return [];
        }
    }

    async updateSeller(id: string, seller: Partial<Seller>): Promise<boolean> {
        try {
            await this.update(id, seller);
            logger.info(`Updated Seller with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Seller. ${error}`);
            return false;
        }
    }

    async deleteSeller(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Seller with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Seller. ${error}`);
            return false;
        }
    }

    async getSellerByTenantId(tenantId: string): Promise<Seller[]> {
        try {
            const sellers = await this.find({
                where: { tenant_id: tenantId },
                relations: ['tenant']
            });
            logger.info(`Fetched Sellers for tenant: ${tenantId}`);
            return sellers;
        } catch (error) {
            logger.error(`Error while fetching Sellers by tenant. ${error}`);
            return [];
        }
    }
}