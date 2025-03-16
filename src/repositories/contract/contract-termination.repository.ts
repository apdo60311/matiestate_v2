import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ContractTermination } from "../../entities/ContractTermination.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractTerminationRepository extends Repository<ContractTermination> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ContractTermination, datasource.createEntityManager());
    }

    async createTermination(termination: Partial<ContractTermination>): Promise<string | null> {
        try {
            const result = await this.save(termination);
            logger.info(`Contract Termination Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Contract Termination. ${error}`);
            return null;
        }
    }

    async getTerminationByContractId(contractId: string): Promise<ContractTermination | null> {
        try {
            const result = await this.findOne({
                where: { contract: { id: contractId } },
                relations: ['revenue_account', 'fines_revenue_account']
            });
            logger.info(`Fetched Termination for contract: ${contractId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Termination for contract: ${contractId}. ${error}`);
            return null;
        }
    }

    async updateTermination(id: string, termination: Partial<ContractTermination>): Promise<boolean> {
        try {
            await this.update(id, termination);
            logger.info(`Updated Termination with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Termination with id: ${id}. ${error}`);
            return false;
        }
    }
}
