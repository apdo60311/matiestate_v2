import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { OpCollectionRepository } from "../repositories/op/op-collection.repository";
import { OpDeportationRepository } from "../repositories/op/op-deportation.repository";
import { OpPartialCollectionRepository } from "../repositories/op/op-partial-collection.repository";
import { OpReturnRepository } from "../repositories/op/op-return.repository";
import { logger } from "../utils/logger";
import { CreateOpCollectionDto, CreateOpDeportationDto, CreateOpPartialCollectionDto, CreateOpReturnDto, UpdateOpCollectionDto, UpdateOpDeportationDto, UpdateOpPartialCollectionDto, UpdateOpReturnDto } from "../dtos/create-op.dto";


@injectable()
export class OpService {
    constructor(
        @inject(DI_TYPES.OpCollectionRepository)
        private opCollectionRepository: OpCollectionRepository,
        @inject(DI_TYPES.OpDeportationRepository)
        private opDeportationRepository: OpDeportationRepository,
        @inject(DI_TYPES.OpPartialCollectionRepository)
        private opPartialCollectionRepository: OpPartialCollectionRepository,
        @inject(DI_TYPES.OpReturnRepository)
        private opReturnRepository: OpReturnRepository
    ) { }

    async createOpCollection(data: CreateOpCollectionDto): Promise<string | null> {
        try {
            const result = await this.opCollectionRepository.createOpCollection(data);
            logger.info(`OpCollection created successfully with ID: ${result}`);
            return result;
        } catch (error) {
            logger.error(`Error during OpCollection creation: ${error}`);
            throw new Error("Failed to create OpCollection.");
        }
    }

    async getOpCollections(): Promise<any[]> {
        try {
            const collections = await this.opCollectionRepository.getOpCollections();
            logger.info(`Fetched ${collections.length} OpCollections.`);
            return collections;
        } catch (error) {
            logger.error(`Error fetching OpCollections: ${error}`);
            throw new Error("Failed to fetch OpCollections.");
        }
    }

    async getOpCollectionById(id: string): Promise<any | null> {
        try {
            const collection = await this.opCollectionRepository.getOpCollectionById(id);
            if (!collection) {
                logger.warn(`OpCollection with ID ${id} not found.`);
            } else {
                logger.info(`Fetched OpCollection with ID: ${id}`);
            }
            return collection;
        } catch (error) {
            logger.error(`Error fetching OpCollection by ID: ${error}`);
            throw new Error("Failed to fetch OpCollection by ID.");
        }
    }

    async updateOpCollection(id: string, data: UpdateOpCollectionDto): Promise<boolean> {
        try {
            const success = await this.opCollectionRepository.updateOpCollection(id, data);
            if (success) {
                logger.info(`OpCollection updated successfully with ID: ${id}`);
            } else {
                logger.warn(`Failed to update OpCollection with ID: ${id}`);
            }
            return success;
        } catch (error) {
            logger.error(`Error updating OpCollection: ${error}`);
            throw new Error("Failed to update OpCollection.");
        }
    }

    async deleteOpCollection(id: string): Promise<boolean> {
        try {
            const success = await this.opCollectionRepository.deleteOpCollection(id);
            if (success) {
                logger.info(`OpCollection deleted successfully with ID: ${id}`);
            } else {
                logger.warn(`OpCollection with ID ${id} not found for deletion.`);
            }
            return success;
        } catch (error) {
            logger.error(`Error deleting OpCollection: ${error}`);
            throw new Error("Failed to delete OpCollection.");
        }
    }

    async createOpDeportation(data: CreateOpDeportationDto): Promise<string | null> {
        try {
            const result = await this.opDeportationRepository.createOpDeportation(data);
            logger.info(`OpDeportation created successfully with ID: ${result}`);
            return result;
        } catch (error) {
            logger.error(`Error during OpDeportation creation: ${error}`);
            throw new Error("Failed to create OpDeportation.");
        }
    }

