import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { OpReturn } from "../../entities/OPReturn.entity";

@injectable()
export class OpReturnRepository extends Repository<OpReturn> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(OpReturn, datasource.createEntityManager());
    }

    async createOpReturn(opReturn: Partial<OpReturn>): Promise<string | null> {
        try {
            const result = await this.save(opReturn);
            logger.info(`OpReturn created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating OpReturn: ${error}`);
            return null;
        }
    }

    async getOpReturnById(id: string): Promise<OpReturn | null> {
        try {
            const opReturn = await this.findOne({
                where: { id },
                relations: [
                    "currency",
                    "debit_account",
                    "credit_account",
                    "cost_center",
                    "voucher",
                    "cheque",
                    "connect_with_chq",
                    "tenant"
                ]
            });
            logger.info(`Retrieved OpReturn with id: ${id}`);
            return opReturn;
        } catch (error) {
            logger.error(`Error getting OpReturn: ${error}`);
            return null;
        }
    }

    async updateOpReturn(id: string, opReturn: Partial<OpReturn>): Promise<boolean> {
        try {
            await this.update(id, opReturn);
            logger.info(`Updated OpReturn with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating OpReturn: ${error}`);
            return false;
        }
    }

    async getOpReturns(): Promise<OpReturn[]> {
        try {
            const opReturns = await this.find({
                relations: [
                    "currency",
                    "debit_account",
                    "credit_account",
                    "cost_center",
                    "voucher",
                    "cheque",
                    "connect_with_chq",
                    "tenant"
                ]
            });
            logger.info(`Retrieved all OpReturns`);
            return opReturns;
        } catch (error) {
            logger.error(`Error getting all OpReturns: ${error}`);
            return [];
        }
    }

    async deleteOpReturn(id: string): Promise<boolean> {
        try {
            await this.delete({ id });
            logger.info(`Deleted OpReturn with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting OpReturn: ${error}`);
            return false;
        }
    }

    async findByChequeId(cheque_id: string): Promise<OpReturn[] | null> {
        try {
            const opReturns = await this.find({
                where: { cheque: { id: cheque_id } },
                relations: [
                    "currency",
                    "debit_account",
                    "credit_account",
                    "cost_center",
                    "voucher",
                    "cheque",
                    "connect_with_chq",
                    "tenant"
                ]
            });
            logger.info(`Retrieved OpReturns with cheque_id: ${cheque_id}`);
            return opReturns;
        } catch (error) {
            logger.error(`Error getting OpReturns by cheque_id: ${error}`);
            return null;
        }
    }
}