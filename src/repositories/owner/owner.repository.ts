import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { Owner } from "../../entities/Owner.entity";

@injectable()
export class OwnerRepository extends Repository<Owner> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Owner, datasource.createEntityManager());
    }

    async createOwner(owner: Partial<Owner>): Promise<string | null> {
        try {
            const result = await this.save(owner);
            logger.info(`Owner created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Owner: ${error}`);
            return null;
        }
    }

    async getOwnerById(id: string): Promise<Owner | null> {
        try {
            const owner = await this.findOne({
                where: { id },
                relations: ['account', 'tenant']
            });
            logger.info(`Retrieved owner with id: ${id}`);
            return owner;
        } catch (error) {
            logger.error(`Error while fetching Owner: ${error}`);
            return null;
        }
    }

    async getAllOwners(): Promise<Owner[]> {
        try {
            const owners = await this.find({
                relations: ['account', 'tenant']
            });
            logger.info('Fetched all Owners successfully');
            return owners;
        } catch (error) {
            logger.error(`Error while fetching Owners: ${error}`);
            return [];
        }
    }

    async updateOwner(id: string, owner: Partial<Owner>): Promise<boolean> {
        try {
            await this.update(id, owner);
            logger.info(`Updated Owner with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Owner: ${error}`);
            return false;
        }
    }

    async deleteOwner(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Owner with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Owner: ${error}`);
            return false;
        }
    }

    async getOwnerByAccountId(accountId: string): Promise<Owner | null> {
        try {
            const owner = await this.findOne({
                where: { account_id: accountId },
                relations: ['account', 'tenant']
            });
            logger.info(`Retrieved owner with account id: ${accountId}`);
            return owner;
        } catch (error) {
            logger.error(`Error while fetching Owner by account id: ${error}`);
            return null;
        }
    }
}