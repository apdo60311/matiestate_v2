import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Owner } from "../entities/Owner.entity";
import { OwnerExpenses } from "../entities/OwnerExpenses.entity";
import { OwnerExpensesDetails } from "../entities/OwnerExpensesDetails.entity";
import { OwnerExpensesTypes } from "../entities/OwnerExpensesTypes.entity";
import { OwnerExpensesRepository } from "../repositories/owner/owner-expenses.repository";
import { OwnerExpensesDetailsRepository } from "../repositories/owner/owner-expenses-details.repository";
import { OwnerExpensesTypesRepository } from "../repositories/owner/owner-expenses-types.repository";
import { logger } from "../utils/logger";
import { OwnerRepository } from "../repositories/owner/owner.repository";
import { IOwnerExpenseDetailBody } from "../types/owner.types";

@injectable()
export class OwnerService {
  constructor(
    @inject(DI_TYPES.OwnerRepository)
    private ownerRepository: OwnerRepository,
    @inject(DI_TYPES.OwnerExpensesRepository)
    private ownerExpensesRepository: OwnerExpensesRepository,
    @inject(DI_TYPES.OwnerExpensesDetailsRepository)
    private ownerExpensesDetailsRepository: OwnerExpensesDetailsRepository,
    @inject(DI_TYPES.OwnerExpensesTypesRepository)
    private ownerExpensesTypesRepository: OwnerExpensesTypesRepository
  ) {}

  async createOwner(ownerData: Partial<Owner>): Promise<string | null> {
    try {
      const ownerId = await this.ownerRepository.createOwner(ownerData);
      return ownerId;
    } catch (error) {
      logger.error(`Error creating owner: ${error}`);
      return null;
    }
  }

  async getOwnerById(id: string): Promise<Owner | null> {
    try {
      return await this.ownerRepository.getOwnerById(id);
    } catch (error) {
      logger.error(`Error getting owner by id: ${error}`);
      return null;
    }
  }

  async getAllOwners(): Promise<Owner[]> {
    try {
      return await this.ownerRepository.getAllOwners();
    } catch (error) {
      logger.error(`Error getting all owners: ${error}`);
      return [];
    }
  }

  async updateOwner(id: string, data: Partial<Owner>): Promise<boolean> {
    try {
      return await this.ownerRepository.updateOwner(id, data);
    } catch (error) {
      logger.error(`Error updating owner: ${error}`);
      return false;
    }
  }

  async deleteOwner(id: string): Promise<boolean> {
    try {
      return await this.ownerRepository.deleteOwner(id);
    } catch (error) {
      logger.error(`Error deleting owner: ${error}`);
      return false;
    }
  }

  async createOwnerExpense(
    expenseData: Partial<OwnerExpenses>
  ): Promise<string | null> {
    try {
      const ownerExpenseToInsert = new OwnerExpenses();
      Object.assign(ownerExpenseToInsert, expenseData);
      return await this.ownerExpensesRepository.createExpense(ownerExpenseToInsert);
    } catch (error) {
      logger.error(`Error creating owner expense: ${error}`);
      return null;
    }
  }

  async getOwnerExpenses(ownerId: string): Promise<OwnerExpenses[]> {
    try {
      return await this.ownerExpensesRepository.getOwnerExpenses(ownerId);
    } catch (error) {
      logger.error(`Error getting owner expenses: ${error}`);
      return [];
    }
  }

  async getAllExpenses(): Promise<OwnerExpenses[]> {
    try {
      return await this.ownerExpensesRepository.getAllExpenses();
    } catch (error) {
      logger.error(`Error getting all expenses: ${error}`);
      return [];
    }
  }

  async createExpenseDetail(
    expenseId: string,
    detailData: Partial<IOwnerExpenseDetailBody>
  ): Promise<string | null> {
    try {
      detailData.expense_id = expenseId;
      const ownerExpenseDetailToInsert = new OwnerExpensesDetails();
      Object.assign(ownerExpenseDetailToInsert, detailData);
      return await this.ownerExpensesDetailsRepository.createExpenseDetail(
        ownerExpenseDetailToInsert
      );
    } catch (error) {
      logger.error(`Error creating expense detail: ${error}`);
      return null;
    }
  }

