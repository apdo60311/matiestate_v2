import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Account } from "../../entities/Account.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm"
import { IAccountBody, IAccountResponse } from "../../types/account.types";

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
    async getLeafAccounts(): Promise<Account[]> {
        try {
            return await this.query(`SELECT * FROM account WHERE id NOT IN (SELECT parent_id FROM account WHERE parent_id IS NOT NULL)`);
        } catch (error) {
            logger.error(`Error while fetching Account. ${error}`);
            return [];
        }
    }

    async getAccountsByFilter(
        filters: {
            [key: string]: {
                value: any;
                operator?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'like';
            } | any;
        },
        limit?: number,
        offset?: number,
        sortBy?: string,
        sortOrder: 'ASC' | 'DESC' = 'ASC'
    ): Promise<{ accounts: IAccountResponse[]; total: number }> {
        try {
            const queryBuilder = this
                .createQueryBuilder('account')
                .leftJoinAndSelect('account.parent', 'parent');

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (typeof value === 'object' && 'value' in value && value.value !== undefined && value.value !== null) {
                        const { value: filterValue, operator = 'eq' } = value;

                        switch (operator) {
                            case 'gt':
                                queryBuilder.andWhere(`account.${key} > :${key}`, { [key]: filterValue });
                                break;
                            case 'lt':
                                queryBuilder.andWhere(`account.${key} < :${key}`, { [key]: filterValue });
                                break;
                            case 'gte':
                                queryBuilder.andWhere(`account.${key} >= :${key}`, { [key]: filterValue });
                                break;
                            case 'lte':
                                queryBuilder.andWhere(`account.${key} <= :${key}`, { [key]: filterValue });
                                break;
                            case 'like':
                                queryBuilder.andWhere(`account.${key} LIKE :${key}`, { [key]: `%${filterValue}%` });
                                break;
                            case 'eq':
                            default:
                                queryBuilder.andWhere(`account.${key} = :${key}`, { [key]: filterValue });
                                break;
                        }
                    }
                    else {
                        if (typeof value === 'string' && value.trim() !== '') {
                            queryBuilder.andWhere(`account.${key} LIKE :${key}`, { [key]: `%${value}%` });
                        } else {
                            queryBuilder.andWhere(`account.${key} = :${key}`, { [key]: value });
                        }
                    }
                }
            });

            const total = await queryBuilder.getCount();

            if (sortBy) {
                queryBuilder.orderBy(`account.${sortBy}`, sortOrder);
            }

            if (limit !== undefined) {
                queryBuilder.take(limit);

                if (offset !== undefined) {
                    queryBuilder.skip(offset);
                }
            }

            const accounts = await queryBuilder.getMany();


            return { accounts, total };
        } catch (error) {
            logger.error(`Error in repository getting accounts by filter: ${error}`);
            throw error;
        }
    }

}