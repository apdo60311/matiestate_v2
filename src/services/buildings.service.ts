import { DI_TYPES } from "../di/di.types";
import { BuildingsRepository } from "../repositories/buildings.repository";
import { injectable, inject } from "inversify";
import { Building } from "../entities/Building.entity";
import { IBuildingDetailsBody, IBuildingsBody, IBuildingDetailsResponse, IPropertyValues } from "../types/buildings.types";
import { AccountRepository } from "../repositories/account/account.repository";
import { Account } from "../entities/Account.entity";
import { CostCenterRepository } from "../repositories/cost-center.repository";
import { ICreateBuildingReturnData } from "../interfaces/buildings-service.interfaces";
import { logger } from "../utils/logger";
import { PropertyValuesRepository } from "../repositories/property-values.repository";
import { PropertyValues } from "../entities/PropertyValues.entity";
import { Apartment } from "../entities/Apartment.entity";
import { ApartmentRepository } from "../repositories/apartment/apartment.repository";
import { ApartmentService } from "./apartment.service";
import { ParkingService } from "./parking.service";
import { Parking } from "../entities/Parking.entity";
import { Shop } from "../entities/Shop.entity";
import { ShopService } from "./shop.service";

@injectable()
export class BuildingsService {
  constructor(
    @inject(DI_TYPES.BuildingsRepository)
    private buildingRepository: BuildingsRepository,
    @inject(DI_TYPES.AccountRepository)
    private accountRepository: AccountRepository,
    @inject(DI_TYPES.CostCenterRepository)
    private costCenterRepository: CostCenterRepository,
    @inject(DI_TYPES.PropertyValuesRepository) 
    private propertyValuesRepository: PropertyValuesRepository,
    @inject(DI_TYPES.ApartmentService) 
    private apartmentService: ApartmentService,
    @inject(DI_TYPES.ParkingService) 
    private parkingService: ParkingService,
    @inject(DI_TYPES.ShopService) 
    private shopService: ShopService,
  ) {}

  /**
   * Create a new building
   */
  createBuilding = async (
    buildingData: IBuildingsBody
  ): Promise<ICreateBuildingReturnData> => {
    try {
      const building = new Building();
      Object.assign(building, buildingData);

      const buildingId = await this.buildingRepository.createBuilding(building);

      let createdAccountId = null;
      let createdCostCenterId = null;

      if (buildingId) {
        if (!buildingData.buildingAccountId) {
          const buildingAccountData =
            await this.accountRepository.getAccountByCode(123);

          const updates = {
            name: buildingData.name,
          };

          const buildingAccountToInsert: Partial<Account> = {
            name: buildingData.name,
            code: buildingAccountData?.code || 123,
          };

          // let buildingAccountToInsert: Partial<Account> =
          //   this.removeIdFromEntityAndUpdate(
          //     buildingAccountData,
          //     updates
          //   );
          createdAccountId = await this.accountRepository.createAccount(
            buildingAccountToInsert
          );
        }

        if (!buildingData.mainCostCenterId) {
          const lastCostCenterCode =
            await this.costCenterRepository.getLastCostCenterNumber();
          const code = lastCostCenterCode ? +lastCostCenterCode + 1 : 101;

          createdCostCenterId =
            await this.costCenterRepository.createCostCenter({
              name: buildingData.name,
              code,
            });
        }

        await this.updateBuilding(buildingId, {
          buildingAccountId: createdAccountId || buildingData.buildingAccountId,
          mainCostCenterId:
            createdCostCenterId || buildingData.mainCostCenterId,
        });
      }
      return {
        buildingId,
        createdAccountId,
        createdCostCenterId,
      };
    } catch (error: any) {
      throw new Error(`Failed to create building: ${error.message}`);
    }
  };


  /**
   * Update an existing building
   */
  updateBuilding = async (
    id: string,
    buildingData: Partial<IBuildingsBody>
  ): Promise<Boolean> => {
    try {
      return await this.buildingRepository.updateBuilding(id, buildingData);
    } catch (error: any) {
      throw new Error(`Failed to update building: ${error.message}`);
    }
  };

