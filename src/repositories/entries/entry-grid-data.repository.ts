import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { EntryGridData } from "../../entities/EntryGridData.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class EntryGridDataRepository extends Repository<EntryGridData> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(EntryGridData, datasource.createEntityManager());
    }

    async createGridEntry(entry: Partial<EntryGridData>): Promise<string | null> {
        try {
            const result = await this.save(entry);
            logger.info(`Entry Grid Data created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Entry Grid Data: ${error}`);
            return null;
        }
    }

    async createMultipleGridEntries(entries: Partial<EntryGridData>[]): Promise<string[] | null> {
        try {
            const result = await this.save(entries);
            const ids = result.map(entry => entry.id);
            logger.info(`Entry Grid Data entries created successfully with ids: ${ids.join(', ')}`);
            return ids;
        } catch (error) {
            logger.error(`Error while creating multiple Entry Grid Data entries: ${error}`);
            return null;
        }
    }

    async getGridEntriesByMainEntry(mainEntryId: string): Promise<EntryGridData[]> {
        try {
            const entries = await this.find({
                where: { entryMainDataId: mainEntryId },
                relations: ['account', 'currency', 'costCenter', 'observeAccount', 'entryMainData', 'tenant']
            });
            logger.info(`Retrieved grid entries for main entry: ${mainEntryId}`);
            return entries;
        } catch (error) {
            logger.error(`Error while fetching Entry Grid Data entries: ${error}`);
            return [];
        }
    }

    async updateGridEntry(id: string, entry: Partial<EntryGridData>): Promise<boolean> {
        try {
            await this.update(id, entry);
            logger.info(`Updated grid entry with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Entry Grid Data: ${error}`);
            return false;
        }
    }

    async deleteGridEntry(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted grid entry with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Entry Grid Data: ${error}`);
            return false;
        }
    }
}