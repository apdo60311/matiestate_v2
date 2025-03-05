import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { VoucherPictures } from "../../entities/VoucherPictures.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class VoucherPicturesRepository extends Repository<VoucherPictures> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(VoucherPictures, datasource.createEntityManager());
    }

    async createPictures(pictures: Partial<VoucherPictures>[]): Promise<string[] | null> {
        try {
            const result = await this.save(pictures);
            logger.info(`Voucher Pictures created successfully with ids: ${result.map(pic => pic.id)}`);
            return result.map(pic => pic.id);
        } catch (error) {
            logger.error(`Error creating Voucher Pictures: ${error}`);
            return null;
        }
    }

    async getPicturesByVoucherId(voucherId: string): Promise<VoucherPictures[]> {
        try {
            const pictures = await this.find({
                where: { voucherMainData: { id: voucherId } },
                relations: ['tenant']
            });
            logger.info(`Retrieved pictures for voucher: ${voucherId}`);
            return pictures;
        } catch (error) {
            logger.error(`Error getting Voucher Pictures: ${error}`);
            return [];
        }
    }
}