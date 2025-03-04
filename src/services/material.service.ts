import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Material } from "../entities/Material.entity";
import { MaterialGroup } from "../entities/MaterialGroup.entity";
import { MaterialBalance } from "../entities/MaterialBalance.entity";
import { MaterialMinimum } from "../entities/MaterialMinimum.entity";
import { MaterialPrices } from "../entities/MaterialPrices.entity";
import { MaterialPricesDetails } from "../entities/MaterialPricesDetails.entity";
import { MaterialRepository } from "../repositories/material/material.repository";
import { MaterialGroupRepository } from "../repositories/material/material-group.repository";
import { MaterialBalanceRepository } from "../repositories/material/material-balance.repository";
import { MaterialMinimumRepository } from "../repositories/material/material-minimum.repository";
import { MaterialPricesRepository } from "../repositories/material/material-prices.repository";
import { MaterialPricesDetailsRepository } from "../repositories/material/material-prices-details.repository";
import { logger } from "../utils/logger";
import { IMaterialBody, IMaterialRequestBody, IMaterialResponseBody } from "../types/material.types";
import { MaterialSpecificationsRepository } from "../repositories/material/material-specifications.repository";

@injectable()
export class MaterialService {
  constructor(
    @inject(DI_TYPES.MaterialRepository)
    private materialRepository: MaterialRepository,
    @inject(DI_TYPES.MaterialGroupRepository)
    private materialGroupRepository: MaterialGroupRepository,
    @inject(DI_TYPES.MaterialBalanceRepository)
    private materialBalanceRepository: MaterialBalanceRepository,
    @inject(DI_TYPES.MaterialMinimumRepository)
    private materialMinimumRepository: MaterialMinimumRepository,
    @inject(DI_TYPES.MaterialPricesRepository)
    private materialPricesRepository: MaterialPricesRepository,
    @inject(DI_TYPES.MaterialPricesDetailsRepository)
    private materialPricesDetailsRepository: MaterialPricesDetailsRepository,
    @inject(DI_TYPES.MaterialSpecificationsRepository)
    private materialSpecificationsRepository: MaterialSpecificationsRepository,

  ) {}

  async createMaterialGroup(
    group: Partial<MaterialGroup>
  ): Promise<string | null> {
    try {
      return await this.materialGroupRepository.createMaterialGroup(group);
    } catch (error) {
      logger.error(`Error in MaterialService.createMaterialGroup: ${error}`);
      return null;
    }
  }

  async getMaterialGroupById(id: string): Promise<MaterialGroup | null> {
    try {
      return await this.materialGroupRepository.getMaterialGroupById(id);
    } catch (error) {
      logger.error(`Error in MaterialService.getMaterialGroupById: ${error}`);
      return null;
    }
  }

  async getAllMaterialGroups(): Promise<MaterialGroup[]> {
    try {
      return await this.materialGroupRepository.getAllMaterialGroups();
    } catch (error) {
      logger.error(`Error in MaterialService.getAllMaterialGroups: ${error}`);
      return [];
    }
  }

