import { inject, injectable } from "inversify";
import { logger } from "../../utils/logger";
import { ChequeEntryService } from "./cheque-entry.service";
import { TerminationEntryService } from "./termination-entry.service";
import { FeesEntryService } from "./fees-entry.service";
import { ContractEntryService } from "./contract-entry.service";
import { TerminationFinesEntryService } from "./termination-fines-entry.service";
import { VoucherEntryService } from "./voucher-entry.service";
import { EntryType, IEntryGenerationData } from "../../types/entry.types";
import { DI_TYPES } from "../../di/di.types";


@injectable()
export class EntryGenerationFacade {
    constructor(
        @inject(DI_TYPES.ChequeEntryService)
        private readonly chequeEntryService: ChequeEntryService,

        @inject(DI_TYPES.TerminationEntryService)
        private readonly terminationEntryService: TerminationEntryService,

        @inject(DI_TYPES.TerminationFinesEntryService)
        private readonly terminationFinesEntryService: TerminationFinesEntryService,

        @inject(DI_TYPES.FeesEntryService)
        private readonly feesEntryService: FeesEntryService,

        @inject(DI_TYPES.ContractEntryService)
        private readonly contractEntryService: ContractEntryService,

        @inject(DI_TYPES.VoucherEntryService)
        private readonly voucherEntryService: VoucherEntryService
    ) { }

    async generateEntry(entryGenerationData: IEntryGenerationData): Promise<boolean> {
        try {
            logger.info(`Starting entry generation for type: ${entryGenerationData.type}`);
            this.validateInput(entryGenerationData);
            switch (entryGenerationData.type) {
                case EntryType.CHEQUE:
                    await this.chequeEntryService.generateEntryForCheque(entryGenerationData.data);
                    break;

                case EntryType.TERMINATION:
                    await this.terminationEntryService.generateEntryFromTermination(entryGenerationData.data);
                    break;

                case EntryType.TERMINATION_FINES:
                    await this.terminationFinesEntryService.generateEntryFromTerminationFines(entryGenerationData.data);
                    break;

                case EntryType.FEES:
                    await this.feesEntryService.generateEntryFromFees(entryGenerationData.data);
                    break;

                case EntryType.CONTRACT:
                    await this.contractEntryService.generateEntry(entryGenerationData.data);
                    break;
                case EntryType.VOUCHER:
                    await this.voucherEntryService.generateEntry(entryGenerationData.data);
                    break;
                default:
                    throw new Error(`Unhandled entry type: ${entryGenerationData.type}`);
            }
            logger.info(`Successfully generated entry of type: ${entryGenerationData.type}`);
            return true;
        } catch (error: any) {
            logger.error(`Error generating entry: ${error.message}`);
            return false;
        }
    }

    private async validateInput(data: IEntryGenerationData): Promise<void> {
        if (!data.type) {
            throw new Error("Entry type is required");
        }

        if (!Object.values(EntryType).includes(data.type as EntryType)) {
            throw new Error(`Unsupported entry type: ${data.type}`);
        }

        if (!data.data) {
            throw new Error("Entry data is required");
        }
    }
}

