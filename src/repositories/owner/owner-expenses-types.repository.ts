import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { OwnerExpensesTypes } from "../../entities/OwnerExpensesTypes.entity";

@injectable()
export class OwnerExpensesTypesRepository extends Repository<OwnerExpensesTypes> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(OwnerExpensesTypes, datasource.createEntityManager());
    }

    async createExpenseType(type: Partial<OwnerExpensesTypes>): Promise<string | null> {
        try {
            const result = await this.save(type);
            logger.info(`Owner Expense Type created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Owner Expense Type. ${error}`);
            return null;
        }
    }

    async getExpenseTypes(tenantId: string): Promise<OwnerExpensesTypes[]> {
        try {
            return await this.find({
                where: { tenant: { id: tenantId } },
                relations: ['tenant']
            });
        } catch (error) {
            logger.error(`Error while fetching Owner Expense Types. ${error}`);
            return [];
        }
    }
}