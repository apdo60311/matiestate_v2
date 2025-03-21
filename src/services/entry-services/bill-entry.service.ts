import { inject, injectable } from "inversify";
import { EntriesService } from "../entries.service";
import { DI_TYPES } from "../../di/di.types";
import { IBillEntryData, IEntryDataRequestBody, IEntryGridData, IEntryMainData } from "../../types/entry.types";
import { logger } from "../../utils/logger";


@injectable()
export class BillEntryService {
    constructor(
        @inject(DI_TYPES.EntriesService) private readonly entriesService: EntriesService
    ) { }

    /**
     * Generates an entry from bill data, creating both main entry and grid rows.
     * @param data - The bill entry data containing values, pattern, and creation details.
     */
    async generateEntry(data: IBillEntryData): Promise<void> {
        try {
            const { values, pattern, created_from, created_from_id, created_from_code } = data;
            const bill = values.bill;

            const totalAmount = bill.total || 0;

            const mainData: IEntryMainData = {
                createdAt: bill.bill_date ? new Date(bill.bill_date) : new Date(),
                currencyId: bill.currency_id,
                currencyVal: bill.currency_val || 1,
                note: bill.note || "",
                debit: Math.abs(totalAmount),
                credit: Math.abs(totalAmount),
                difference: 0,
                createdFrom: created_from,
                createdFromId: created_from_id,
                createdFromCode: +created_from_code,
            };

            const billType = +pattern.bill_type;
            let gridData: IEntryGridData[];

            if (billType === 1) {
                gridData = this.generateInputGridRows(bill, pattern);
            } else if (billType === 2) {
                gridData = this.generateOutputGridRows(bill, pattern);
            } else {
                throw new Error(`Unsupported bill type: ${billType}`);
            }

            const entryRequestData: IEntryDataRequestBody = {
                mainData,
                gridData,
            };

            await this.entriesService.createEntry(entryRequestData);
        } catch (error) {
            logger.error(`Error generating entry from bill: ${error}`);
            throw error;
        }
    }

    /**
     * Generates grid rows for an input bill (bill_type = 1).
     * @param bill - The bill data.
     * @param pattern - The pattern data containing account IDs.
     * @returns Array of grid row data.
     */
    private generateInputGridRows(bill: IBillEntryData["values"]["bill"], pattern: IBillEntryData["pattern"]): IEntryGridData[] {
        const {
            customer_account_id,
            material_account_id,
            cost_center_id,
            currency_id,
            note,
            subtotal = 0,
            payment_method: type,
            vat_amount,
            discounts,
            extras,
        } = bill;

        const cash_account_id = pattern.cash_account_id;
        let discount_account_id = pattern.discount_account_id;
        let extra_account_id = pattern.extra_account_id;
        const vat_account_id = bill.vat_account_id || pattern.vat_account_id;

        const gridRows: IEntryGridData[] = [];
        const defaultRow = {
            currencyId: currency_id,
            costCenterId: cost_center_id,
            note: note || "",
        };

        const credit_account_id = +type === 2 ? cash_account_id : customer_account_id;
        let observe_discount_account_id = credit_account_id;
        let observe_extras_account_id = credit_account_id;

        // Material account debit
        gridRows.push({
            ...defaultRow,
            accountId: material_account_id,
            observeAccountId: credit_account_id,
            debit: Math.abs(subtotal),
            credit: 0,
            number: gridRows.length + 1,
        });

        // Credit account credit
        gridRows.push({
            ...defaultRow,
            accountId: credit_account_id,
            observeAccountId: material_account_id,
            debit: 0,
            credit: Math.abs(subtotal),
            number: gridRows.length + 1,
        });

        // VAT
        if (vat_amount) {
            gridRows.push({
                ...defaultRow,
                accountId: vat_account_id,
                observeAccountId: credit_account_id,
                debit: Math.abs(vat_amount),
                credit: 0,
                number: gridRows.length + 1,
            });

            gridRows.push({
                ...defaultRow,
                accountId: credit_account_id,
                observeAccountId: vat_account_id,
                debit: 0,
                credit: Math.abs(vat_amount),
                number: gridRows.length + 1,
            });
        }

        // Discounts
        if (discounts) {
            for (const row of bill.bill_discounts_details || []) {
                if (row.discount) {
                    discount_account_id = row.account_id || discount_account_id;
                    observe_discount_account_id = row.observe_account_id || observe_discount_account_id;
                }
                gridRows.push({
                    ...defaultRow,
                    accountId: discount_account_id,
                    observeAccountId: observe_discount_account_id,
                    debit: Math.abs(discounts),
                    credit: 0,
                    costCenterId: row.cost_center_id || cost_center_id,
                    note: row.note || note || "",
                    number: gridRows.length + 1,
                });

                gridRows.push({
                    ...defaultRow,
                    accountId: observe_discount_account_id,
                    observeAccountId: discount_account_id,
                    debit: 0,
                    credit: Math.abs(discounts),
                    costCenterId: row.cost_center_id || cost_center_id,
                    note: row.note || note || "",
                    number: gridRows.length + 1,
                });
            }
        }

        // Extras
        if (extras) {
            for (const row of bill.bill_discounts_details || []) {
                if (row.extra) {
                    extra_account_id = row.account_id || extra_account_id;
                    observe_extras_account_id = row.observe_account_id || observe_extras_account_id;
                    gridRows.push({
                        ...defaultRow,
                        accountId: extra_account_id,
                        observeAccountId: observe_extras_account_id,
                        debit: Math.abs(extras),
                        credit: 0,
                        costCenterId: row.cost_center_id || cost_center_id,
                        note: row.note || note || "",
                        number: gridRows.length + 1,
                    });

                    gridRows.push({
                        ...defaultRow,
                        accountId: observe_extras_account_id,
                        observeAccountId: extra_account_id,
                        debit: 0,
                        credit: Math.abs(extras),
                        costCenterId: row.cost_center_id || cost_center_id,
                        note: row.note || note || "",
                        number: gridRows.length + 1,
                    });
                }
            }
        }

        return gridRows;
    }

