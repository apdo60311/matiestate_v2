import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { EntryMainDataRepository } from "../repositories/entries/entry-main-data.repository";
import { EntryGridDataRepository } from "../repositories/entries/entry-grid-data.repository";
import { IEntryMainData, IEntryGridData, IEntryResponse, IEntryDataRequestBody } from "../types/entry.types";
import { logger } from "../utils/logger";
import { EntryMainData } from "../entities/EntryMainData.entity";
import { EntryGridData } from "../entities/EntryGridData.entity";

@injectable()
export class EntriesService {
    constructor(
        @inject(DI_TYPES.EntryMainDataRepository)
        private entryMainDataRepository: EntryMainDataRepository,
        @inject(DI_TYPES.EntryGridDataRepository)
        private entryGridDataRepository: EntryGridDataRepository
    ) {}

    async createEntry(entryData: IEntryDataRequestBody): Promise<IEntryResponse | null> {
        try {
            // Create main entry
            const entryEntity = new EntryMainData();
            Object.assign(entryEntity, entryData.mainData);
            const mainEntryId = await this.entryMainDataRepository.createEntry(entryEntity);
            if (!mainEntryId) {
                throw new Error("Failed to create main entry");
            }

            // Add main entry id to grid entries
            const gridEntries = entryData.gridData.map((entry) => {

                const gridEntryEntity = new EntryGridData();
                Object.assign(gridEntryEntity, {...entry, entryMainDataId:mainEntryId});
                return gridEntryEntity;
            });

            // Create grid entries
            const gridIds = await this.entryGridDataRepository.createMultipleGridEntries(gridEntries);
            if (!gridIds) {
                await this.entryMainDataRepository.deleteEntry(mainEntryId);
                throw new Error("Failed to create grid entries");
            }

            // Retrieve complete entry with relations
            return await this.getEntryById(mainEntryId);

        } catch (error) {
            logger.error(`Error in createEntry: ${error}`);
            return null;
        }
    }

    async getEntryById(id: string): Promise<IEntryResponse | null> {
        try {
            const mainData = await this.entryMainDataRepository.getEntryById(id);
            if (!mainData) {
                return null;
            }

            const gridData = await this.entryGridDataRepository.getGridEntriesByMainEntry(id);

            return {
                mainData: {
                    id: mainData.id,
                    number: mainData.number,
                    createdAt: mainData.created_at,
                    currency: mainData.currency,
                    note: mainData.note,
                    debit: mainData.debit,
                    credit: mainData.credit
                },
                gridData: gridData.map(grid => ({
                    id: grid.id,
                    account: grid.account!,
                    debit: grid.debit || 0,
                    credit: grid.credit || 0,
                    currency: grid.currency,
                    costCenter: grid.costCenter,
                    note: grid.note
                }))
            };
        } catch (error) {
            logger.error(`Error in getEntryById: ${error}`);
            return null;
        }
    }

    async updateEntry(
        id: string,
        entryData: IEntryDataRequestBody
    ): Promise<boolean> {
        try {
            const mainUpdateSuccess = await this.entryMainDataRepository.updateEntry(id, entryData.mainData);
            if (!mainUpdateSuccess) {
                throw new Error("Failed to update main entry");
            }

            if (entryData.gridData && entryData.gridData.length > 0) {
                const gridUpdatePromises = entryData.gridData.map(entryGrid => {
                    if (entryGrid.id) {
                        return this.entryGridDataRepository.updateGridEntry(entryGrid.id, entryGrid)
                    } else {
                        logger.warn(`Skipped updating entry with id ${entryGrid.id}`)
                    }
                }
                );
                const gridResults = await Promise.all(gridUpdatePromises);
                
                if (gridResults.some(result => !result)) {
                    throw new Error("Failed to update some grid entries");
                }
            }

            return true;
        } catch (error) {
            logger.error(`Error in updateEntry: ${error}`);
            return false;
        }
    }

    async deleteEntry(id: string): Promise<boolean> {
        try {
            const gridEntries = await this.entryGridDataRepository.getGridEntriesByMainEntry(id);
            
            // Delete grid entries first
            const gridDeletePromises = gridEntries.map(entry =>
                this.entryGridDataRepository.deleteGridEntry(entry.id)
            );
            await Promise.all(gridDeletePromises);

            // Delete main entry
            return await this.entryMainDataRepository.deleteEntry(id);
        } catch (error) {
            logger.error(`Error in deleteEntry: ${error}`);
            return false;
        }
    }
}