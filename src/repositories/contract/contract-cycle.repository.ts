import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ContractCycle } from "../../entities/ContractCycle.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractCycleRepository extends Repository<ContractCycle> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ContractCycle, datasource.createEntityManager());
    }

    async createCycle(cycle: Partial<ContractCycle>): Promise<string | null> {
        try {
            const result = await this.save(cycle);
            logger.info(`Contract Cycle Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Contract Cycle. ${error}`);
            return null;
        }
    }

    async getCycleByContractId(contractId: string): Promise<ContractCycle | null> {
        try {
            const result = await this.findOne({
                where: { contract: { id: contractId } }
            });
            logger.info(`Fetched Cycle for contract: ${contractId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Cycle for contract: ${contractId}. ${error}`);
            return null;
        }
    }

    async updateCycle(id: string, cycle: Partial<ContractCycle>): Promise<boolean> {
        try {
            await this.update(id, cycle);
            logger.info(`Updated Cycle with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Cycle with id: ${id}. ${error}`);
            return false;
        }
    }
}