  async createExpenseDetails(
    expenseId: string,
    detailData: Partial<IOwnerExpenseDetailBody>[]
  ): Promise<string[] | null> {
    try {
        const expenseDetailsToInsert = detailData?.map((detail) => {
            detail.expense_id = expenseId;
          const ownerExpenseDetailToInsert = new OwnerExpensesDetails();
          Object.assign(ownerExpenseDetailToInsert, detail);
          return ownerExpenseDetailToInsert;
        })


        const expenseDetails =
        await this.ownerExpensesDetailsRepository.createExpenseDetails(
          expenseDetailsToInsert
        );

      if (!expenseDetails) {
        logger.error(`Error creating expense details`);
        return null;
      }
      logger.info(
        `Expense details created successfully with ids: ${expenseDetails}`
      );
      return expenseDetails;
    } catch (error) {
      logger.error(`Error creating expense detail: ${error}`);
      return null;
    }
  }

  async getExpenseDetails(expenseId: string): Promise<OwnerExpensesDetails[]> {
    try {
      return await this.ownerExpensesDetailsRepository.getExpenseDetails(
        expenseId
      );
    } catch (error) {
      logger.error(`Error getting expense details: ${error}`);
      return [];
    }
  }

  async createExpenseType(
    typeData: Partial<OwnerExpensesTypes>
  ): Promise<string | null> {
    try {
      return await this.ownerExpensesTypesRepository.createExpenseType(
        typeData
      );
    } catch (error) {
      logger.error(`Error creating expense type: ${error}`);
      return null;
    }
  }

  async getExpenseTypes(tenantId: string): Promise<OwnerExpensesTypes[]> {
    try {
      return await this.ownerExpensesTypesRepository.getExpenseTypes(tenantId);
    } catch (error) {
      logger.error(`Error getting expense types: ${error}`);
      return [];
    }
  }

  async getOwnerByAccountId(accountId: string): Promise<Owner | null> {
    try {
      return await this.ownerRepository.getOwnerByAccountId(accountId);
    } catch (error) {
      logger.error(`Error getting owner by account id: ${error}`);
      return null;
    }
  }

  async updateOwnerExpense(
    id: string,
    data: Partial<OwnerExpenses>
  ): Promise<boolean> {
    try {
      const result = await this.ownerExpensesRepository.update(id, data);
      logger.info(`Owner expense updated successfully with id: ${id}`);
      return !!result.affected;
    } catch (error) {
      logger.error(`Error updating owner expense: ${error}`);
      return false;
    }
  }

  async deleteOwnerExpense(id: string): Promise<boolean> {
    try {
      const result = await this.ownerExpensesRepository.delete(id);
      logger.info(`Owner expense deleted successfully with id: ${id}`);
      return !!result.affected;
    } catch (error) {
      logger.error(`Error deleting owner expense: ${error}`);
      return false;
    }
  }

  // Additional Owner Expenses Details methods
  async updateExpenseDetail(
    id: string,
    data: Partial<OwnerExpensesDetails>
  ): Promise<boolean> {
    try {
      const result = await this.ownerExpensesDetailsRepository.update(id, data);
      logger.info(`Expense detail updated successfully with id: ${id}`);
      return !!result.affected;
    } catch (error) {
      logger.error(`Error updating expense detail: ${error}`);
      return false;
    }
  }

  async deleteExpenseDetail(id: string): Promise<boolean> {
    try {
      const result = await this.ownerExpensesDetailsRepository.delete(id);
      logger.info(`Expense detail deleted successfully with id: ${id}`);
      return !!result.affected;
    } catch (error) {
      logger.error(`Error deleting expense detail: ${error}`);
      return false;
    }
  }

  // Additional Owner Expenses Types methods
  async updateExpenseType(
    id: string,
    data: Partial<OwnerExpensesTypes>
  ): Promise<boolean> {
    try {
      const result = await this.ownerExpensesTypesRepository.update(id, data);
      logger.info(`Expense type updated successfully with id: ${id}`);
      return !!result.affected;
    } catch (error) {
      logger.error(`Error updating expense type: ${error}`);
      return false;
    }
  }

  async deleteExpenseType(id: string): Promise<boolean> {
    try {
      const result = await this.ownerExpensesTypesRepository.delete(id);
      logger.info(`Expense type deleted successfully with id: ${id}`);
      return !!result.affected;
    } catch (error) {
      logger.error(`Error deleting expense type: ${error}`);
      return false;
    }
  }
}