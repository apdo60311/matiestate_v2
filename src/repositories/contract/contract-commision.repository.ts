import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ContractCommission } from "../../entities/ContractComission.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractCommissionRepository extends Repository<ContractCommission> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ContractCommission, datasource.createEntityManager());
    }

    async createCommission(commission: Partial<ContractCommission>): Promise<string | null> {
        try {
            const result = await this.save(commission);
            logger.info(`Contract Commission Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Contract Commission. ${error}`);
            return null;
        }
    }

    async getCommissionByContractId(contractId: string): Promise<ContractCommission | null> {
        try {
            const result = await this.findOne({
                where: { contract: { id: contractId } },
                relations: [
                    'commission_account',
                    'commission_from_owner_account',
                    'commission_from_lessor_account'
                ]
            });
            logger.info(`Fetched Commission for contract: ${contractId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Commission for contract: ${contractId}. ${error}`);
            return null;
        }
    }

    async updateCommission(id: string, commission: Partial<ContractCommission>): Promise<boolean> {
        try {
            await this.update(id, commission);
            logger.info(`Updated Commission with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Commission with id: ${id}. ${error}`);
            return false;
        }
    }
}
