import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Bill } from "../../entities/Bill.entity";
import { inject, injectable } from "inversify";
import { Between, DataSource, Repository } from "typeorm";

@injectable()
export class BillRepository extends Repository<Bill> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Bill, datasource.createEntityManager());
    }

    async createBill(bill: Partial<Bill>): Promise<string | null> {
        try {
            const result = await this.save(bill);
            logger.info(`Bill created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Bill: ${error}`);
            return null;
        }
    }

    async getBillById(id: string): Promise<Bill | null> {
        try {
            const bill = await this.findOne({
                where: { id },
                relations: [
                    'tenant',
                    'billPattern',
                    'clientAccount',
                    'currency',
                    'costCenter',
                    'store',
                    'customerAccount',
                    'materialAccount'
                ]
            });
            logger.info(`Retrieved Bill with id: ${id}`);
            return bill;
        } catch (error) {
            logger.error(`Error getting Bill: ${error}`);
            return null;
        }
    }

    async updateBill(id: string, bill: Partial<Bill>): Promise<boolean> {
        try {
            await this.update(id, bill);
            logger.info(`Updated Bill with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Bill: ${error}`);
            return false;
        }
    }

    async deleteBill(id: string): Promise<boolean> {
        try {
            await this.delete(id);
            logger.info(`Deleted Bill with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error deleting Bill: ${error}`);
            return false;
        }
    }

    async getBills(): Promise<Bill[]> {
        try {
            const bills = await this.find({
                relations: [
                    'tenant',
                    'billPattern',
                    'clientAccount',
                    'currency',
                    'costCenter',
                    'store',
                    'customerAccount',
                    'materialAccount'
                ]
            });
            logger.info('Retrieved all Bills');
            return bills;
        } catch (error) {
            logger.error(`Error getting Bills: ${error}`);
            return [];
        }
    }

    async getBillsByDateRange(startDate: Date, endDate: Date): Promise<Bill[]> {
        try {
            const bills = await this.find({
                where: {
                    bill_date: Between(startDate, endDate)
                },
                relations: [
                    'tenant',
                    'billPattern',
                    'clientAccount', 
                    'currency',
                    'costCenter',
                    'store',
                    'customerAccount',
                    'materialAccount'
                ]
            });
            logger.info(`Retrieved Bills between ${startDate} and ${endDate}`);
            return bills;
        } catch (error) {
            logger.error(`Error getting Bills by date range: ${error}`);
            return [];
        }
    }

    async getBillsByTenant(tenantId: string): Promise<Bill[]> {
        try {
            const bills = await this.find({
                where: { tenant_id: tenantId },
                relations: [
                    'tenant',
                    'billPattern',
                    'clientAccount',
                    'currency',
                    'costCenter', 
                    'store',
                    'customerAccount',
                    'materialAccount'
                ]
            });
            logger.info(`Retrieved Bills for tenant: ${tenantId}`);
            return bills;
        } catch (error) {
            logger.error(`Error getting Bills by tenant: ${error}`);
            return [];
        }
    }

    async getBillsByCustomer(customerAccountId: string): Promise<Bill[]> {
        try {
            const bills = await this.find({
                where: { customer_account_id: customerAccountId },
                relations: [
                    'tenant',
                    'billPattern',
                    'clientAccount',
                    'currency',
                    'costCenter',
                    'store',
                    'customerAccount',
                    'materialAccount'
                ]
            });
            logger.info(`Retrieved Bills for customer: ${customerAccountId}`);
            return bills;
        } catch (error) {
            logger.error(`Error getting Bills by customer: ${error}`);
            return [];
        }
    }
}