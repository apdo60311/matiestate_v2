import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Bill } from "../entities/Bill.entity";
import { BillMaterialDetail } from "../entities/BillMaterialDetails.entity";
import { BillDiscountsDetails } from "../entities/BillDiscountsDetails.entity";
import { BillRepository } from "../repositories/bill/bill.repository";
import { BillMaterialDetailsRepository } from "../repositories/bill/bill-material-details.repository";
import { BillDiscountsDetailsRepository } from "../repositories/bill/bill-discount-details.repository";
import { logger } from "../utils/logger";
import { EntryGenerationFacade } from "./entry-services/entry-services-facade";
import { EntryType, IBillEntryData, IEntryGenerationData } from "../types/entry.types";

@injectable()
export class BillService {
    constructor(
        @inject(DI_TYPES.BillRepository) 
        private readonly billRepository: BillRepository,
        
        @inject(DI_TYPES.BillMaterialDetailsRepository)
        private readonly materialDetailsRepository: BillMaterialDetailsRepository,
        
        @inject(DI_TYPES.BillDiscountsDetailsRepository)
        private readonly discountDetailsRepository: BillDiscountsDetailsRepository,
        
        @inject(DI_TYPES.EntryGenerationFacade)
        private readonly entryGenerationFacade: EntryGenerationFacade
    ) {}

    async createBill(
        billData: Partial<Bill>,
        materialDetails: Partial<BillMaterialDetail>[],
        discountDetails: Partial<BillDiscountsDetails>[]
    ): Promise<string | null> {
        try {
            const billId = await this.billRepository.createBill(billData);
            if (!billId) return null;

            const materialsWithBillId = materialDetails.map(detail => ({
                ...detail,
                bill_id: billId
            }));

            const discountsWithBillId = discountDetails.map(detail => ({
                ...detail,
                bill_id: billId
            }));

            const materialDetailsPromise= this.materialDetailsRepository.createMultipleMaterialDetails(materialsWithBillId);
            const discountDetailsPromise= this.discountDetailsRepository.createMultipleDiscountDetails(discountsWithBillId);
            const entryPromise= this.generateBillEntry(billId);
            
            const [
                materialDetailsResult,
                discountDetailsResult,
                entryResult
            ] = await Promise.all([materialDetailsPromise, discountDetailsPromise, entryPromise]);

            if (!materialDetailsResult || !discountDetailsResult || !entryResult) {
                throw new Error("Failed to create bill and its related details");
            }

            logger.info(`Created bill with ID: ${billId}`);
            logger.info(`Created material details with ids ${JSON.stringify(materialDetailsResult)}`);
            logger.info(`Created discount details with ids ${JSON.stringify(discountDetailsResult)}`);
            logger.info(`Created entry for bill with ID: ${billId}.`);            

            return billId;
        } catch (error) {
            logger.error(`Error creating bill: ${error}`);
            return null;
        }
    }

    async getBillById(id: string): Promise<{
        bill: Bill | null,
        materialDetails: BillMaterialDetail[],
        discountDetails: BillDiscountsDetails[]
    }> {
        try {
            const [bill, materialDetails, discountDetails] = await Promise.all([
                this.billRepository.getBillById(id),
                this.materialDetailsRepository.getMaterialDetailsByBillId(id),
                this.discountDetailsRepository.getDiscountDetailsByBillId(id)
            ]);

            return { bill, materialDetails, discountDetails };
        } catch (error) {
            logger.error(`Error getting bill by ID ${id}: ${error}`);
            return { bill: null, materialDetails: [], discountDetails: [] };
        }
    }

    async updateBill(
        id: string,
        billData: Partial<Bill>,
        materialDetails: Partial<BillMaterialDetail>[],
        discountDetails: Partial<BillDiscountsDetails>[]
    ): Promise<boolean> {
        try {
            const billUpdated = await this.billRepository.updateBill(id, billData);
            if (!billUpdated) return false;

            for (const detail of materialDetails) {
                if (detail.id) {
                    await this.materialDetailsRepository.updateMaterialDetail(detail.id, detail);
                } else {
                    await this.materialDetailsRepository.createMaterialDetail({
                        ...detail,
                        billId: id
                    });
                }
            }

            for (const detail of discountDetails) {
                if (detail.id) {
                    await this.discountDetailsRepository.updateDiscountDetail(detail.id, detail);
                } else {
                    await this.discountDetailsRepository.createDiscountDetail({
                        ...detail,
                        bill_id: id
                    });
                }
            }

            return true;
        } catch (error) {
            logger.error(`Error updating bill ${id}: ${error}`);
            return false;
        }
    }

    async deleteBill(id: string): Promise<boolean> {
        try {
            return await this.billRepository.deleteBill(id);
        } catch (error) {
            logger.error(`Error deleting bill ${id}: ${error}`);
            return false;
        }
    }

    async getBillsByDateRange(startDate: Date, endDate: Date): Promise<Bill[]> {
        return this.billRepository.getBillsByDateRange(startDate, endDate);
    }

    async getBillsByTenant(tenantId: string): Promise<Bill[]> {
        return this.billRepository.getBillsByTenant(tenantId);
    }

    async getBillsByCustomer(customerAccountId: string): Promise<Bill[]> {
        return this.billRepository.getBillsByCustomer(customerAccountId);
    }

    async generateBillEntry(billId: string): Promise<Boolean> {
        try {
            const { bill } = await this.getBillById(billId);
            if (!bill) {
                throw new Error(`Bill not found with ID: ${billId}`);
            }

            const billDiscountsDetails = await this.getBillDiscountsDetails(billId);

            const  billEntryData: IBillEntryData = {
                values: {
                     bill: {
                        currency_id: bill.currency_id,
                        currency_val: bill.currency_val,
                        note: bill.note,
                        bill_date: bill.bill_date,
                        subtotal: bill.subtotal,
                        total: bill.total,
                        discounts: bill.discounts,
                        extras: bill.extras,
                        vat_amount: bill.vat_amount,
                        customer_account_id: bill.customer_account_id,
                        material_account_id: bill.material_account_id!,
                        cost_center_id: bill.cost_center_id!,
                        payment_method: bill.payment_method!,
                        vat_account_id: bill.vat_account_id!,
                        bill_discounts_details: billDiscountsDetails, 
                    }
                },
                pattern: {
                    bill_type: bill.billPattern.bill_type,
                    cash_account_id: bill.billPattern.cash_account_id!,
                    discount_account_id: bill.billPattern.discount_account_id!,
                    extra_account_id: bill.billPattern.extra_account_id!,
                    vat_account_id: bill.billPattern.vat_account_id!,
                },
                created_from: 'bill',
                created_from_id: billId,
                created_from_code: bill.number.toString()
            }

            const entryGenerationData: IEntryGenerationData = {
                type: EntryType.BILL,
                data: billEntryData,
            }

            return await this.entryGenerationFacade.generateEntry(entryGenerationData);
        } catch (error) {
            logger.error(`Error generating bill entry for ${billId}: ${error}`);
            return false;
        }
    }

    async getBillDiscountsDetails(billId: string): Promise<BillDiscountsDetails[]> {
        return this.discountDetailsRepository.getDiscountDetailsByBillId(billId);
    }
}