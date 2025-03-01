import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Lessor } from "../entities/Lessor.entity";
import { LessorRepository } from "../repositories/lessor.repository";
import { logger } from "../utils/logger";

@injectable()
export class LessorService {
    constructor(
        @inject(DI_TYPES.LessorRepository)
        private lessorRepository: LessorRepository
    ) {}

    async createLessor(data: Partial<Lessor>): Promise<string | null> {
        try {
            const lessorId = await this.lessorRepository.createLessor(data);
            logger.info(`Lessor created successfully with id: ${lessorId}`);
            return lessorId;
        } catch (error) {
            logger.error(`Error creating lessor: ${error}`);
            return null;
        }
    }

    async getLessorById(id: string): Promise<Lessor | null> {
        return await this.lessorRepository.getLessorById(id);
    }

    async getAllLessors(): Promise<Lessor[]> {
        return await this.lessorRepository.getAllLessors();
    }

    async updateLessor(id: string, data: Partial<Lessor>): Promise<boolean> {
        return await this.lessorRepository.updateLessor(id, data);
    }

    async deleteLessor(id: string): Promise<boolean> {
        return await this.lessorRepository.deleteLessor(id);
    }
}