    async getOpDeportations(): Promise<any[]> {
        try {
            const deportations = await this.opDeportationRepository.getOpDeportations();
            logger.info(`Fetched ${deportations.length} OpDeportations.`);
            return deportations;
        } catch (error) {
            logger.error(`Error fetching OpDeportations: ${error}`);
            throw new Error("Failed to fetch OpDeportations.");
        }
    }

    async getOpDeportationById(id: string): Promise<any | null> {
        try {
            const deportation = await this.opDeportationRepository.getOpDeportationById(id);
            if (!deportation) {
                logger.warn(`OpDeportation with ID ${id} not found.`);
            } else {
                logger.info(`Fetched OpDeportation with ID: ${id}`);
            }
            return deportation;
        } catch (error) {
            logger.error(`Error fetching OpDeportation by ID: ${error}`);
            throw new Error("Failed to fetch OpDeportation by ID.");
        }
    }

    async updateOpDeportation(id: string, data: UpdateOpDeportationDto): Promise<boolean> {
        try {
            const success = await this.opDeportationRepository.updateOpDeportation(id, data);
            if (success) {
                logger.info(`OpDeportation updated successfully with ID: ${id}`);
            } else {
                logger.warn(`Failed to update OpDeportation with ID: ${id}`);
            }
            return success;
        } catch (error) {
            logger.error(`Error updating OpDeportation: ${error}`);
            throw new Error("Failed to update OpDeportation.");
        }
    }

    async deleteOpDeportation(id: string): Promise<boolean> {
        try {
            const success = await this.opDeportationRepository.deleteOpDeportation(id);
            if (success) {
                logger.info(`OpDeportation deleted successfully with ID: ${id}`);
            } else {
                logger.warn(`OpDeportation with ID ${id} not found for deletion.`);
            }
            return success;
        } catch (error) {
            logger.error(`Error deleting OpDeportation: ${error}`);
            throw new Error("Failed to delete OpDeportation.");
        }
    }

    async createOpPartialCollection(data: CreateOpPartialCollectionDto): Promise<string | null> {
        try {
            const result = await this.opPartialCollectionRepository.createOpPartialCollection(data);
            logger.info(`OpPartialCollection created successfully with ID: ${result}`);
            return result;
        } catch (error) {
            logger.error(`Error during OpPartialCollection creation: ${error}`);
            throw new Error("Failed to create OpPartialCollection.");
        }
    }

    async getOpPartialCollections(): Promise<any[]> {
        try {
            const partialCollections = await this.opPartialCollectionRepository.getOpPartialCollections();
            logger.info(`Fetched ${partialCollections.length} OpPartialCollections.`);
            return partialCollections;
        } catch (error) {
            logger.error(`Error fetching OpPartialCollections: ${error}`);
            throw new Error("Failed to fetch OpPartialCollections.");
        }
    }

    async getOpPartialCollectionById(id: string): Promise<any | null> {
        try {
            const partialCollection = await this.opPartialCollectionRepository.getOpPartialCollectionById(id);
            if (!partialCollection) {
                logger.warn(`OpPartialCollection with ID ${id} not found.`);
            } else {
                logger.info(`Fetched OpPartialCollection with ID: ${id}`);
            }
            return partialCollection;
        } catch (error) {
            logger.error(`Error fetching OpPartialCollection by ID: ${error}`);
            throw new Error("Failed to fetch OpPartialCollection by ID.");
        }
    }

    async getOpPartialCollectionByNumber(number: number): Promise<any | null> {
        try {
            const partialCollection = await this.opPartialCollectionRepository.getOpPartialCollectionByNumber(number);
            if (!partialCollection) {
                logger.warn(`OpPartialCollection with number ${number} not found.`);
            } else {
                logger.info(`Fetched OpPartialCollection with number: ${number}`);
            }
            return partialCollection;
        } catch (error) {
            logger.error(`Error fetching OpPartialCollection by number: ${error}`);
            throw new Error("Failed to fetch OpPartialCollection by number.");
        }
    }

