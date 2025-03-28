import { DI_TYPES } from "../di/di.types";
import { ReportGenerationFacade } from "../services/report-services/report-service-facade";
import {
  IBalanceSheetReportBody,
  IBillDetailsReportQuerystring,
  IBillProfitReportQuerystring,
  IChangesFlatsRentPricingBody,
  IContractLeasedReportBody,
  IContractReportBody,
  IContractSoldReportBody,
  IGeneralLedgerReportQuerystring,
  IGetCustomerReportsQuery,
  IGetWorkerServiceReportQuery,
  IInventoryReportQuerystring,
  IItemActivityReportQuerystring,
  IJournalLedgerReportQuerystring,
  ILeasedPropertyReportBody,
  IProfitAndLossReportQuerystring,
  IReportFilter,
  IReportRequestBody,
  ITrialBalanceReportQuerystring,
  IUnitReversedReportBody,
  IUnitVacatedReportBody,
  ReportType
} from "../types/report.types";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { inject } from "inversify";

export class ReportController {
  constructor(
    @inject(DI_TYPES.ReportGenerationFacade)
    private readonly reportFacade: ReportGenerationFacade
  ) { }

  generateReport: RequestHandler<
    any,
    ResponseModel<any>,
    { type: ReportType, filter: IReportFilter },
    any,
    any
  > = async (
    req: CustomRequest<any, ResponseModel<Record<string, any>>, { type: ReportType, filter: IReportFilter }, any, any>,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        const report = await this.reportFacade.generateReport({
          type: req.body.type,
          filter: req.body.filter
        });

        if (!report) {
          return res.status(404).json({
            success: false,
            message: "Report not found"
          });
        }

        return res.status(200).json({
          success: true,
          message: "Report generated successfully",
          data: report
        });

      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: error?.message
        });
      }
    }



  balanceSheetReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IBalanceSheetReportBody,
    unknown,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      IBalanceSheetReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.status(200).json({
          success: true,
          message: "Balance Sheet Report",
        });
      } catch (e: any) {
        res.status(500).send({
          success: false,
          message: e?.message,
        });
      }
    };

  billDetailsReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IBillDetailsReportQuerystring,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IBillDetailsReportQuerystring,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({
          success: true,
          message: "Bill Details Report",
        });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  billProfitReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IBillProfitReportQuerystring,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IBillProfitReportQuerystring,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Bill Profit Report" });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  endingInventoryReport = async (req: Request, res: Response) => {
    try {
      res.send({ message: "Ending Inventory Report" });
    } catch (e: any) {
      res.status(500).send({ message: e?.message });
    }
  };
  generalLedgerReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IGeneralLedgerReportQuerystring,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IGeneralLedgerReportQuerystring,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "General Ledger Report" });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  inventoryReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IInventoryReportQuerystring,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IInventoryReportQuerystring,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Inventory Report" });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  itemActivityReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IItemActivityReportQuerystring,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IItemActivityReportQuerystring,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Item Activity Report" });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  journalLedgerReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IJournalLedgerReportQuerystring,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IJournalLedgerReportQuerystring,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Journal Ledger Report" });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  profitAndLossReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IProfitAndLossReportQuerystring,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IProfitAndLossReportQuerystring,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Profit and Loss Report" });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  salesReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    unknown,
    any
  > = async (
    req: Request<
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
        res.send({ success: true, message: "Sales Report" });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  trialBalanceReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    ITrialBalanceReportQuerystring,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      ITrialBalanceReportQuerystring,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Trial Balance Report" });
      } catch (e: any) {
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  contractReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractReportBody,
    unknown,
    any
  > = async (
    req: Request<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Contract Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  unitLeasedReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractLeasedReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractLeasedReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Unit Leased Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  landLeasedReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractLeasedReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractLeasedReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Land Leased Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  parkingLeasedReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractLeasedReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractLeasedReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Parking Leased Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  villaLeasedReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractLeasedReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractLeasedReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Villa Leased Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  unitSoldReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractSoldReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractSoldReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Unit Sold Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  landSoldReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractSoldReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractSoldReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Land Sold Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  villaSoldReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractSoldReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractSoldReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Villa Sold Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  unitsVacatedReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IUnitVacatedReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractSoldReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Units Vacated Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  unitsReservedReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IUnitReversedReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IUnitReversedReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Units Reserved Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  leasedPropertyReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    ILeasedPropertyReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      ILeasedPropertyReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Leased Property Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  changesFlatsRentPricing: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IChangesFlatsRentPricingBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IChangesFlatsRentPricingBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Changes Flats Rent Pricing" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  contractsDepositReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractSoldReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Contracts Deposit Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  contractNearToExpireReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Contract Near To Expire Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };
  contractExpiredReport: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IContractReportBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IContractReportBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        res.send({ success: true, message: "Contract Expired Report" });
      } catch (e: any) {
        console.log(e);
        res.status(500).send({ success: false, message: e?.message });
      }
    };

  reportsComplaintsReportController: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IReportRequestBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IReportRequestBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        return res.status(200).send({
          success: true,
          message: "Reports complaints returned successfully",
          data: {
            report_complaints: [],
          },
        });
      } catch (e: any) {
        return res.status(500).send({
          success: false,
          message: e?.message,
        });
      }
    };
  reportsWareHouseReportController: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IReportRequestBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IReportRequestBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        return res.status(200).json({
          success: true,
          message: "Report warehouses returned successfully",
          data: {
            report_warehouse: {},
          },
        });
      } catch (e: any) {
        return res.status(500).json({
          success: false,
          message: e?.message,
        });
      }
    };
  reportsWorkerReportController: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IReportRequestBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IReportRequestBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        return res.status(200).json({
          success: true,
          message: "Worker reports returned sucessfully.",
          data: {
            reports: [],
          },
        });
      } catch (e: any) {
        return res.status(500).json({
          success: false,
          message: e?.message,
        });
      }
    };
  reportsOwnerExpensesReportController: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    IReportRequestBody,
    unknown,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      IReportRequestBody,
      unknown,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        return res.status(200).json({
          success: true,
          message: "Owner expenses report returned successfully",
          data: {
            report: {},
          },
        });
      } catch (e: any) {
        return res.status(500).json({
          success: false,
          message: e?.message,
        });
      }
    };


  reportsWorkerServiceReportController: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IGetWorkerServiceReportQuery,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IGetWorkerServiceReportQuery,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        return res.status(200).json({
          success: true,
          message: "Worker Service report returned successfully",
          data: {
            report: {},
          },
        });
      } catch (e: any) {
        return res.status(500).json({
          success: false,
          message: e?.message,
        });
      }
    };

  getCustomerReportsContoller: RequestHandler<
    unknown,
    ResponseModel<Record<string, any>>,
    unknown,
    IGetCustomerReportsQuery,
    any
  > = async (
    req: CustomRequest<
      unknown,
      ResponseModel<Record<string, any>>,
      unknown,
      IGetCustomerReportsQuery,
      any
    >,
    res: Response<ResponseModel<Record<string, any>>>,
    next: NextFunction
  ): Promise<any> => {
      try {
        return res.status(200).json({
          success: true,
          message: "Worker Service report returned successfully",
          data: {
            report: {},
          },
        });
      } catch (e: any) {
        return res.status(500).json({
          success: false,
          message: e?.message,
        });
      }
    };





}
