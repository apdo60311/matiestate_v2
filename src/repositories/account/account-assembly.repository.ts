import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { AccountAssembly } from "../../entities/AccountAssembly.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm"

@injectable()
export class AccountAssemblyRepository extends Repository<AccountAssembly> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(AccountAssembly, datasource.createEntityManager());
    }

    async createAccountAssembly(accountAssembly: Partial<AccountAssembly>): Promise<string | null> {
        try {
            const result = await this.insert(accountAssembly);
            logger.info(`AccountAssembly Created successfully with id: ${result.identifiers[0].id}`);
            return result.identifiers[0].id;
        } catch (error) {
            logger.error(`Error while creating AccountAssembly. ${error}`);
            return null;
        }
    }

    async updateAccountAssembly(id: string, accountAssembly: Partial<AccountAssembly>): Promise<boolean> {
        try {
            const result = await this.update(id, accountAssembly);
            logger.info(`AccountAssembly Updated successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating AccountAssembly. ${error}`);
            return false;
        }
    }

    async getAccountAssemblies(): Promise<AccountAssembly[]> {
        try {
            return await this.find();
        } catch (error) {
            logger.error(`Error while fetching AccountAssemblies. ${error}`);
            return [];
        }
    }

    async getAccountAssemblyById(id: string): Promise<AccountAssembly | null> {
        try {
            return await this.findOneBy({ id });
        } catch (error) {
            logger.error(`Error while fetching AccountAssembly. ${error}`);
            return null;
        }
    }
    async deleteAccountAssembly(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            logger.info(`AccountAssembly Deleted successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting AccountAssembly. ${error}`);
            return false;
        }
    }

    async getAccountAssembliesByTenant(tenantId: string): Promise<AccountAssembly[]> {
        try {
            return await this.find({
                where: { tenant_id: tenantId },
                relations: ['account']
            });
        } catch (error) {
            logger.error(`Error while fetching AccountAssemblies by tenant. ${error}`);
            return [];
        }
    }

    async deleteAccountAssembliesByAccountId(id: string): Promise<boolean> {
        try {
            const result = await this.delete({ account_id: id });
            logger.info(`AccountAssembly Deleted successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting AccountAssembly. ${error}`);
            return false;
        }
    }

    async getAccountAssembliesByAccount(accountId: string): Promise<AccountAssembly[]> {
        try {
            return await this.find({
                where: { account_id: accountId },
                relations: ['account']
            });
        } catch (error) {
            logger.error(`Error while fetching AccountAssemblies by account. ${error}`);
            return [];
        }
    }
}