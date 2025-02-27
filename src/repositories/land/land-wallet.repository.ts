import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { LandWallet } from "../../entities/LandWallet.entity";

@injectable()
export class LandWalletRepository extends Repository<LandWallet> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(LandWallet, datasource.createEntityManager());
    }

    async createWallet(wallet: Partial<LandWallet>): Promise<string | null> {
        try {
            const result = await this.save(wallet);
            logger.info(`Land Wallet created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Land Wallet. ${error}`);
            return null;
        }
    }

    async getWalletsByLandId(landId: string): Promise<LandWallet[]> {
        try {
            const wallets = await this.find({
                where: { land: { id: landId } },
                relations: ['contract', 'tenant']
            });
            logger.info(`Retrieved wallets for land: ${landId}`);
            return wallets;
        } catch (error) {
            logger.error(`Error while fetching Land Wallets. ${error}`);
            return [];
        }
    }

    async updateWallet(id: string, wallet: Partial<LandWallet>): Promise<boolean> {
        try {
            await this.update(id, wallet);
            logger.info(`Updated Land Wallet with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Land Wallet. ${error}`);
            return false;
        }
    }

    async deleteWallet(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Land Wallet with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Land Wallet. ${error}`);
            return false;
        }
    }
}