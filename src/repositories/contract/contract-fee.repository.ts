import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ContractFee } from "../../entities/ContractFee.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractFeeRepository extends Repository<ContractFee> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ContractFee, datasource.createEntityManager());
    }

    async createFee(fee: Partial<ContractFee>): Promise<string | null> {
        try {
            const result = await this.save(fee);
            logger.info(`Contract Fee Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Contract Fee. ${error}`);
            return null;
        }
    }

    async createFees(contractId: string, fees: Partial<ContractFee>[]): Promise<string[] | null> {
        try {
            const feesWithContract = fees.map(fee => ({
                ...fee,
                contract: { id: contractId }
            }));

            const result = await this.save(feesWithContract);
            const feeIds = result.map(fee => fee.id);
            logger.info(`Contract Fees Created successfully with ids: ${feeIds.join(', ')}`);
            return feeIds;
        } catch (error) {
            logger.error(`Error while creating Contract Fees. ${error}`);
            return null;
        }
    }

    async getFeesByContractId(contractId: string): Promise<ContractFee[]> {
        try {
            const result = await this.find({
                where: { contract: { id: contractId } },
                relations: ['account']
            });
            logger.info(`Fetched Fees for contract: ${contractId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Fees for contract: ${contractId}. ${error}`);
            return [];
        }
    }

    async updateFee(id: string, fee: Partial<ContractFee>): Promise<boolean> {
        try {
            await this.update(id, fee);
            logger.info(`Updated Fee with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Fee with id: ${id}. ${error}`);
            return false;
        }
    }

    async deleteFee(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            if (result.affected && result.affected > 0) {
                logger.info(`Deleted Fee with id: ${id}`);
                return true;
            }
            return false;
        } catch (error) {
            logger.error(`Error while deleting Fee with id: ${id}. ${error}`);
            return false;
        }
    }
}
