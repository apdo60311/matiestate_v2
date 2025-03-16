import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ContractTerms } from "../../entities/ContractTerms.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractTermsRepository extends Repository<ContractTerms> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ContractTerms, datasource.createEntityManager());
    }

    async createContractTerms(terms: Partial<ContractTerms>): Promise<string | null> {
        try {
            const result = await this.save(terms);
            logger.info(`Contract Terms Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Contract Terms. ${error}`);
            return null;
        }
    }

    async createMultipleTerms(contractId: string, terms: Partial<ContractTerms>[]): Promise<string[] | null> {
        try {
            const termsWithContract = terms.map(term => ({
                ...term,
                contract: { id: contractId }
            }));

            const result = await this.save(termsWithContract);
            const termIds = result.map(term => term.id);
            logger.info(`Contract Terms Created successfully with ids: ${termIds.join(', ')}`);
            return termIds;
        } catch (error) {
            logger.error(`Error while creating Contract Terms. ${error}`);
            return null;
        }
    }

    async getTermsByContractId(contractId: string): Promise<ContractTerms[]> {
        try {
            const result = await this.find({
                where: { contract: { id: contractId } }
            });
            logger.info(`Fetched Terms for contract: ${contractId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Terms for contract: ${contractId}. ${error}`);
            return [];
        }
    }
}
