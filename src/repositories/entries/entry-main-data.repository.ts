import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { EntryMainData } from "../../entities/EntryMainData.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class EntryMainDataRepository extends Repository<EntryMainData> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(EntryMainData, datasource.createEntityManager());
    }

    async createEntry(entry: Partial<EntryMainData>): Promise<string | null> {
        try {
            const result = await this.save(entry);
            logger.info(`Entry Main Data created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Entry Main Data: ${error}`);
            return null;
        }
    }

    async getEntryById(id: string): Promise<EntryMainData | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: ['currency', 'tenant']
            });
            logger.info(`Retrieved entry with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Entry Main Data: ${error}`);
            return null;
        }
    }

    async updateEntry(id: string, entry: Partial<EntryMainData>): Promise<boolean> {
        try {
            await this.update(id, entry);
            logger.info(`Updated entry with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Entry Main Data: ${error}`);
            return false;
        }
    }

    async deleteEntry(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted entry with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Entry Main Data: ${error}`);
            return false;
        }
    }
}