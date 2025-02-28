import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { OwnerExpenses } from "../../entities/OwnerExpenses.entity";

@injectable()
export class OwnerExpensesRepository extends Repository<OwnerExpenses> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(OwnerExpenses, datasource.createEntityManager());
    }

    async createExpense(expense: Partial<OwnerExpenses>): Promise<string | null> {
        try {
            const result = await this.save(expense);
            logger.info(`Owner Expense created successfully with id: ${result.id}`);
            return result.id ?? null;
        } catch (error) {
            logger.error(`Error while creating Owner Expense. ${error}`);
            return null;
        }
    }

    async getOwnerExpenses(ownerId: string): Promise<OwnerExpenses[]> {
        try {
            return await this.find({
                where: { owner: { id: ownerId } },
                relations: ['building', 'owner', 'tenant']
            });
        } catch (error) {
            logger.error(`Error while fetching Owner Expenses. ${error}`);
            return [];
        }
    }
    async getAllExpenses(): Promise<OwnerExpenses[]> {
        try {
            return await this.find({
                relations: ['building', 'owner', 'tenant']
            });
        } catch (error) {
            logger.error(`Error while fetching Owner Expenses. ${error}`);
            return [];
        }
    }
}