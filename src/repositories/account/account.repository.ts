import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Account } from "../../entities/Account.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm"

@injectable()
export class AccountRepository extends Repository<Account> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Account, datasource.createEntityManager());
    }

    async createAccount(account: Partial<Account>): Promise<string | null> {
        try {
            const result = await this.insert(account);
            logger.info(`Account Created successfully with id: ${result.identifiers[0].id}`);
            return result.identifiers[0].id;
        } catch (error) {
            logger.error(`Error while creating Account. ${error}`);
            return null;
        }
    }

    async updateAccount(id: string, account: Partial<Account>): Promise<boolean> {
        try {
            const result = await this.update(id, account);
            logger.info(`Account Updated successfully with identifiers: ${result}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Account. ${error}`);
            return false;
        }
    }

    async getAccounts(): Promise<Account[]> {
        try {
            return await this.find();
        } catch (error) {
            logger.error(`Error while fetching Accounts. ${error}`);
            return [];
        }
    }

    async getAccountById(id: string): Promise<Account | null> {
        try {
            return await this.findOneBy({ id });
        } catch (error) {
            logger.error(`Error while fetching Account. ${error}`);
            return null;
        }
    }

    async getAccountByCode(code: number): Promise<Account | null> {
        try {
            return await this.findOneBy({ code });
        } catch (error) {
            logger.error(`Error while fetching Account. ${error}`);
            return null;
        }
    }

    async getAccountsByParrentId(id: string): Promise<Account[] | null> {
        try {
            return await this.find({
                where: {
                    parent_id: id
                }
            });
        } catch (error) {
            logger.error(`Error while fetching Account. ${error}`);
            return null;
        }
    }

}