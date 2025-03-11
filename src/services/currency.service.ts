import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Currency } from "../entities/Currency.entity";
import { CurrencyRepository } from "../repositories/currency.repository";
import { logger } from "../utils/logger";

@injectable()
export class CurrencyService {
    constructor(
        @inject(DI_TYPES.CurrencyRepository)
        private currencyRepository: CurrencyRepository
    ) { }

    async createCurrency(currencyData: Partial<Currency>): Promise<string | null> {
        try {
            return await this.currencyRepository.createCurrency(currencyData);
        } catch (error) {
            logger.error(`Error creating currency: ${error}`);
            return null;
        }
    }

    async getCurrencyById(id: string): Promise<Currency | null> {
        try {
            return await this.currencyRepository.getCurrencyById(id);
        } catch (error) {
            logger.error(`Error getting currency by id: ${error}`);
            return null;
        }
    }

    async getAllCurrencies(): Promise<Currency[]> {
        try {
            return await this.currencyRepository.getAllCurrencies();
        } catch (error) {
            logger.error(`Error getting all currencies: ${error}`);
            return [];
        }
    }

    async updateCurrency(id: string, currencyData: Partial<Currency>): Promise<boolean> {
        try {
            return await this.currencyRepository.updateCurrency(id, currencyData);
        } catch (error) {
            logger.error(`Error updating currency: ${error}`);
            return false;
        }
    }

    async deleteCurrency(id: string): Promise<boolean> {
        try {
            return await this.currencyRepository.deleteCurrency(id);
        } catch (error) {
            logger.error(`Error deleting currency: ${error}`);
            return false;
        }
    }

    async getCurrencyByCode(code: string): Promise<Currency | null> {
        try {
            return await this.currencyRepository.getCurrencyByCode(code);
        } catch (error) {
            logger.error(`Error getting currency by code: ${error}`);
            return null;
        }
    }
}