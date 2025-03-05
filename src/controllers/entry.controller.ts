import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { EntriesService } from "../services/entries.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { IEntryDataRequestBody } from "../types/entry.types";

@injectable()
export class EntriesController {
  constructor(
    @inject(DI_TYPES.EntriesService)
    private entriesService: EntriesService
  ) {}

  public create: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IEntryDataRequestBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IEntryDataRequestBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.entriesService.createEntry(req.body);

      if (!result) {
        return res.status(500).send({
          success: false,
          message: "Failed to create entry",
        });
      }

      return res.status(201).send({
        success: true,
        message: "Entry created successfully",
        data: result,
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
      const entry = await this.entriesService.getEntryById(req.params.id);
      if (!entry) {
        return res.status(404).send({
          success: false,
          message: "Entry not found",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Entry retrieved successfully",
        data: entry,
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
    IEntryDataRequestBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      { id: string },
      ResponseModel<Record<string, any>>,
      IEntryDataRequestBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.entriesService.updateEntry(
        req.params.id,
        req.body
      );

      return res.status(200).send({
        success: result,
        message: result
          ? "Entry updated successfully"
          : "Failed to update entry",
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
      const result = await this.entriesService.deleteEntry(req.params.id);
      return res.status(200).send({
        success: result,
        message: result
          ? "Entry deleted successfully"
          : "Failed to delete entry",
      });
    } catch (e: any) {
      return res.status(500).send({
        success: false,
        message: e?.message,
      });
    }
  };
}
