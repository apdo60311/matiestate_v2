import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { VoucherGridData } from "../../entities/VoucherGridData.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class VoucherGridDataRepository extends Repository<VoucherGridData> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(VoucherGridData, datasource.createEntityManager());
    }

    async createGridEntry(entry: Partial<VoucherGridData>): Promise<string | null> {
        try {
            const result = await this.save(entry);
            logger.info(`Voucher Grid Data created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error creating Voucher Grid Data: ${error}`);
            return null;
        }
    }

    async getGridEntriesByVoucherId(voucherId: string): Promise<VoucherGridData[]> {
        try {
            const entries = await this.find({
                where: { voucher_main_data: { id: voucherId } },
                relations: ['account', 'cost_center', 'tenant']
            });
            logger.info(`Retrieved grid entries for voucher: ${voucherId}`);
            return entries;
        } catch (error) {
            logger.error(`Error getting Voucher Grid Data entries: ${error}`);
            return [];
        }
    }
}