    async updateOpPartialCollection(id: string, data: UpdateOpPartialCollectionDto): Promise<boolean> {
        try {
            const success = await this.opPartialCollectionRepository.updateOpPartialCollection(id, data);
            if (success) {
                logger.info(`OpPartialCollection updated successfully with ID: ${id}`);
            } else {
                logger.warn(`Failed to update OpPartialCollection with ID: ${id}`);
            }
            return success;
        } catch (error) {
            logger.error(`Error updating OpPartialCollection: ${error}`);
            throw new Error("Failed to update OpPartialCollection.");
        }
    }

    async deleteOpPartialCollection(id: string): Promise<boolean> {
        try {
            const success = await this.opPartialCollectionRepository.deleteOpPartialCollection(id);
            if (success) {
                logger.info(`OpPartialCollection deleted successfully with ID: ${id}`);
            } else {
                logger.warn(`OpPartialCollection with ID ${id} not found for deletion.`);
            }
            return success;
        } catch (error) {
            logger.error(`Error deleting OpPartialCollection: ${error}`);
            throw new Error("Failed to delete OpPartialCollection.");
        }
    }

    async createOpReturn(data: CreateOpReturnDto): Promise<string | null> {
        try {
            const result = await this.opReturnRepository.createOpReturn(data);
            logger.info(`OpReturn created successfully with ID: ${result}`);
            return result;
        } catch (error) {
            logger.error(`Error during OpReturn creation: ${error}`);
            throw new Error("Failed to create OpReturn.");
        }
    }

    async getOpReturns(): Promise<any[]> {
        try {
            const returns = await this.opReturnRepository.getOpReturns();
            logger.info(`Fetched ${returns.length} OpReturns.`);
            return returns;
        } catch (error) {
            logger.error(`Error fetching OpReturns: ${error}`);
            throw new Error("Failed to fetch OpReturns.");
        }
    }

    async getOpReturnById(id: string): Promise<any | null> {
        try {
            const opReturn = await this.opReturnRepository.getOpReturnById(id);
            if (!opReturn) {
                logger.warn(`OpReturn with ID ${id} not found.`);
            } else {
                logger.info(`Fetched OpReturn with ID: ${id}`);
            }
            return opReturn;
        } catch (error) {
            logger.error(`Error fetching OpReturn by ID: ${error}`);
            throw new Error("Failed to fetch OpReturn by ID.");
        }
    }

    async updateOpReturn(id: string, data: UpdateOpReturnDto): Promise<boolean> {
        try {
            const success = await this.opReturnRepository.updateOpReturn(id, data);
            if (success) {
                logger.info(`OpReturn updated successfully with ID: ${id}`);
            } else {
                logger.warn(`Failed to update OpReturn with ID: ${id}`);
            }
            return success;
        } catch (error) {
            logger.error(`Error updating OpReturn: ${error}`);
            throw new Error("Failed to update OpReturn.");
        }
    }

    async deleteOpReturn(id: string): Promise<boolean> {
        try {
            const success = await this.opReturnRepository.deleteOpReturn(id);
            if (success) {
                logger.info(`OpReturn deleted successfully with ID: ${id}`);
            } else {
                logger.warn(`OpReturn with ID ${id} not found for deletion.`);
            }
            return success;
        } catch (error) {
            logger.error(`Error deleting OpReturn: ${error}`);
            throw new Error("Failed to delete OpReturn.");
        }
    }

    async findOpReturnsByChequeId(chequeId: string): Promise<any[] | null> {
        try {
            const returns = await this.opReturnRepository.findByChequeId(chequeId);
            logger.info(`Fetched ${returns?.length || 0} OpReturns for cheque ID: ${chequeId}`);
            return returns;
        } catch (error) {
            logger.error(`Error fetching OpReturns by cheque ID: ${error}`);
            throw new Error("Failed to fetch OpReturns by cheque ID.");
        }
    }
}