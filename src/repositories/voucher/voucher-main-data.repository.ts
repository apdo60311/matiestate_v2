import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { VoucherMainData } from "../../entities/VoucherMainData.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class VoucherMainDataRepository extends Repository<VoucherMainData> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(VoucherMainData, datasource.createEntityManager());
    }

    async createVoucher(voucher: Partial<VoucherMainData>): Promise<string | null> {
        try {
            const result = await this.save(voucher);
            logger.info(`Voucher Main Data created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Voucher Main Data: ${error}`);
            return null;
        }
    }

    async getVoucherById(id: string): Promise<VoucherMainData | null> {
        try {
            const voucher = await this.findOne({
                where: { id },
                relations: ['currency', 'seller', 'account', 'tenant', 'voucherPattern']
            });
            logger.info(`Retrieved Voucher Main Data with id: ${id}`);
            return voucher;
        } catch (error) {
            logger.error(`Error getting Voucher Main Data: ${error}`);
            return null;
        }
    }

    async updateVoucher(id: string, voucher: Partial<VoucherMainData>): Promise<boolean> {
        try {
            await this.update(id, voucher);
            logger.info(`Updated Voucher Main Data with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error updating Voucher Main Data: ${error}`);
            return false;
        }
    }

    async getVouchers(): Promise<VoucherMainData[]> {
        try {
            const vouchers = await this.find({
              relations: [
                "currency",
                "seller",
                "account",
                "tenant",
                "voucherPattern",
              ],
            });
            logger.info(`Retrieved all Vouchers`);
            return vouchers;
        } catch (error) {
            logger.error(`Error getting all Vouchers: ${error}`);
            return [];
        }
    }
}