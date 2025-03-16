import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { Apartment } from "../../entities/Apartment.entity";
import { ApartmentAccumulate } from "../../entities/ApartmentAccumulate.entity";
import { ApartmentPictures } from "../../entities/ApartmentPictures.entity";
import { ApartmentRentalPrice } from "../../entities/ApartmentRentalPrice.entity";
import { ApartmentSellingPrice } from "../../entities/ApartmentSellingPrice.entity";
import { inject, injectable } from "inversify";
import { DataSource, In, Not, Repository } from "typeorm";

@injectable()
export class ApartmentRepository extends Repository<Apartment> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(Apartment, datasource.createEntityManager());
    }

    async createApartment(apartment: Partial<Apartment>): Promise<string | null> {
        try {
            const result = await this.save(apartment);
            logger.info(`Apartment Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Apartment. ${error}`);
            return null;
        }
    }

    async createApartments(apartments: Partial<Apartment>[]): Promise<string[] | null> {
        try {
            const result = await this.save(apartments);
            const apartmentIds = result.map((apartment) => apartment.id);
            logger.info(`Apartments Created successfully with ids: ${apartmentIds.join(', ')}`);
            return apartmentIds;
        } catch (error) {
            logger.error(`Error while creating Apartments. ${error}`);
            return null;
        }
    }

    async getApartmentById(id: string): Promise<Apartment | null> {
        try {
            const result = await this.findOne({
                where: { id },
                relations: [
                    'building',
                    'main_cost_center',
                    'cost_center',
                    'property_values',
                    'cost_currency',
                    'tenant'
                ]
            });
            logger.info(`Fetched Apartment with id: ${id}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Apartment with id: ${id}. ${error}`);
            return null;
        }
    }

    async getAllApartments(): Promise<Apartment[]> {
        try {
            const result = await this.find({
                relations: [
                    'building',
                    'main_cost_center',
                    'cost_center',
                    'property_values',
                    'cost_currency',
                    'tenant'
                ]
            });
            logger.info(`Fetched all Apartments successfully`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Apartments. ${error}`);
            return [];
        }
    }

    async getApartmentsByBuildingId(buildingId: string): Promise<Apartment[]> {
        try {
            const result = await this.find({
                where: { building: { id: buildingId } },
                relations: [
                    'main_cost_center',
                    'cost_center',
                    'property_values',
                    'cost_currency',
                    'tenant'
                ]
            });
            logger.info(`Fetched Apartments for building: ${buildingId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Apartments for building: ${buildingId}. ${error}`);
            return [];
        }
    }

    async updateApartment(id: string, apartment: Partial<Apartment>): Promise<boolean> {
        try {
            await this.update(id, apartment);
            logger.info(`Updated Apartment with id: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Error while updating Apartment with id: ${id}. ${error}`);
            return false;
        }
    }

    async deleteApartment(id: string): Promise<boolean> {
        try {
            const result = await this.delete(id);
            if (result.affected && result.affected > 0) {
                logger.info(`Deleted Apartment with id: ${id}`);
                return true;
            }
            return false;
        } catch (error) {
            logger.error(`Error while deleting Apartment with id: ${id}. ${error}`);
            return false;
        }
    }

    async getAvailableApartments(occupiedIds: string[]): Promise<Apartment[]> {
        try {
            const result = await this.find({
                where: {
                    blocked: false,
                    id: Not(In(occupiedIds))
                },
                relations: [
                    'building',
                    'main_cost_center',
                    'cost_center',
                    'property_values',
                    'cost_currency',
                    'tenant'
                ]
            });
            logger.info(`Fetched available Apartments successfully`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching available Apartments. ${error}`);
            return [];
        }
    }
}