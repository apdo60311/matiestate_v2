import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { OwnerService } from "../services/owner.service";
import { Owner } from "../entities/Owner.entity";
import { IOwnerBody, IOwnerExpenseBody } from "../types/owner.types";
import { OwnerExpensesTypes } from "@/entities/OwnerExpensesTypes.entity";
import { OwnerExpensesDetails } from "@/entities/OwnerExpensesDetails.entity";
import { OwnerExpenses } from "@/entities/OwnerExpenses.entity";

@injectable()
export class OwnerController {
  constructor(
    @inject(DI_TYPES.OwnerService)
    private ownerService: OwnerService
  ) {}

  public create: RequestHandler<
    unknown,
    ResponseModel<{ id: string }>,
    IOwnerBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<{ id: string }>,
      IOwnerBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<{ id: string }>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const ownerId = await this.ownerService.createOwner(req.body);
      if (!ownerId) {
        return res.status(500).send({
          success: false,
          message: "Failed to create owner",
        });
      }
      return res.status(201).send({
        success: true,
        message: "Owner created successfully",
        data: { id: ownerId },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public getAll: RequestHandler<
    unknown,
    ResponseModel<{ owners: Owner[] }>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<{ owners: Owner[] }>,
      unknown,
      unknown,
      any
    >,
    res: Response<ResponseModel<{ owners: Owner[] }>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const owners = await this.ownerService.getAllOwners();
      return res.status(200).send({
        success: true,
        message: "Owners retrieved successfully",
        data: { owners },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public getById: RequestHandler<
    { id: string },
    ResponseModel<{ owner: Owner }>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { id: string },
      ResponseModel<{ owner: Owner }>,
      unknown,
      unknown,
      any
    >,
    res: Response<ResponseModel<{ owner: Owner }>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const owner = await this.ownerService.getOwnerById(req.params.id);
      if (!owner) {
        return res.status(404).send({
          success: false,
          message: "Owner not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Owner retrieved successfully",
        data: { owner },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public update: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    Partial<Owner>,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { id: string },
      ResponseModel<Record<string, any>>,
      Partial<Owner>,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.ownerService.updateOwner(
        req.params.id,
        req.body
      );
      return res.status(200).send({
        success: result,
        message: result
          ? "Owner updated successfully"
          : "Failed to update owner",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public delete: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { id: string },
      ResponseModel<Record<string, any>>,
      unknown,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.ownerService.deleteOwner(req.params.id);
      return res.status(200).send({
        success: result,
        message: result
          ? "Owner deleted successfully"
          : "Failed to delete owner",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  // Owner Expenses 
  public createExpense: RequestHandler<
    unknown,
    ResponseModel<{ id: string }>,
    IOwnerExpenseBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<{ id: string }>,
      IOwnerExpenseBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<{ id: string }>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const expenseId = await this.ownerService.createOwnerExpense(req.body);
      
      if (!expenseId) {
        return res.status(500).send({
          success: false,
          message: "Failed to create owner expense",
        });
      } 
      const expenseDetails = await this.ownerService.createExpenseDetails(expenseId,req.body.details??[])

      return res.status(201).send({
        success: true,
        message: "Owner expense created successfully",
        data: { id: expenseId ,
          ...expenseDetails
         },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public getExpenses: RequestHandler<
    { ownerId: string },
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { ownerId: string },
      ResponseModel<Record<string, any>>,
      unknown,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const expenses = await this.ownerService.getOwnerExpenses(
        req.params.ownerId
      );
      return res.status(200).send({
        success: true,
        message: "Owner expenses retrieved successfully",
        data: { expenses },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };


  public getAllExpenses: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const expenses = await this.ownerService.getAllExpenses();
      return res.status(200).send({
        success: true,
        message: "All Expenses retrieved successfully",
        data: { expenses },
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };


  public updateExpense: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    Partial<OwnerExpenses>,
    unknown,
    any
  > = async (req, res, next): Promise<any> => {
    try {
      const result = await this.ownerService.updateOwnerExpense(
        req.params.id,
        req.body
      );
      return res.status(200).send({
        success: result,
        message: result
          ? "Owner expense updated successfully"
          : "Failed to update owner expense",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public deleteExpense: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (req, res, next): Promise<any> => {
    try {
      const result = await this.ownerService.deleteOwnerExpense(req.params.id);
      return res.status(200).send({
        success: result,
        message: result
          ? "Owner expense deleted successfully"
          : "Failed to delete owner expense",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  // Owner Expenses Details endpoints
  public updateExpenseDetail: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    Partial<OwnerExpensesDetails>,
    unknown,
    any
  > = async (req, res, next): Promise<any> => {
    try {
      const result = await this.ownerService.updateExpenseDetail(
        req.params.id,
        req.body
      );
      return res.status(200).send({
        success: result,
        message: result
          ? "Expense detail updated successfully"
          : "Failed to update expense detail",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public deleteExpenseDetail: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (req, res, next): Promise<any> => {
    try {
      const result = await this.ownerService.deleteExpenseDetail(req.params.id);
      return res.status(200).send({
        success: result,
        message: result
          ? "Expense detail deleted successfully"
          : "Failed to delete expense detail",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  // Owner Expenses Types endpoints
  public updateExpenseType: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    Partial<OwnerExpensesTypes>,
    unknown,
    any
  > = async (req, res, next): Promise<any> => {
    try {
      const result = await this.ownerService.updateExpenseType(
        req.params.id,
        req.body
      );
      return res.status(200).send({
        success: result,
        message: result
          ? "Expense type updated successfully"
          : "Failed to update expense type",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };

  public deleteExpenseType: RequestHandler<
    { id: string },
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (req, res, next): Promise<any> => {
    try {
      const result = await this.ownerService.deleteExpenseType(req.params.id);
      return res.status(200).send({
        success: result,
        message: result
          ? "Expense type deleted successfully"
          : "Failed to delete expense type",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };
}
