import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { ReservationPropertyService } from "../services/reservation-property.service";
import { ReservationProperty } from "../entities/ReservationProperty.entity";

@injectable()
export class ReservationPropertyController {
    constructor(
        @inject(DI_TYPES.ReservationPropertyService) 
        private reservationPropertyService: ReservationPropertyService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        Partial<ReservationProperty>,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<Record<string, any>>, any, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.reservationPropertyService.createReservationProperty(req.body);
            
            return res.status(201).send({
                success: true,
                message: 'Reservation property created successfully',
                data: { id: result }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getAll: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        any,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<Record<string, any>>, any, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const properties = await this.reservationPropertyService.getAllReservationProperties();
            
            if (properties && properties.length > 0)  {
                return res.status(200).send({
                    success: true,
                    message: 'Reservation properties retrieved successfully',
                    data: { properties }
                });
                
            } 
            return res.status(404).send({
                success: true,
                message: 'No reservation properties found',
                data: { properties: [] }
            });
            

        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getById: RequestHandler<
        {id: string},
        ResponseModel<Record<string, any>>,
        any,
        unknown,
        any
    > = async (
        req: CustomRequest<{id: string}, ResponseModel<Record<string, any>>, any, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const property = await this.reservationPropertyService.getReservationPropertyById(req.params.id);
            
            if (!property) {
                return res.status(404).send({
                    success: false,
                    message: 'Reservation property not found'
                });
            }

            return res.status(200).send({
                success: true,
                message: 'Reservation property retrieved successfully',
                data: { property }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };
}