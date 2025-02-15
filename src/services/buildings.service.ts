import { DI_TYPES } from "../di/di.types";
import { BuildingsRepository } from "../repositories/buildings.repository";
import { injectable, inject } from "inversify";

@injectable()
export class BuildingsService {
    constructor(@inject(DI_TYPES.BuildingsRepository) private buildingRepository: BuildingsRepository) {}      
  
    async getBuildings(): Promise<string> {
      return await this.buildingRepository.getBuildings();
    }
}