import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { Installment } from "../entities/Installment.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class InstallmentRepository extends Repository<Installment> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Installment, datasource.createEntityManager());
    }

    async createInstallment(installment: Partial<Installment>): Promise<string | null> {
        try {
            const result = await this.save(installment);
            logger.info(`Installment Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Installment. ${error}`);
            return null;
        }
    }

    async getInstallmentById(id: string): Promise<Installment | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['currency', 'bank', 'tenant', 'contract']
            });
            logger.info(`Fetched Installment with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Installment with id: ${id}. ${error}`);
            return null;
        }
    }

    async getInstallmentByContractId(contractId: string): Promise<Installment | null> {
        try {
            const result = await this.findOne({
                where: { contract: { id: contractId } },
                relations: ['currency', 'bank', 'tenant']
            });
            logger.info(`Fetched Installment for contract: ${contractId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Installment for contract: ${contractId}. ${error}`);
            return null;
        }
    }

    async updateInstallment(id: string, installment: Partial<Installment>): Promise<boolean> {
        try {
            await this.update(id, installment);
            logger.info(`Updated Installment with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Installment with id: ${id}. ${error}`);
            return false;
        }
    }

    async deleteInstallment(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            if (result.affected && result.affected > 0) {
                logger.info(`Deleted Installment with id: ${id}`);
                return true;
            }
            return false;
        } catch (error) {
            logger.error(`Error while deleting Installment with id: ${id}. ${error}`);
            return false;
        }
    }
}
