import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { Shop } from "../entities/Shop.entity";
import { ShopRepository } from "../repositories/shop/shop.repository";
import { ShopPicturesRepository } from "../repositories/shop/shop-pictures.repository";
import { ShopRentalPriceRepository } from "../repositories/shop/shop-rental-price.repository";
import { ShopSellingPriceRepository } from "../repositories/shop/shop-selling-price.repository";
import { ShopAccumulateRepository } from "../repositories/shop/shop-accumulate.repository";
import { ShopFixedAssetsRepository } from "../repositories/shop/shop-fixed-assets.repository";
import { IShopAccumulate, IShopBody, IShopFixedAssets, IShopPicture, IShopRentalPrice, IShopSellingPrice } from "@/types/shop.types";
import { logger } from "../utils/logger";
import { ShopSellingPrice } from "../entities/ShopSellingPrice.entity";
import { ShopFixedAssets } from "../entities/ShopFixedAssets.entity";
import { ShopPictures } from "../entities/ShopPictures.entity";
import { ShopRentalPrice } from "../entities/ShopRentalPrice.entity";

@injectable()
export class ShopService {
    constructor(
        @inject(DI_TYPES.ShopRepository)
        private shopRepository: ShopRepository,
        @inject(DI_TYPES.ShopPicturesRepository)
        private shopPicturesRepository: ShopPicturesRepository,
        @inject(DI_TYPES.ShopRentalPriceRepository)
        private shopRentalPriceRepository: ShopRentalPriceRepository,
        @inject(DI_TYPES.ShopSellingPriceRepository)
        private shopSellingPriceRepository: ShopSellingPriceRepository,
        @inject(DI_TYPES.ShopAccumulateRepository)
        private shopAccumulateRepository: ShopAccumulateRepository,
        @inject(DI_TYPES.ShopFixedAssetsRepository)
        private shopFixedAssetsRepository: ShopFixedAssetsRepository
    ) {}

    async createShop(data: Partial<IShopBody>): Promise<string | null> {
        try {
            const shopId = await this.shopRepository.createShop(data);
            if (!shopId) return null;

            if (data.pictures?.length) {
                await this.createShopPictures(shopId, data.pictures);
            }

            if (data.rental_price) {
                await this.createShopRentalPrice(shopId,data.rental_price);
            }

            if (data.selling_price) {
                await this.createShopSellingPrice(shopId, data.selling_price);
            }

            if (data.accumulates?.length) {
                await this.createShopAccumulates(shopId,data.accumulates);
            }

            if (data.fixed_assets?.length) {
                await this.createShopFixedAssets(shopId, data.fixed_assets);
            }

            logger.info(`Shop created with id: ${shopId}`);
            return shopId;
        } catch (error) {
            logger.error(`Error creating shop: ${error}`);
            return null;
        }
    }

    async createShopPictures(shopId: string, pictures: IShopPicture[]): Promise<string[] | null> {
        try {
            const picturesWithShopId = pictures.map((picture) => {
                picture.shop_id = shopId;
                return picture;
            });
            return await this.shopPicturesRepository.createPictures(picturesWithShopId);
        } catch (error) {
            logger.error(`Error creating shop pictures: ${error}`);
            return null;
        }
    }

    async getShopPictures(shopId: string): Promise<ShopPictures[]> {
        return await this.shopPicturesRepository.getByShopId(shopId);
    }

    async deleteShopPicture(id: string): Promise<boolean> {
        return await this.shopPicturesRepository.deletePicture(id);
    }

    // Rental Price methods
    async createShopRentalPrice(shopId: string, price: IShopRentalPrice): Promise<string | null> {
        try {
            price.shop_id = shopId;
            return await this.shopRentalPriceRepository.createRentalPrice(price);
        } catch (error) {
            logger.error(`Error creating shop rental price: ${error}`);
            return null;
        }
    }

    async getShopRentalPrice(shopId: string): Promise<ShopRentalPrice | null> {
        return await this.shopRentalPriceRepository.getByShopId(shopId);
    }

    async updateShopRentalPrice(id: string, price: Partial<ShopRentalPrice>): Promise<boolean> {
        return await this.shopRentalPriceRepository.updateRentalPrice(id, price);
    }

    // Selling Price methods
    async createShopSellingPrice(shopId: string, price: IShopSellingPrice): Promise<string | null> {
        try {
            price.shop_id = shopId;
            return await this.shopSellingPriceRepository.createSellingPrice(price);
        } catch (error) {
            logger.error(`Error creating shop selling price: ${error}`);
            return null;
        }
    }

    async getShopSellingPrice(shopId: string): Promise<ShopSellingPrice | null> {
        return await this.shopSellingPriceRepository.getByShopId(shopId);
    }

    async updateShopSellingPrice(id: string, price: Partial<ShopSellingPrice>): Promise<boolean> {
        return await this.shopSellingPriceRepository.updateSellingPrice(id, price);
    }

    // Accumulate methods
    async createShopAccumulates(shopId: string, accumulates: IShopAccumulate[]): Promise<string[] | null> {
        try {
            const accumulatesWithShopId = accumulates.map((accumulate) => {
                accumulate.shop_id = shopId;
                return accumulate;
            });
            return await this.shopAccumulateRepository.createAccumulates(accumulatesWithShopId);
        } catch (error) {
            logger.error(`Error creating shop accumulates: ${error}`);
            return null;
        }
    }

    // Fixed Assets methods
    async createShopFixedAssets(shopId: string, assets: IShopFixedAssets[]): Promise<string[] | null> {
        try {
            const assetsWithShopId = assets.map((asset) => {
                asset.shop_id = shopId;
                return asset;
            });


            return await this.shopFixedAssetsRepository.createFixedAssets(assetsWithShopId);
        } catch (error) {
            logger.error(`Error creating shop fixed assets: ${error}`);
            return null;
        }
    }

    async getShopFixedAssets(shopId: string): Promise<ShopFixedAssets[]> {
        return await this.shopFixedAssetsRepository.getByShopId(shopId);
    }

    async getShopById(id: string): Promise<Shop | null> {
        return await this.shopRepository.getShopById(id);
    }

    async getAllShops(): Promise<Shop[]> {
        return await this.shopRepository.find();
    }

    async getShopsByBuildingId(buildingId: string): Promise<Shop[]> {
        return await this.shopRepository.getShopsByBuildingId(buildingId);
    }

    async updateShop(id: string, data: Partial<Shop>): Promise<boolean> {
        return await this.shopRepository.updateShop(id, data);
    }

    async deleteShop(id: string): Promise<boolean> {
        return await this.shopRepository.deleteShop(id);
    }
}