import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ParkingWallet } from "../../entities/ParkingWallet.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ParkingWalletRepository extends Repository<ParkingWallet> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ParkingWallet, datasource.createEntityManager());
    }

    async createWallet(wallet: Partial<ParkingWallet>): Promise<string | null> {
        try {
            const result = await this.save(wallet);
            logger.info(`Parking Wallet created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Parking Wallet. ${error}`);
            return null;
        }
    }

    async getWalletById(id: string): Promise<ParkingWallet | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: [
                    'contract',
                    'building',
                    'parking',
                    'tenant'
                ]
            });
            logger.info(`Fetched Parking Wallet with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Parking Wallet. ${error}`);
            return null;
        }
    }

    async getWalletsByParkingId(parkingId: string): Promise<ParkingWallet[]> {
        try {
            const wallets = await this.find({
                where: { parking: { id: parkingId } },
                relations: ['contract', 'building', 'tenant']
            });
            logger.info(`Retrieved wallets for parking: ${parkingId}`);
            return wallets;
        } catch (error) {
            logger.error(`Error while fetching Parking Wallets. ${error}`);
            return [];
        }
    }

    async updateWallet(id: string, wallet: Partial<ParkingWallet>): Promise<boolean> {
        try {
            await this.update(id, wallet);
            logger.info(`Updated Parking Wallet with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Parking Wallet. ${error}`);
            return false;
        }
    }

    async deleteWallet(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Parking Wallet with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Parking Wallet. ${error}`);
            return false;
        }
    }
}