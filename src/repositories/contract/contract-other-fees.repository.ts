import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ContractOtherFees } from "../../entities/ContractOtherFees.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractOtherFeesRepository extends Repository<ContractOtherFees> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ContractOtherFees, datasource.createEntityManager());
    }

    async createOtherFee(fee: Partial<ContractOtherFees>): Promise<string | null> {
        try {
            const result = await this.save(fee);
            logger.info(`Contract Other Fee Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Contract Other Fee. ${error}`);
            return null;
        }
    }

    async createOtherFees(contractId: string, fees: Partial<ContractOtherFees>[]): Promise<string[] | null> {
        try {
            const feesWithContract = fees.map(fee => ({
                ...fee,
                contract: { id: contractId }
            }));

            const result = await this.save(feesWithContract);
            const feeIds = result.map(fee => fee.id);
            logger.info(`Contract Other Fees Created successfully with ids: ${feeIds.join(', ')}`);
            return feeIds;
        } catch (error) {
            logger.error(`Error while creating Contract Other Fees. ${error}`);
            return null;
        }
    }

    async getOtherFeesByContractId(contractId: string): Promise<ContractOtherFees[]> {
        try {
            const result = await this.find({
                where: { contract: { id: contractId } },
                relations: ['account']
            });
            logger.info(`Fetched Other Fees for contract: ${contractId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Other Fees for contract: ${contractId}. ${error}`);
            return [];
        }
    }

    async updateOtherFee(id: string, fee: Partial<ContractOtherFees>): Promise<boolean> {
        try {
            await this.update(id, fee);
            logger.info(`Updated Other Fee with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Other Fee with id: ${id}. ${error}`);
            return false;
        }
    }

    async deleteOtherFee(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            if (result.affected && result.affected > 0) {
                logger.info(`Deleted Other Fee with id: ${id}`);
                return true;
            }
            return false;
        } catch (error) {
            logger.error(`Error while deleting Other Fee with id: ${id}. ${error}`);
            return false;
        }
    }
}