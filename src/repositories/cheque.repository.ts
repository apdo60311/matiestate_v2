import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { Cheque } from "../entities/Cheque.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ChequeRepository extends Repository<Cheque> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Cheque, datasource.createEntityManager());
    }

    async createCheque(cheque: Partial<Cheque>): Promise<string | null> {
        try {
            const result = await this.save(cheque);
            logger.info(`Cheque created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Cheque: ${error}`);
            return null;
        }
    }

    async getChequeById(id: string): Promise<Cheque | null> {
        try {
            const cheque = await this.findOne({
                where: { id },
                relations: ['currency', 'seller', 'account', 'tenant', 'pattern']
            });
            logger.info(`Retrieved Cheque with id: ${id}`);
            return cheque;
        } catch (error) {
            logger.error(`Error getting Cheque: ${error}`);
            return null;
        }
    }

    async updateCheque(id: string, cheque: Partial<Cheque>): Promise<boolean> {
        try {
            await this.update(id, cheque);
            logger.info(`Updated Cheque with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Cheque: ${error}`);
            return false;
        }
    }

    async getCheques(): Promise<Cheque[]> {
        try {
            const cheques = await this.find({
                relations: ['currency', 'seller', 'account', 'tenant', 'pattern']
            });
            logger.info(`Retrieved all Cheques`);
            return cheques;
        } catch (error) {
            logger.error(`Error getting all Cheques: ${error}`);
            return [];
        }
    }

    async deleteCheque(id: string): Promise<boolean> {
        try {
            await this.delete({ id });
            logger.info(`Deleted Cheque with id: ${id}`);
            return true;
        }
        catch (error) {
            logger.error(`Error deleting Cheque: ${error}`);
            return false;
        }
    }

    async findByInstallmentAndCode(installment_id: string, code: number): Promise<Cheque[] | null> {
        try {
            const cheque = await this.find({
                where: { installment_id, code },
                relations: ['currency', 'seller', 'account', 'tenant', 'pattern']
            });
            logger.info(`Retrieved Cheque with installment: ${installment_id} and code: ${code}`);
            return cheque;
        } catch (error) {
            logger.error(`Error getting Cheque: ${error}`);
            return null;
        }
    }
}