  async createMaterial(
    materialBody: IMaterialRequestBody
  ): Promise<IMaterialResponseBody| null> {
    try {
      // Create material first
      const materialId = await this.materialRepository.createMaterial(
        materialBody.material
      );
  
      if (!materialId) {
        logger.error("Failed to create material: No ID returned");
        return null;
      }

      let createMaterialPricePromise;
      let createMaterialPriceDetailsPromise;
      let createMaterialBalancePromise;
      let createMaterialMinimumPromise;
      let createMaterialSpecificationsPromise;


      
      // Create material prices
      if (materialBody.prices) {
        createMaterialPricePromise =this.materialPricesRepository.createMaterialPrice({
            ...materialBody.prices,
            material_id: materialId,
            tenant_id: materialBody.material.tenant_id,
          })

    }
  
      // Create price details
      if (materialBody.priceDetails) {
        createMaterialPriceDetailsPromise = this.materialPricesDetailsRepository.createPriceDetails({
            ...materialBody.priceDetails,
            material_id: materialId,
            tenant_id: materialBody.material.tenant_id,
          })
      }
  
      // Create balance
      if (materialBody.balance) {
        createMaterialBalancePromise = this.materialBalanceRepository.createBalance({
            ...materialBody.balance,
            material_id: materialId,
            tenant_id: materialBody.material.tenant_id,
          })
      }
  
      // Create minimum
      if (materialBody.minimum) {
        createMaterialMinimumPromise = this.materialMinimumRepository.createMinimum({
            ...materialBody.minimum,
            material_id: materialId,
            tenant_id: materialBody.material.tenant_id,
          })
      }
  
      // Create specifications
      if (materialBody.specifications && materialBody.specifications.length > 0) {
        materialBody.specifications.map((spec) => {
            return {
                ...spec,
                material_id: materialId,
                tenant_id: materialBody.material.tenant_id,
              };
        });
        createMaterialSpecificationsPromise = this.materialSpecificationsRepository.createMultipleSpecifications(materialBody.specifications);

    }
  
      // Wait for all related entities to be created
      const result = await Promise.all([
        createMaterialPricePromise,
        createMaterialPriceDetailsPromise,
        createMaterialBalancePromise,
        createMaterialMinimumPromise,
        createMaterialSpecificationsPromise,
      ]);
      
      logger.info(`Successfully created material with ID: ${materialId}`);
      return {
        material:materialId,
        prices: result[0],
        priceDetails: result[1],
        balance: result[2],
        minimum: result[3],
        specifications: result[4] ??[],
      };
    } catch (error) {
      logger.error(`Error in MaterialService.createMaterial: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }
  async getMaterialById(id: string): Promise<Material | null> {
    try {
      return await this.materialRepository.getMaterialById(id);
    } catch (error) {
      logger.error(`Error in MaterialService.getMaterialById: ${error}`);
      return null;
    }
  }

  async getAllMaterials(): Promise<Material[]> {
    try {
      return await this.materialRepository.getAllMaterials();
    } catch (error) {
      logger.error(`Error in MaterialService.getAllMaterials: ${error}`);
      return [];
    }
  }

  async createBalance(
    balance: Partial<MaterialBalance>
  ): Promise<string | null> {
    try {
      return await this.materialBalanceRepository.createBalance(balance);
    } catch (error) {
      logger.error(`Error in MaterialService.createBalance: ${error}`);
      return null;
    }
  }

  async getBalanceByMaterialAndStore(
    materialId: string,
    storeId: string
  ): Promise<MaterialBalance | null> {
    try {
      return await this.materialBalanceRepository.getBalanceByMaterialAndStore(
        materialId,
        storeId
      );
    } catch (error) {
      logger.error(
        `Error in MaterialService.getBalanceByMaterialAndStore: ${error}`
      );
      return null;
    }
  }

  async createMinimum(
    minimum: Partial<MaterialMinimum>
  ): Promise<string | null> {
    try {
      return await this.materialMinimumRepository.createMinimum(minimum);
    } catch (error) {
      logger.error(`Error in MaterialService.createMinimum: ${error}`);
      return null;
    }
  }

  async getMinimumById(id: string): Promise<MaterialMinimum | null> {
    try {
      return await this.materialMinimumRepository.getMinimumById(id);
    } catch (error) {
      logger.error(`Error in MaterialService.getMinimumById: ${error}`);
      return null;
    }
  }

  async createMaterialPrice(
    price: Partial<MaterialPrices>
  ): Promise<string | null> {
    try {
      return await this.materialPricesRepository.createMaterialPrice(price);
    } catch (error) {
      logger.error(`Error in MaterialService.createMaterialPrice: ${error}`);
      return null;
    }
  }

  async getMaterialPricesByMaterialId(
    materialId: string
  ): Promise<MaterialPrices[]> {
    try {
      return await this.materialPricesRepository.getMaterialPricesByMaterialId(
        materialId
      );
    } catch (error) {
      logger.error(
        `Error in MaterialService.getMaterialPricesByMaterialId: ${error}`
      );
      return [];
    }
  }

  async createPriceDetails(
    details: Partial<MaterialPricesDetails>
  ): Promise<string | null> {
    try {
      return await this.materialPricesDetailsRepository.createPriceDetails(
        details
      );
    } catch (error) {
      logger.error(`Error in MaterialService.createPriceDetails: ${error}`);
      return null;
    }
  }

  async getPriceDetailsByMaterialId(
    materialId: string
  ): Promise<MaterialPricesDetails[]> {
    try {
      return await this.materialPricesDetailsRepository.getPriceDetailsByMaterialId(
        materialId
      );
    } catch (error) {
      logger.error(
        `Error in MaterialService.getPriceDetailsByMaterialId: ${error}`
      );
      return [];
    }
  }
}