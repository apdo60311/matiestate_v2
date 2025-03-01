 import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { Currency } from "../entities/Currency.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class CurrencyRepository extends Repository<Currency> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Currency, datasource.createEntityManager());
    }

    async createCurrency(currency: Partial<Currency>): Promise<string | null> {
        try {
            const result = await this.save(currency);
            logger.info(`Currency created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Currency. ${error}`);
            return null;
        }
    }

    async getCurrencyById(id: string): Promise<Currency | null> {
        try {
            const currency = await this.findOne({ 
                where: { id },
                relations: ['tenant']
            });
            logger.info(`Fetched Currency with id: ${id}`);
            return currency;
        } catch (error) {
            logger.error(`Error while fetching Currency. ${error}`);
            return null;
        }
    }

    async getAllCurrencies(): Promise<Currency[]> {
        try {
            const currencies = await this.find({
                relations: ['tenant']
            });
            logger.info('Retrieved all currencies');
            return currencies;
        } catch (error) {
            logger.error(`Error while fetching Currencies. ${error}`);
            return [];
        }
    }

    async updateCurrency(id: string, currency: Partial<Currency>): Promise<boolean> {
        try {
            await this.update(id, currency);
            logger.info(`Updated Currency with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Currency. ${error}`);
            return false;
        }
    }

    async deleteCurrency(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Currency with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting Currency. ${error}`);
            return false;
        }
    }
}