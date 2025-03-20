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
import { IVoucherBody, IVoucherEntry, IVoucherGridDataBody, IVoucherMainDataBody, IVoucherPicturesBody } from "../types/voucher.types";
import { VoucherEntryService } from "./entry-services/voucher-entry.service";
import { EntryGenerationFacade } from "./entry-services/entry-services-facade";
import { EntryType } from "../types/entry.types";

@injectable()
export class VoucherService {
    constructor(
        @inject(DI_TYPES.VoucherMainDataRepository)
        private voucherMainDataRepository: VoucherMainDataRepository,
        @inject(DI_TYPES.VoucherGridDataRepository)
        private voucherGridDataRepository: VoucherGridDataRepository,
        @inject(DI_TYPES.VoucherPicturesRepository)
        private voucherPicturesRepository: VoucherPicturesRepository,
        @inject(DI_TYPES.EntryGenerationFacade)
        private entryGenerationFacade: EntryGenerationFacade,
    ) { }

    // Voucher Main Data Methods
    async createVoucher(data: IVoucherMainDataBody): Promise<string | null> {
        try {

            const voucherEntry: IVoucherEntry = {
                values: {
                    currency_id: data.currencyId!,
                    currency_val: data.currencyVal!,
                    note: data.note!,
                    difference: data.creditTotal! - data.debitTotal!,
                    account_id: data.accountId!,
                    cost_center_id: "",
                    debit_amount: data.debitAmount ?? 0,
                    credit_amount: data.creditAmount ?? 0,
                },
                created_from: "voucher",
                created_from_id: data.id!,
                created_from_code: data.code!,
                grid: []
            }

            const entryGenerationPromise = this.entryGenerationFacade.generateEntry({
                type: EntryType.VOUCHER,
                data: voucherEntry
            });

            const voucherMainDataPromise = this.voucherMainDataRepository.createVoucher(data);

            const [_, result] = await Promise.all([entryGenerationPromise, voucherMainDataPromise])
            return result;
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

            const voucherEntry: IVoucherEntry = {
                values: {
                    currency_id: voucherData.mainData.currencyId!,
                    currency_val: voucherData.mainData.currencyVal!,
                    note: voucherData.mainData.note!,
                    difference: voucherData.mainData.creditTotal! - voucherData.mainData.debitTotal!,
                    account_id: voucherData.mainData.accountId!,
                    cost_center_id: (voucherData.gridData.length > 0) ? voucherData.gridData.at(0)!.costCenterId! : "",
                    debit_amount: voucherData.mainData.debitAmount ?? 0,
                    credit_amount: voucherData.mainData.creditAmount ?? 0,
                },
                created_from: "voucher",
                created_from_id: voucherData.mainData.id!,
                created_from_code: voucherData.mainData.code!,
                grid: voucherData.gridData.map((voucherGrid) => {
                    return {
                        account_id: voucherGrid.accountId,
                        debit_amount: voucherGrid.debit!,
                        credit_amount: voucherGrid.credit!,
                        currency_id: voucherGrid.currencyId!,
                        currency_val: voucherGrid.currencyVal!,
                        cost_center_id: voucherGrid.costCenterId!,
                        note: voucherGrid.note!,
                    }
                })
            }

            const entryGenerationPromise = this.entryGenerationFacade.generateEntry({
                type: EntryType.VOUCHER,
                data: voucherEntry
            });

            await Promise.all([entryGenerationPromise]);

            logger.info(`Voucher created successfully with id: ${voucherId}`);
            return voucherId;
        } catch (error) {
            logger.error(`Error creating voucher with details: ${error}`);
            return null;
        }
    }
}