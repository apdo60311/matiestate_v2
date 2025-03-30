import { inject, injectable } from "inversify";
import { BalanceSheetService } from "./balance-sheet.service";
import { DI_TYPES } from "../../di/di.types";
import { IReportGenerationData, IReportResponse, ReportType } from "../../types/report.types";
import { logger } from "../../utils/logger";
import { GeneralLedgerService } from "./general-ledger.service";
import { JournalLedgerService } from "./journal-ledger.service";


@injectable()
export class ReportGenerationFacade {
    constructor(
        @inject(DI_TYPES.BalanceSheetService)
        private readonly balanceSheetService: BalanceSheetService,
        @inject(DI_TYPES.GeneralLedgerService)
        private readonly generalLedgerService: GeneralLedgerService,
        @inject(DI_TYPES.JournalLedgerService)
        private readonly journalLedgerService: JournalLedgerService
    ) {

    }

    async generateReport(reportGenerationData: IReportGenerationData): Promise<IReportResponse | null> {
        try {
            switch (reportGenerationData.type) {
                case ReportType.BALANCE_SHEET:
                    return await this.balanceSheetService.generateReport(reportGenerationData.filter);
                case ReportType.GENERAL_LEDGER:
                    return await this.generalLedgerService.generateReport(reportGenerationData.filter);
                case ReportType.JOURNAL_LEDGER:
                    return await this.journalLedgerService.generateReport(reportGenerationData.filter);

                default:
                    return null;
            }

        } catch (error) {
            logger.error(`Error generating report: ${error}`);
            return null;
        }
    }
}
