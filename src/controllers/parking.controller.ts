import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { ParkingService } from "../services/parking.service";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { IParkingBody } from "../types/parking.types";
import { Parking } from "../entities/Parking.entity";

@injectable()
export class ParkingController {
    constructor(
        @inject(DI_TYPES.ParkingService)
        private parkingService: ParkingService
    ) {}

    public create: RequestHandler<
        unknown,
        ResponseModel<{ id: string }>,
        IParkingBody, 
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ id: string }>, IParkingBody, unknown, any>,
        res: Response<ResponseModel<{ id: string }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const parkingId = await this.parkingService.createParking(req.body);
            if (!parkingId) {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create parking"
                });
            }
            return res.status(201).send({
                success: true,
                message: "Parking created successfully",
                data: { id: parkingId }
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
        ResponseModel<{ parkings: Parking[] }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<unknown, ResponseModel<{ parkings: Parking[] }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ parkings: Parking[] }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const parkings = await this.parkingService.getAllParkings();
            return res.status(200).send({
                success: true,
                message: "Parkings retrieved successfully",
                data: { parkings }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public getById: RequestHandler<
        { id: string },
        ResponseModel<{ parking: Parking }>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<{ parking: Parking }>, unknown, unknown, any>,
        res: Response<ResponseModel<{ parking: Parking }>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const parking = await this.parkingService.getParkingById(req.params.id);
            if (!parking) {
                return res.status(404).send({
                    success: false,
                    message: "Parking not found"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Parking retrieved successfully",
                data: { parking }
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public update: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        Partial<Parking>,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, Partial<Parking>, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.parkingService.updateParking(req.params.id, req.body);
            return res.status(200).send({
                success: result,
                message: result ? "Parking updated successfully" : "Failed to update parking"
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };

    public delete: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<{ id: string }, ResponseModel<Record<string, any>>, unknown, unknown, any>,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = await this.parkingService.deleteParking(req.params.id);
            return res.status(200).send({
                success: result,
                message: result ? "Parking deleted successfully" : "Failed to delete parking"
            });
        } catch (e: any) {
            return res.status(500).send({
                success: false,
                message: e?.message
            });
        }
    };
}