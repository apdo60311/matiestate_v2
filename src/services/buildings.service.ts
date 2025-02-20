import { DI_TYPES } from "../di/di.types";
import { BuildingsRepository } from "../repositories/buildings.repository";
import { injectable, inject } from "inversify";
import { Building } from "../entities/Building.entity";
import { IBuildingsBody } from "../types/buildings.types";
import { AccountRepository } from "../repositories/account.repository";
import { Account } from "../entities/Account.entity";
import { CostCenterRepository } from "../repositories/cost-center.repository";
import { ICreateBuildingReturnData } from "../interfaces/buildings-service.interfaces";

@injectable()
export class BuildingsService {
    constructor(@inject(DI_TYPES.BuildingsRepository) private buildingRepository: BuildingsRepository,@inject(DI_TYPES.AccountRepository) private accountRepository:AccountRepository, @inject(DI_TYPES.CostCenterRepository) private costCenterRepository:CostCenterRepository) {}      
    
    /**
     * Create a new building
     */
    createBuilding = async (buildingData: IBuildingsBody): Promise<ICreateBuildingReturnData> => {
        try {
            const building = new Building();
            Object.assign(building, buildingData);
        
            const buildingId = await this.buildingRepository.createBuilding(building);
            
            let createdAccountId = null;
            let createdCostCenterId = null;

            if (buildingId) {
                if (!buildingData.buildingAccountId) {
                    const buildingAccountData = await this.accountRepository.getAccountByCode(123);
                    
                    const updates = {
                        name: buildingData.name,
                    }

                    let buildingAccountToInsert: Partial<Account> =
                      this.removeIdFromEntityAndUpdate(
                        buildingAccountData,
                        updates
                      );
                    createdAccountId =
                      await this.accountRepository.createAccount(
                        buildingAccountToInsert
                      );
                }

                if (!buildingData.mainCostCenterId) {
                  const lastCostCenterCode =
                    await this.costCenterRepository.getLastCostCenterNumber();
                  const code = lastCostCenterCode
                    ? +lastCostCenterCode + 1
                    : 101;

                    createdCostCenterId = await this.costCenterRepository.createCostCenter({
                      name: buildingData.name,
                      code,
                    });
                }

                await this.updateBuilding(buildingId, {
                    buildingAccountId: createdAccountId || buildingData.buildingAccountId,
                    mainCostCenterId: createdCostCenterId || buildingData.mainCostCenterId,
                })

            }
            return {
                buildingId,
                createdAccountId,
                createdCostCenterId
            };
        } catch (error: any) {
            throw new Error(`Failed to create building: ${error.message}`);
        }
    }

    /**
     * Update an existing building
     */
    updateBuilding = async (id: string, buildingData: Partial<IBuildingsBody>): Promise<Boolean> => {
        try {
            return await this.buildingRepository.updateBuilding(id, buildingData);
        } catch (error: any) {
            throw new Error(`Failed to update building: ${error.message}`);
        }
    }

    /**
     * Get all buildings
     */
    getBuildings = async (): Promise<Building[]> => {
        try {
            return await this.buildingRepository.getBuildings();
        } catch (error: any) {
            throw new Error(`Failed to get buildings: ${error.message}`);
        }
    }
    removeIdFromEntityAndUpdate = (entity: any, updates: any): any => {
        if (!entity) {
            return null;
        }
        
        try {
            const updatedEntity = {
                ...entity,
                ...updates
            };
            delete updatedEntity.id;
            return updatedEntity;
        } catch (error:any) {
            throw new Error(`Failed to update entity: ${error.message}`);
        }
    }
    }