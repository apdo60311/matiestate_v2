import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { ChequeRepository } from "../repositories/cheque.repository";
import { logger } from "../utils/logger";
import { Cheque } from "../entities/Cheque.entity";
import { IChequeMainDataBody } from "../types/cheque.types";
import { EntryGenerationFacade } from "./entry-services/entry-services-facade";
import { EntryType, IChequeEntryData, IEntryGenerationData } from "../types/entry.types";

@injectable()
export class ChequeService {
    constructor(
        @inject(DI_TYPES.ChequeRepository)
        private chequeRepository: ChequeRepository,
        @inject(DI_TYPES.EntryGenerationFacade)
        private entryGenerationFacade: EntryGenerationFacade
    ) { }

    // Cheque Methods
    async createCheque(data: IChequeMainDataBody): Promise<string | null> {
        try {
            const chequeId = await this.chequeRepository.createCheque(data);

            if (!chequeId) {
                logger.error(`Cheque creation failed`);
                return null;
            }

            const chequeEntryData: IChequeEntryData = {
                cheque_id: chequeId,
                cheque: {
                    ...data,
                    date: data.date!,
                    amount: data.amount!,
                    currency_id: data.currencyId!,
                    account_id: data.accountId!,
                    observe_account_id: data.observeAccountId!,
                    cost_center_id: data.costCenterId!,
                    observe_cost_center_id: data.observeCostCenterId!,
                },
                pattern: {
                    code: data.code!,
                }
            }

            const entryData: IEntryGenerationData = {
                type: EntryType.CHEQUE,
                data: chequeEntryData
            }

            await this.entryGenerationFacade.generateEntry(entryData);


            logger.info(`Cheque created successfully with ID: ${chequeId}`);
            return chequeId;
        } catch (error) {
            logger.error(`Error creating cheque: ${error}`);
            return null;
        }
    }

    async getChequeById(id: string): Promise<Cheque | null> {
        try {
            return await this.chequeRepository.getChequeById(id);
        } catch (error) {
            logger.error(`Error getting cheque by id: ${error}`);
            return null;
        }
    }

    async getCheques(): Promise<Cheque[]> {
        try {
            return await this.chequeRepository.getCheques();
        } catch (error) {
            logger.error(`Error getting cheques: ${error}`);
            return [];
        }
    }

    async updateCheque(id: string, data: IChequeMainDataBody): Promise<boolean> {
        try {
            return await this.chequeRepository.updateCheque(id, data);
        } catch (error) {
            logger.error(`Error updating cheque: ${error}`);
            return false;
        }
    }

    async deleteCheque(id: string): Promise<boolean> {
        try {
            return await this.chequeRepository.deleteCheque(id);
        } catch (error) {
            logger.error(`Error deleting cheque: ${error}`);
            return false;
        }
    }

    async getChequesByInstallmentAndCode(
        installmentId: string,
        code: number
    ): Promise<Cheque[] | null> {
        try {
            return await this.chequeRepository.findByInstallmentAndCode(
                installmentId,
                code
            );
        } catch (error) {
            logger.error(`Error getting cheques by installment and code: ${error}`);
            return [];
        }
    }
}