    /**
     * Generates grid rows for an output bill (bill_type = 2).
     * @param bill - The bill data.
     * @param pattern - The pattern data containing account IDs.
     * @returns Array of grid row data.
     */
    private generateOutputGridRows(bill: IBillEntryData["values"]["bill"], pattern: IBillEntryData["pattern"]): IEntryGridData[] {
        const {
            customer_account_id,
            material_account_id,
            cost_center_id,
            currency_id,
            note,
            subtotal = 0,
            payment_method: type,
            vat_amount,
            discounts,
            extras,
        } = bill;

        const cash_account_id = pattern.cash_account_id;
        let discount_account_id = pattern.discount_account_id;
        let extra_account_id = pattern.extra_account_id;
        const vat_account_id = pattern.vat_account_id;

        const gridRows: IEntryGridData[] = [];
        const defaultRow = {
            currencyId: currency_id,
            costCenterId: cost_center_id,
            note: note || "",
        };

        const debit_account_id = +type === 2 ? cash_account_id : customer_account_id;
        let observe_discount_account_id = debit_account_id;
        let observe_extras_account_id = debit_account_id;

        // Debit account debit
        gridRows.push({
            ...defaultRow,
            accountId: debit_account_id,
            observeAccountId: material_account_id,
            debit: Math.abs(subtotal),
            credit: 0,
            number: gridRows.length + 1,
        });

        // Material account credit
        gridRows.push({
            ...defaultRow,
            accountId: material_account_id,
            observeAccountId: debit_account_id,
            debit: 0,
            credit: Math.abs(subtotal),
            number: gridRows.length + 1,
        });

        // VAT
        if (vat_amount) {
            gridRows.push({
                ...defaultRow,
                accountId: debit_account_id,
                observeAccountId: vat_account_id,
                debit: Math.abs(vat_amount),
                credit: 0,
                number: gridRows.length + 1,
            });

            gridRows.push({
                ...defaultRow,
                accountId: vat_account_id,
                observeAccountId: debit_account_id,
                debit: 0,
                credit: Math.abs(vat_amount),
                number: gridRows.length + 1,
            });
        }

        // Discounts
        if (discounts) {
            for (const row of bill.bill_discounts_details || []) {
                if (row.discount) {
                    discount_account_id = row.account_id || discount_account_id;
                    observe_discount_account_id = row.observe_account_id || observe_discount_account_id;
                    gridRows.push({
                        ...defaultRow,
                        accountId: observe_discount_account_id,
                        observeAccountId: discount_account_id,
                        debit: Math.abs(discounts),
                        credit: 0,
                        costCenterId: row.cost_center_id || cost_center_id,
                        note: row.note || note || "",
                        number: gridRows.length + 1,
                    });

                    gridRows.push({
                        ...defaultRow,
                        accountId: discount_account_id,
                        observeAccountId: observe_discount_account_id,
                        debit: 0,
                        credit: Math.abs(discounts),
                        costCenterId: row.cost_center_id || cost_center_id,
                        note: row.note || note || "",
                        number: gridRows.length + 1,
                    });
                }
            }
        }

        // Extras
        if (extras) {
            for (const row of bill.bill_discounts_details || []) {
                if (row.extra) {
                    extra_account_id = row.account_id || extra_account_id;
                    observe_extras_account_id = row.observe_account_id || observe_extras_account_id;
                    gridRows.push({
                        ...defaultRow,
                        accountId: observe_extras_account_id,
                        observeAccountId: extra_account_id,
                        debit: Math.abs(extras),
                        credit: 0,
                        costCenterId: row.cost_center_id || cost_center_id,
                        note: row.note || note || "",
                        number: gridRows.length + 1,
                    });

                    gridRows.push({
                        ...defaultRow,
                        accountId: extra_account_id,
                        observeAccountId: observe_extras_account_id,
                        debit: 0,
                        credit: Math.abs(extras),
                        costCenterId: row.cost_center_id || cost_center_id,
                        note: row.note || note || "",
                        number: gridRows.length + 1,
                    });
                }
            }
        }

        return gridRows;
    }
}