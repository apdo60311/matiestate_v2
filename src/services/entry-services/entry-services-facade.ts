import { inject, injectable } from "inversify";
import { logger } from "../../utils/logger";
import { ChequeEntryService } from "./cheque-entry.service";
import { TerminationEntryService } from "./termination-entry.service";
import { FeesEntryService } from "./fees-entry.service";
import { ContractEntryService } from "./generate-entry.service";
import { TerminationFinesEntryService } from "./termination-fines-entry.service";


export enum EntryType {
    CHEQUE = "cheque",
    TERMINATION = "termination",
    TERMINATION_FINES = "termination_fines",
    FEES = "fees",
    CONTRACT = "contract"
}

interface IEntryGenerationData {
    type: EntryType;
    data: any;
}

@injectable()
export class EntryGenerationFacade {
    constructor(
        @inject("ChequeEntryService")
        private readonly chequeEntryService: ChequeEntryService,

        @inject("TerminationEntryService")
        private readonly terminationEntryService: TerminationEntryService,

        @inject("TerminationFinesEntryService")
        private readonly terminationFinesEntryService: TerminationFinesEntryService,

        @inject("FeesEntryService")
        private readonly feesEntryService: FeesEntryService,

        @inject("ContractEntryService")
        private readonly contractEntryService: ContractEntryService
    ) { }

    async generateEntry(data: IEntryGenerationData): Promise<void> {
        try {
            logger.info(`Starting entry generation for type: ${data.type}`);
            this.validateInput(data);
            switch (data.type) {
                case EntryType.CHEQUE:
                    await this.chequeEntryService.generateChequesFromInstallment(data.data);
                    break;

                case EntryType.TERMINATION:
                    await this.terminationEntryService.generateEntryFromTermination(data.data);
                    break;

                case EntryType.TERMINATION_FINES:
                    await this.terminationFinesEntryService.generateEntryFromTerminationFines(data.data);
                    break;

                case EntryType.FEES:
                    await this.feesEntryService.generateEntryFromFees(data.data);
                    break;

                case EntryType.CONTRACT:
                    const { contract, contractId } = data.data;
                    await this.contractEntryService.generateEntry(contract, contractId);
                    break;

                default:
                    throw new Error(`Unhandled entry type: ${data.type}`);
            }
            logger.info(`Successfully generated entry of type: ${data.type}`);
        } catch (error: any) {
            logger.error(`Error generating entry: ${error.message}`);
            throw error;
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

