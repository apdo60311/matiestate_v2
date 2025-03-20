import { NextFunction, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { CustomRequest } from "../types/request.types";
import ResponseModel from "../types/response.types";
import { ContractService } from "../services/contract.service";
import { Contract } from "../entities/Contract.entity";
import { Installment } from "../entities/Installment.entity";
import { IContractBody, InstallmentBody } from "../types/contract.types";

@injectable()
export class ContractController {
    constructor(
        @inject(DI_TYPES.ContractService)
        private contractService: ContractService
    ) { }

    public create: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        IContractBody,
        unknown,
        any
    > = async (
        req: CustomRequest<
            unknown,
            ResponseModel<Record<string, any>>,
            IContractBody,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.contractService.createContractWithRelations(
                    req.body
                );

                return res.status(201).send({
                    success: true,
                    message: "Contract created successfully",
                    data: { id: result },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getAll: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            unknown,
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const contracts = await this.contractService.getAllContracts();
                return res.status(200).send({
                    success: true,
                    message: "Contracts retrieved successfully",
                    data: { contracts },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getById: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const contract = await this.contractService.getContractById(
                    req.params.id
                );
                if (!contract) {
                    return res.status(404).send({
                        success: false,
                        message: "Contract not found",
                    });
                }

                // Get related data
                const terms = await this.contractService.getContractTerms(req.params.id);
                const pictures = await this.contractService.getContractPictures(req.params.id);
                const commission = await this.contractService.getContractCommission(req.params.id);
                const cycle = await this.contractService.getContractCycle(req.params.id);
                const fees = await this.contractService.getContractFees(req.params.id);
                const otherFees = await this.contractService.getContractOtherFees(req.params.id);
                const termination = await this.contractService.getContractTermination(req.params.id);
                const installment = await this.contractService.getInstallmentByContractId(req.params.id);

                return res.status(200).send({
                    success: true,
                    message: "Contract retrieved successfully",
                    data: {
                        contract,
                        terms,
                        pictures,
                        commission,
                        cycle,
                        fees,
                        otherFees,
                        termination,
                        installment
                    },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getByBuildingId: RequestHandler<
        { buildingId: string },
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { buildingId: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const contracts = await this.contractService.getContractsByBuildingId(
                    req.params.buildingId
                );
                return res.status(200).send({
                    success: true,
                    message: "Contracts retrieved successfully",
                    data: { contracts },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public update: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        Partial<Contract>,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            Partial<Contract>,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.contractService.updateContract(
                    req.params.id,
                    req.body
                );
                return res.status(200).send({
                    success: result,
                    message: result
                        ? "Contract updated successfully"
                        : "Failed to update contract",
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
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
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.contractService.deleteContract(req.params.id);
                return res.status(200).send({
                    success: result,
                    message: result
                        ? "Contract deleted successfully"
                        : "Failed to delete contract",
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public createInstallment: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        InstallmentBody,
        unknown,
        any
    > = async (
        req: CustomRequest<
            unknown,
            ResponseModel<Record<string, any>>,
            InstallmentBody,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.contractService.createInstallment(req.body);

                return res.status(201).send({
                    success: !!result,
                    message: result
                        ? "Installment created successfully"
                        : "Failed to create installment",
                    data: result ? { id: result } : undefined,
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public updateInstallment: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        Partial<Installment>,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            Partial<Installment>,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.contractService.updateInstallment(
                    req.params.id,
                    req.body
                );
                return res.status(200).send({
                    success: result,
                    message: result
                        ? "Installment updated successfully"
                        : "Failed to update installment",
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getInstallment: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const installment = await this.contractService.getInstallmentById(req.params.id);
                if (!installment) {
                    return res.status(404).send({
                        success: false,
                        message: "Installment not found",
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: "Installment retrieved successfully",
                    data: { installment },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getInstallmentByContract: RequestHandler<
        { contractId: string },
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { contractId: string },
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const installment = await this.contractService.getInstallmentByContractId(req.params.contractId);
                if (!installment) {
                    return res.status(404).send({
                        success: false,
                        message: "Installment not found for this contract",
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: "Installment retrieved successfully",
                    data: { installment },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public renewContract: RequestHandler<
        { id: string },
        ResponseModel<Record<string, any>>,
        Partial<IContractBody>,
        unknown,
        any
    > = async (
        req: CustomRequest<
            { id: string },
            ResponseModel<Record<string, any>>,
            Partial<IContractBody>,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const result = await this.contractService.renewContract(
                    req.params.id,
                    req.body
                );
                return res.status(200).send({
                    success: !!result,
                    message: result
                        ? "Contract renewed successfully"
                        : "Failed to renew contract",
                    data: result ? { id: result } : undefined,
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getValidFlats: RequestHandler<
        unknown,
        ResponseModel<Record<string, any>>,
        unknown,
        unknown,
        any
    > = async (
        req: CustomRequest<
            unknown,
            ResponseModel<Record<string, any>>,
            unknown,
            unknown,
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const flats = await this.contractService.getValidFlats();
                return res.status(200).send({
                    success: true,
                    message: "Valid flats retrieved successfully",
                    data: { flats },
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };

    public getPropertiesByBuilding: RequestHandler<
        { buildingId: string },
        ResponseModel<Record<string, any>>,
        unknown,
        { onlyValid?: string },
        any
    > = async (
        req: CustomRequest<
            { buildingId: string },
            ResponseModel<Record<string, any>>,
            unknown,
            { onlyValid?: string },
            any
        >,
        res: Response<ResponseModel<Record<string, any>>>,
        next: NextFunction
    ): Promise<any> => {
            try {
                const onlyValid = req.query.onlyValid === 'true';
                const properties = await this.contractService.getPropertiesByBuildingId(
                    req.params.buildingId,
                    onlyValid
                );
                return res.status(200).send({
                    success: true,
                    message: "Properties retrieved successfully",
                    data: properties,
                });
            } catch (e: any) {
                return res.status(500).send({
                    success: false,
                    message: e?.message,
                });
            }
        };
}
