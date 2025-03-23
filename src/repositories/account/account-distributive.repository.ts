import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { AccountDistributive } from "../../entities/AccountDistributive.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm"

@injectable()
export class AccountDistributiveRepository extends Repository<AccountDistributive> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(AccountDistributive, datasource.createEntityManager());
    }

    async createAccountDistributive(accountDistributive: Partial<AccountDistributive>): Promise<string | null> {
        try {
            const result = await this.insert(accountDistributive);
            logger.info(`AccountDistributive Created successfully with id: ${result.identifiers[0].id}`);
            return result.identifiers[0].id;
        } catch (error) {
            logger.error(`Error while creating AccountDistributive. ${error}`);
            return null;
        }
    }

    async updateAccountDistributive(id: string, accountDistributive: Partial<AccountDistributive>): Promise<boolean> {
        try {
            const result = await this.update(id, accountDistributive);
            logger.info(`AccountDistributive Updated successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating AccountDistributive. ${error}`);
            return false;
        }
    }

    async getAccountDistributives(): Promise<AccountDistributive[]> {
        try {
            return await this.find();
        } catch (error) {
            logger.error(`Error while fetching AccountDistributives. ${error}`);
            return [];
        }
    }

    async getAccountDistributiveById(id: string): Promise<AccountDistributive | null> {
        try {
            return await this.findOneBy({ id });
        } catch (error) {
            logger.error(`Error while fetching AccountDistributive. ${error}`);
            return null;
        }
    }
    async deleteAccountDistributive(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            logger.info(`AccountDistributive Deleted successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting AccountDistributive. ${error}`);
            return false;
        }
    }

    async deleteAccountDistributiveByAccount(accountId: string): Promise<boolean> {
        try {
            const result = await this.delete({ account_id: accountId });
            logger.info(`AccountDistributive Deleted successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting AccountDistributive. ${error}`);
            return false;
        }
    }

    async getAccountDistributivesByAccount(accountId: string): Promise<AccountDistributive[]> {
        try {
            return await this.find({
                where: { account_id: accountId },
                relations: ['account']
            });
        } catch (error) {
            logger.error(`Error while fetching AccountDistributives by account. ${error}`);
            return [];
        }
    }

    async getAccountDistributivesByTenant(tenantId: string): Promise<AccountDistributive[]> {
        try {
            return await this.find({
                where: { tenant_id: tenantId },
                relations: ['tenant']
            });
        } catch (error) {
            logger.error(`Error while fetching AccountDistributives by tenant. ${error}`);
            return [];
        }
    }
}