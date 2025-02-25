import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { ReservationProperty } from "../entities/ReservationProperty.entity";
import { ReservationPropertyRepository } from "../repositories/reservation-property.repository";

@injectable()
export class ReservationPropertyService {
    constructor(
        @inject(DI_TYPES.ReservationPropertyRepository) 
        private reservationPropertyRepository: ReservationPropertyRepository
    ) {}

    async createReservationProperty(data: Partial<ReservationProperty>): Promise<string | null> {
        if (!data.book_date) {
            data.book_date = new Date(new Date().getTime());
        }
        return await this.reservationPropertyRepository.createReservationProperty(data);
    }

    async getAllReservationProperties(): Promise<ReservationProperty[] | null> {
        return await this.reservationPropertyRepository.getAllReservationProperties();
    }

    async getReservationPropertyById(id: string): Promise<ReservationProperty | null> {
        return await this.reservationPropertyRepository.getReservationPropertyById(id);
    }
}