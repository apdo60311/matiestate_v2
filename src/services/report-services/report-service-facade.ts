import { inject, injectable } from "inversify";
import { BalanceSheetService } from "./balance-sheet.service";
import { DI_TYPES } from "../../di/di.types";
import { IReportGenerationData, IReportResponse, ReportType } from "../../types/report.types";
import { logger } from "../../utils/logger";


@injectable()
export class ReportGenerationFacade {
    constructor(
        @inject(DI_TYPES.BalanceSheetService)
        private readonly balanceSheetService: BalanceSheetService,
    ) {

    }

    async generateReport(reportGenerationData: IReportGenerationData): Promise<IReportResponse | null> {
        try {
            switch (reportGenerationData.type) {
                case ReportType.BALANCE_SHEET:
                    return await this.balanceSheetService.generateReport(reportGenerationData.filter);

            }

        } catch (error) {
            logger.error(`Error generating report: ${error}`);
            return null;
        }
    }
}