  getBuilding(id: string): Promise<Building | null> {
    try {
      return this.buildingRepository.findOneBy({ id });
    } catch (error: any) {
      throw new Error(`Failed to get building: ${error.message}`);
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
  };

  createBuildingDetails = async (
    buildingId: string,
    buildingData: IBuildingDetailsBody
  ): Promise<IBuildingDetailsResponse> => {
    try {
      // check if building exisits first 
      const building = await this.getBuilding(buildingId);
      if (!building) {
        logger.error(`Building with id ${buildingId} not found`);
        throw new Error(`Building with id ${buildingId} not found`);
      }


      let propertyValues: PropertyValues[] = [];
      let apartmentsPromise;
      let parkingsPromise;
      let shopsPromise;

      if (buildingData.property_values) {
        // insert properties
        propertyValues = await this.insertPropertyValues(buildingData);
        logger.info(`Property values inserted ${propertyValues.length}`);
      }
 
      // insert apartments related entities
      if (
        (buildingData.building_details &&
          buildingData.building_details.apartment) ||
        buildingData.building_details.mezzanine ||
        buildingData.building_details.office
      ) {
        
        Object.values(buildingData.building_details.apartment).forEach((apartment) => {
          apartment.property_values_id = propertyValues.find((property) => property.row_index == apartment.row_index)?.id;
        });

        apartmentsPromise = this.insertApartmentEntities(buildingData);
      }

      // insert parking related entities
      if (
        (buildingData.building_details &&
          buildingData.building_details.parking) ||
        buildingData.building_details["underground parking"]
      ) {

        Object.values(buildingData.building_details.parking).forEach((parking) => {
          parking.property_values_id = propertyValues.find((property) => property.row_index == parking.row_index)?.id;
        });

        parkingsPromise = this.insertParkingEntities(buildingData);
      }

      // insert shop related entities
      if (
        (buildingData.building_details &&
          buildingData.building_details.shop) ||
        buildingData.building_details.store
      ) {

        Object.values(buildingData.building_details.shop).forEach((shop) => {
          shop.property_values_id = propertyValues.find((property) => property.row_index == shop.row_index)?.id;
        });

        shopsPromise = this.insertShopEntities(buildingData);
      }
      

      const [apartments, parkings, shops] = await Promise.all([
        apartmentsPromise,
        parkingsPromise,
        shopsPromise,
      ]);


      return {
        property_values: propertyValues.map((property) => property.id) ?? [],
        apartments: apartments ?? [],
        parkings: parkings ?? [],
        shops: shops ?? [],
      };
    } catch (error: any) {
      throw new Error(`Failed to create building Details: ${error.message}`);
    }
  };

  async getBuildingDetails(buildingId: string): Promise<IBuildingDetailsResponse> {
    try {

      // check for building first
      const building = await this.getBuilding(buildingId);
      if (!building) {
        logger.error(`Building with id ${buildingId} not found`);
        throw new Error(`Building with id ${buildingId} not found`);
      }

      // Get apartments, including mezzanine and office types
      const apartments = await this.apartmentService.getApartmentsByBuildingId(buildingId);
      logger.debug(`Found ${apartments.length} apartments for building ${buildingId}`);

      // Get parkings, including underground parkings
      const parkings = await this.parkingService.getParkingsByBuildingId(buildingId);
      logger.debug(`Found ${parkings.length} parkings for building ${buildingId}`);

      // Get shops, including stores
      const shops = await this.shopService.getShopsByBuildingId(buildingId);
      logger.debug(`Found ${shops.length} shops for building ${buildingId}`);

      // Get property values
      const propertyValues = await this.propertyValuesRepository.getPropertyValuesByBuildingId(buildingId);
      logger.debug(`Found ${propertyValues.length} property values for building ${buildingId}`);


      return {
        apartments: apartments,
        parkings: parkings, 
        shops: shops,
        property_values: propertyValues
      };
    } catch (error: any) {
      logger.error(`Failed to get building details: ${error.message}`);
      logger.error(error.stack);
      throw new Error(`Failed to get building details: ${error.message}`);
    }
  }

  removeIdFromEntityAndUpdate = (entity: any, updates: any): any => {
    if (!entity) {
      return null;
    }

    try {
      const updatedEntity = {
        ...entity,
        ...updates,
      };
      delete updatedEntity.id;
      logger.info(`updatedEntity: ${JSON.stringify(updatedEntity)}`);
      return updatedEntity;
    } catch (error: any) {
      throw new Error(`Failed to update entity: ${error.message}`);
    }
  };

  private async insertPropertyValues(buildingData: IBuildingDetailsBody) : Promise<PropertyValues[]> {
    const entitiesToInsert = buildingData.property_values.map((property: IPropertyValues) => {
      const propertyValuesEntity = new PropertyValues();
      Object.assign(propertyValuesEntity, property);
      return propertyValuesEntity;
    });

    const propertyValueIds = await this.propertyValuesRepository.createPropertyValues(entitiesToInsert);
    if (propertyValueIds) {
      const propertyValues = await this.propertyValuesRepository.getPropertyValuesByIds(propertyValueIds);
      
      return propertyValues;
    } else {
      logger.error(`Failed to create property values`);
      throw new Error(`Failed to create property values`);
    }
  }

  // helper methods for inserting building details entities 
  private async insertShopEntities(buildingData: IBuildingDetailsBody) {
    const shopRelatedEntities = {
      ...buildingData.building_details.shop,
      ...buildingData.building_details.store,
    };

    const shopEntities = Object.values(shopRelatedEntities).map((shop) => {
      const shopEntity = new Shop();
      Object.assign(shopEntity, shop);
      return shopEntity;
    });


    const insertedShopIds = await this.shopService.createShops(shopEntities);
    return insertedShopIds;
  }

  private async insertParkingEntities(buildingData: IBuildingDetailsBody) {
    const parkingRelatedEntities = {
      ...buildingData.building_details.parking,
      ...buildingData.building_details["underground parking"],
    };

    const parkingEntities = Object.values(parkingRelatedEntities).map((parking) => {
      const parkingEntity = new Parking();
      Object.assign(parkingEntity, parking);
      return parkingEntity;
    });

    const insertedParkingsIds = await this.parkingService.createParkings(parkingEntities);
    return insertedParkingsIds;
  }

  private async insertApartmentEntities(buildingData: IBuildingDetailsBody) {
    const apartmentRelatedEntities = {
      ...buildingData.building_details.apartment,
      ...buildingData.building_details.mezzanine,
      ...buildingData.building_details.office,
    };

    const apartmentEntities = Object.values(apartmentRelatedEntities).map((apartment) => {
      const apartmentEntity = new Apartment();
      Object.assign(apartmentEntity, apartment);
      return apartmentEntity;
    });

    const insertedApartmentsIds = await this.apartmentService.createApartments(apartmentEntities);
    return insertedApartmentsIds;
  }

}