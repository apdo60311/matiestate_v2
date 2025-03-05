import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { VoucherMainDataRepository } from "../repositories/voucher/voucher-main-data.repository";
import { VoucherGridDataRepository } from "../repositories/voucher/voucher-grid-data.repository";
import { VoucherPicturesRepository } from "../repositories/voucher/voucher-pictures.repository";
import { logger } from "../utils/logger";
import { VoucherMainData } from "../entities/VoucherMainData.entity";
import { VoucherGridData } from "../entities/VoucherGridData.entity";
import { VoucherPictures } from "../entities/VoucherPictures.entity";
import { VoucherPattern } from "../entities/VoucherPattern.entity";
import { IVoucherBody, IVoucherGridDataBody, IVoucherMainDataBody, IVoucherPicturesBody } from "../types/voucher.types";

@injectable()
export class VoucherService {
    constructor(
        @inject(DI_TYPES.VoucherMainDataRepository)
        private voucherMainDataRepository: VoucherMainDataRepository,
        @inject(DI_TYPES.VoucherGridDataRepository)
        private voucherGridDataRepository: VoucherGridDataRepository,
        @inject(DI_TYPES.VoucherPicturesRepository)
        private voucherPicturesRepository: VoucherPicturesRepository,
    ) {}

    // Voucher Main Data Methods
    async createVoucher(data: IVoucherMainDataBody): Promise<string | null> {
        try {
            return await this.voucherMainDataRepository.createVoucher(data);
        } catch (error) {
            logger.error(`Error creating voucher: ${error}`);
            return null;
        }
    }

    async getVoucherById(id: string): Promise<VoucherMainData | null> {
        try {
            return await this.voucherMainDataRepository.getVoucherById(id);
        } catch (error) {
            logger.error(`Error getting voucher by id: ${error}`);
            return null;
        }
    }

    async getVouchers(): Promise<VoucherMainData[]> {
        try {
            return await this.voucherMainDataRepository.getVouchers();
        } catch (error) {
            logger.error(`Error updating voucher: ${error}`);
            return [];
        }
    }


    async updateVoucher(id: string, data: IVoucherMainDataBody): Promise<boolean> {
        try {
            return await this.voucherMainDataRepository.updateVoucher(id, data);
        } catch (error) {
            logger.error(`Error updating voucher: ${error}`);
            return false;
        }
    }

    // Voucher Grid Data Methods
    async createVoucherGridEntry(entry: IVoucherGridDataBody): Promise<string | null> {
        try {
            return await this.voucherGridDataRepository.createGridEntry(entry);
        } catch (error) {
            logger.error(`Error creating voucher grid entry: ${error}`);
            return null;
        }
    }

    async getVoucherGridEntries(voucherId: string): Promise<VoucherGridData[]> {
        try {
            return await this.voucherGridDataRepository.getGridEntriesByVoucherId(voucherId);
        } catch (error) {
            logger.error(`Error getting voucher grid entries: ${error}`);
            return [];
        }
    }

    // Voucher Pictures Methods
    async createVoucherPictures(pictures: IVoucherPicturesBody[]): Promise<string[] | null> {
        try {
            return await this.voucherPicturesRepository.createPictures(pictures);
        } catch (error) {
            logger.error(`Error creating voucher pictures: ${error}`);
            return null;
        }
    }

    async getVoucherPictures(voucherId: string): Promise<VoucherPictures[]> {
        try {
            return await this.voucherPicturesRepository.getPicturesByVoucherId(voucherId);
        } catch (error) {
            logger.error(`Error getting voucher pictures: ${error}`);
            return [];
        }
    }
    // Complex Operations
    async createVoucherWithDetails(
        voucherData: IVoucherBody
    ): Promise<string | null> {
        try {
            // Create main voucher
            const voucherId = await this.createVoucher(voucherData.mainData);
            if (!voucherId) throw new Error(`Voucher Main Data Not created!`);

            let voucherGridDataPromise;
            let voucherPicturesPromise;

            // Create grid entries
            for (const entry of voucherData.gridData) {
                entry.voucherMainDataId = voucherId;
                voucherGridDataPromise = this.createVoucherGridEntry(entry);
            }

            // Create pictures if provided
            if (voucherData.pictures && voucherData.pictures.length > 0) {
                const picturesWithVoucherId = voucherData.pictures.map(pic => {
                    pic.voucherMainDataId = voucherId
                    return pic
                });
                voucherPicturesPromise = this.createVoucherPictures(picturesWithVoucherId);
            }

            const [gridId, pictureIds] = await Promise.all([
              voucherGridDataPromise,
              voucherPicturesPromise,
            ]);

            if (!gridId || !pictureIds) {
                throw new Error(`Voucher Grid Data or Pictures Not created!`);
            }

            logger.info(`Voucher created successfully with id: ${voucherId}`);
            return voucherId;
        } catch (error) {
            logger.error(`Error creating voucher with details: ${error}`);
            return null;
        }
    }
}