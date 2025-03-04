import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { MaterialBalance } from "../../entities/MaterialBalance.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class MaterialBalanceRepository extends Repository<MaterialBalance> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(MaterialBalance, datasource.createEntityManager());
    }

    async createBalance(balance: Partial<MaterialBalance>): Promise<string | null> {
        try {
            const result = await this.save(balance);
            logger.info(`Material Balance created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Material Balance: ${error}`);
            return null;
        }
    }

    async getBalanceById(id: string): Promise<MaterialBalance | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['material', 'store', 'tenant']
            });
            logger.info(`Retrieved material balance with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Balance: ${error}`);
            return null;
        }
    }

    async getBalanceByMaterialAndStore(materialId: string, storeId: string): Promise<MaterialBalance | null> {
        try {
            const result = await this.findOne({
                where: { 
                    material_id: materialId,
                    store_id: storeId
                },
                relations: ['material', 'store', 'tenant']
            });
            logger.info(`Retrieved material balance for material: ${materialId} and store: ${storeId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Balance: ${error}`);
            return null;
        }
    }

    async getAllBalances(): Promise<MaterialBalance[]> {
        try {
            const result = await this.find({
                relations: ['material', 'store', 'tenant']
            });
            logger.info('Retrieved all material balances');
            return result;
        } catch (error) {
            logger.error(`Error while fetching Material Balances: ${error}`);
            return [];
        }
    }

    async updateBalance(id: string, balance: Partial<MaterialBalance>): Promise<boolean> {
        try {
            await this.update(id, balance);
            logger.info(`Updated material balance with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Material Balance: ${error}`);
            return false;
        }
    }

    async deleteBalance(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted material balance with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Material Balance: ${error}`);
            return false;
        }
    }
}