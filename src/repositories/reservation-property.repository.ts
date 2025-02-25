import { logger } from "../utils/logger";
import { DI_TYPES } from "../di/di.types";
import { ReservationProperty } from "../entities/ReservationProperty.entity";
import { inject } from "inversify";
import { DataSource, Repository } from "typeorm";

export class ReservationPropertyRepository extends Repository<ReservationProperty> {
    constructor(@inject(DI_TYPES.DataSource) datasource:DataSource) {
        super(ReservationProperty, datasource.createEntityManager());
    }

    createReservationProperty = async (reservationProperty: Partial<ReservationProperty>): Promise<string | null> => {
        try {
            const result = await this.save(reservationProperty);
            logger.info(`Reservation Property Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Reservation Property. ${error}`);
            return null;
        }
    }

    getAllReservationProperties = async (): Promise<ReservationProperty[] | null> => {
        try {
            const result = await this.find();
            logger.info(`Fetched all Reservation Properties successfully`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Reservation Properties. ${error}`);
            return null;
        }
    }

    getReservationPropertyById = async (id: string): Promise<ReservationProperty | null> => {
        try {
            const result = await this.findOneBy({ id });
            logger.info(`Fetched Reservation Property with id: ${id} successfully`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Reservation Property with id: ${id}. ${error}`);
            return null;
        }
    }

}