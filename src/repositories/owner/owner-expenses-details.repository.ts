import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { OwnerExpensesDetails } from "../../entities/OwnerExpensesDetails.entity";

@injectable()
export class OwnerExpensesDetailsRepository extends Repository<OwnerExpensesDetails> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(OwnerExpensesDetails, datasource.createEntityManager());
    }

    async createExpenseDetail(detail: Partial<OwnerExpensesDetails>): Promise<string | null> {
        try {
            const result = await this.save(detail);
            logger.info(`Owner Expense Detail created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Owner Expense Detail. ${error}`);
            return null;
        }
    }

    async createExpenseDetails(detail: Partial<OwnerExpensesDetails>[]): Promise<string[] | null> {
        try {
            const result = await this.save(detail);
            const ids = result.map((r) => r.id);
            logger.info(`Owner Expense Detail created successfully with id: ${ids.join(',')}`);
            return ids;
        } catch (error) {
            logger.error(`Error while creating Owner Expense Detail. ${error}`);
            return null;
        }
    }


    async getExpenseDetails(expenseId: string): Promise<OwnerExpensesDetails[]> {
        try {
            return await this.find({
                where: { ownerExpense: { id: expenseId } },
                relations: ['expenseType', 'ownerExpense', 'tenant']
            });
        } catch (error) {
            logger.error(`Error while fetching Owner Expense Details. ${error}`);
            return [];
        }
    }
}