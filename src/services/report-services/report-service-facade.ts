import { inject, injectable } from "inversify";
import { BalanceSheetService } from "./balance-sheet.service";
import { DI_TYPES } from "../../di/di.types";
import { IReportGenerationData, IReportResponse, ReportType } from "../../types/report.types";
import { logger } from "../../utils/logger";
import { GeneralLedgerService } from "./general-ledger.service";
import { JournalLedgerService } from "./journal-ledger.service";
import { VacatedContractService } from "./unit-vacated.service";
import { LeasedReportService } from "./leased-units.service";
import { UnitReservedReportService } from "./reversed-units.service";
import { SoldUnitsService } from "./sold-units.service";


@injectable()
export class ReportGenerationFacade {
    constructor(
        @inject(DI_TYPES.BalanceSheetService)
        private readonly balanceSheetService: BalanceSheetService,
        @inject(DI_TYPES.GeneralLedgerService)
        private readonly generalLedgerService: GeneralLedgerService,
        @inject(DI_TYPES.JournalLedgerService)
        private readonly journalLedgerService: JournalLedgerService,
        @inject(DI_TYPES.VacatedContractService)
        private readonly vacatedContractService: VacatedContractService,
        @inject(DI_TYPES.LeasedReportService)
        private readonly leasedReportService: LeasedReportService,
        @inject(DI_TYPES.UnitReservedReportService)
        private readonly unitReservedReportService: UnitReservedReportService,
        @inject(DI_TYPES.SoldUnitsService)
        private readonly soldUnitsService: SoldUnitsService,


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
                case ReportType.UNIT_VACATED_CONTRACT:
                    return await this.vacatedContractService.generateReport(reportGenerationData.filter);
                case ReportType.LEASED_UNITS:
                    return await this.leasedReportService.generateReport(reportGenerationData.filter);
                case ReportType.UNIT_RESERVED:
                    return await this.unitReservedReportService.generateReport(reportGenerationData.filter);
                case ReportType.SOLD_UNITS:
                    return await this.soldUnitsService.generateReport(reportGenerationData.filter);

                default:
                    return null;
            }

        } catch (error) {
            logger.error(`Error generating report: ${error}`);
            return null;
        }
    }
}
