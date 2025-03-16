import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Contract } from "../../entities/Contract.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractRepository extends Repository<Contract> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Contract, datasource.createEntityManager());
    }

    async createContract(contract: Partial<Contract>): Promise<string | null> {
        try {
            const result = await this.save(contract);
            logger.info(`Contract Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Contract. ${error}`);
            return null;
        }
    }

    async getContractById(id: string): Promise<Contract | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: [
                    'building',
                    'insurance_account',
                    'revenue_account',
                    'discount_account',
                    'client',
                    'apartment',
                    'land',
                    'shop',
                    'parking',
                    'lessor',
                    'cost_center',
                    'tenant',
                    'villa',
                    'contract_pattern'
                ]
            });
            logger.info(`Fetched Contract with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Contract with id: ${id}. ${error}`);
            return null;
        }
    }

    async getAllContracts(): Promise<Contract[]> {
        try {
            const result = await this.find({
                relations: [
                    'building',
                    'insurance_account',
                    'revenue_account',
                    'discount_account',
                    'client',
                    'apartment',
                    'land',
                    'shop',
                    'parking',
                    'lessor',
                    'cost_center',
                    'tenant',
                    'villa',
                    'contract_pattern'
                ]
            });
            logger.info(`Fetched all Contracts successfully`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Contracts. ${error}`);
            return [];
        }
    }

    async getContractsByBuildingId(buildingId: string): Promise<Contract[]> {
        try {
            const result = await this.find({
                where: { building: { id: buildingId } },
                relations: [
                    'insurance_account',
                    'revenue_account',
                    'discount_account',
                    'client',
                    'apartment',
                    'land',
                    'shop',
                    'parking',
                    'lessor',
                    'cost_center',
                    'tenant',
                    'villa',
                    'contract_pattern'
                ]
            });
            logger.info(`Fetched Contracts for building: ${buildingId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Contracts for building: ${buildingId}. ${error}`);
            return [];
        }
    }

    async getActiveContracts(): Promise<Contract[]> {
        try {
            const result = await this.find({
                where: {
                    is_deleted: false,
                    is_archived: false,
                    status: 1
                },
                relations: [
                    'building',
                    'insurance_account',
                    'revenue_account',
                    'discount_account',
                    'client',
                    'apartment',
                    'land',
                    'shop',
                    'parking',
                    'lessor',
                    'cost_center',
                    'tenant',
                    'villa',
                    'contract_pattern'
                ]
            });
            logger.info(`Fetched active Contracts successfully`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching active Contracts. ${error}`);
            return [];
        }
    }

    async updateContract(id: string, contract: Partial<Contract>): Promise<boolean> {
        try {
            await this.update(id, contract);
            logger.info(`Updated Contract with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Contract with id: ${id}. ${error}`);
            return false;
        }
    }

    async deleteContract(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            if (result.affected && result.affected > 0) {
                logger.info(`Deleted Contract with id: ${id}`);
                return true;
            }
            return false;
        } catch (error) {
            logger.error(`Error while deleting Contract with id: ${id}. ${error}`);
            return false;
        }
    }
}
