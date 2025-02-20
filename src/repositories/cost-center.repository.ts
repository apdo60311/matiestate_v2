import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { CostCenter } from "../entities/CostCenter.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class CostCenterRepository extends Repository<CostCenter> {
  constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
    super(CostCenter, datasource.createEntityManager());
  }

  async createCostCenter(
    costCenter: Partial<CostCenter>
  ): Promise<string | null> {
    try {
      const result = await this.insert(costCenter);
      logger.info(
        `Cost Center Created successfully with id: ${result.identifiers[0].id}`
      );
      return result.identifiers[0].id;
    } catch (error) {
      logger.error(`Error while creating Cost Center. ${error}`);
      return null;
    }
  }

  async updateCostCenter(
    id: string,
    costCenter: Partial<CostCenter>
  ): Promise<boolean> {
    try {
      const result = await this.update(id, costCenter);
      logger.info(
        `Cost Center Updated successfully with identifiers: ${result}`
      );
      return true;
    } catch (error) {
      logger.error(`Error while updating Cost Center. ${error}`);
      return false;
    }
  }

  async getCostCenters(): Promise<CostCenter[]> {
    try {
      return await this.find();
    } catch (error) {
      logger.error(`Error while fetching Cost Centers. ${error}`);
      return [];
    }
  }

  async getLastCostCenterNumber(): Promise<number> {
    try {
      const parentCostCenters = await this.createQueryBuilder("costCenter")
        .select()
        .where("costCenter.parent_id IS NULL")
        .getMany();

      let bigNumber = 0;
      for (const costCenter of parentCostCenters) {
        if (costCenter.number > bigNumber) {
          bigNumber = costCenter.code;
        }
      }
      return bigNumber ? bigNumber : 1;
    } catch (error) {
      logger.error(
        `Error while retrieving the last Cost Center number. ${error}`
      );
      return 1;
    }
  }
}
