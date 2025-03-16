import { inject, injectable } from "inversify";
import { DI_TYPES } from "../di/di.types";
import { ContractRepository } from "../repositories/contract/contract.repository";
import { ContractTermsRepository } from "../repositories/contract/contract-terms.repository";
import { ContractPicturesRepository } from "../repositories/contract/contract-pictures.repository";
import { ContractCycleRepository } from "../repositories/contract/contract-cycle.repository";
import { ContractFeeRepository } from "../repositories/contract/contract-fee.repository";
import { ContractOtherFeesRepository } from "../repositories/contract/contract-other-fees.repository";
import { ContractTerminationRepository } from "../repositories/contract/contract-termination.repository";
import { Contract } from "../entities/Contract.entity";
import { ContractTerms } from "../entities/ContractTerms.entity";
import { ContractPictures } from "../entities/ContractPictures.entity";
import { ContractCommission } from "../entities/ContractComission.entity";
import { ContractCycle } from "../entities/ContractCycle.entity";
import { ContractFee } from "../entities/ContractFee.entity";
import { ContractOtherFees } from "../entities/ContractOtherFees.entity";
import { ContractTermination } from "../entities/ContractTermination.entity";
import { Installment } from "../entities/Installment.entity";
import { ContractStatus, IContractBody, IInstallmentBody } from "../types/contract.types";
import { logger } from "../utils/logger";
import { ApartmentRepository } from "../repositories/apartment/apartment.repository";
import { ShopRepository } from "../repositories/shop/shop.repository";
import { ParkingRepository } from "../repositories/parking/parking.repository";
import { BuildingsRepository } from "../repositories/buildings.repository";
import { ContractCommissionRepository } from "@/repositories/contract/contract-commision.repository";
import { InstallmentRepository } from "@/repositories/installment.repository";
import e from "express";

@injectable()
export class ContractService {
    constructor(
        @inject(DI_TYPES.ContractRepository)
        private contractRepository: ContractRepository,
        @inject(DI_TYPES.ContractTermsRepository)
        private contractTermsRepository: ContractTermsRepository,
        @inject(DI_TYPES.ContractPicturesRepository)
        private contractPicturesRepository: ContractPicturesRepository,
        @inject(DI_TYPES.ContractCommissionRepository)
        private contractCommissionRepository: ContractCommissionRepository,
        @inject(DI_TYPES.ContractCycleRepository)
        private contractCycleRepository: ContractCycleRepository,
        @inject(DI_TYPES.ContractFeeRepository)
        private contractFeeRepository: ContractFeeRepository,
        @inject(DI_TYPES.ContractOtherFeesRepository)
        private contractOtherFeesRepository: ContractOtherFeesRepository,
        @inject(DI_TYPES.ContractTerminationRepository)
        private contractTerminationRepository: ContractTerminationRepository,
        @inject(DI_TYPES.InstallmentRepository)
        private installmentRepository: InstallmentRepository,
        @inject(DI_TYPES.ApartmentRepository)
        private apartmentRepository: ApartmentRepository,
        @inject(DI_TYPES.ShopRepository)
        private shopRepository: ShopRepository,
        @inject(DI_TYPES.ParkingRepository)
        private parkingRepository: ParkingRepository,
        @inject(DI_TYPES.BuildingsRepository)
        private buildingsRepository: BuildingsRepository
    ) { }

    async createContract(data: Partial<Contract>): Promise<string | null> {
        return await this.contractRepository.createContract(data);
    }

    async createContractWithRelations(data: IContractBody): Promise<string | null> {
        try {
            const contractId = await this.createContract(data);
            if (!contractId) return null;

            let contractTermsPromise;
            let contractPicturesPromise;
            let contractCommissionPromise;
            let contractCyclePromise;
            let contractFeePromise;
            let contractOtherFeesPromise;
            let contractTerminationPromise;

            if (data.terms && data.terms.length > 0) {
                contractTermsPromise = this.contractTermsRepository.createMultipleTerms(contractId, data.terms);
            }

            if (data.pictures && data.pictures.length > 0) {
                contractPicturesPromise = this.contractPicturesRepository.createPictures(contractId, data.pictures);
            }

            if (data.commission) {
                data.commission.contract_id = contractId;
                contractCommissionPromise = this.contractCommissionRepository.createCommission(data.commission);
            }

            if (data.cycle) {
                data.cycle.contract_id = contractId;
                contractCyclePromise = this.contractCycleRepository.createCycle(data.cycle);
            }

            if (data.fees && data.fees.length > 0) {
                contractFeePromise = this.contractFeeRepository.createFees(contractId, data.fees);
            }

            if (data.other_fees && data.other_fees.length > 0) {
                contractOtherFeesPromise = this.contractOtherFeesRepository.createOtherFees(contractId, data.other_fees);
            }

            if (data.termination) {
                data.termination.contract_id = contractId;
                contractTerminationPromise = this.contractTerminationRepository.createTermination(data.termination);
            }

            const [termsRes, pictureRes, commisionRes, cycleRes, feesRes, otherFeesRes, terminationRes] = await Promise.all([
                contractTermsPromise,
                contractPicturesPromise,
                contractCommissionPromise,
                contractCyclePromise,
                contractFeePromise,
                contractOtherFeesPromise,
                contractTerminationPromise
            ]);

            logger.info(`Contract with ID ${contractId} created successfully.`);
            logger.info(`Terms created: ${termsRes}`);
            logger.info(`Pictures created: ${pictureRes}`);
            logger.info(`Commission created: ${commisionRes}`);
            logger.info(`Cycle created: ${cycleRes}`);
            logger.info(`Fees created: ${feesRes}`);
            logger.info(`Other fees created: ${otherFeesRes}`);
            logger.info(`Termination created: ${terminationRes}`);

            return contractId;
        } catch (error) {
            logger.error(`Error in createContractWithRelations: ${error}`);
            return null;
        }
    }


    async getContractWithRelations(contractId: string): Promise<IContractBody | null> {
        try {
            const contract = await this.contractRepository.getContractById(contractId);
            if (!contract) {
                logger.info(`Contract with ID ${contractId} not found.`);
                return null;
            }

            let contractTermsPromise = this.contractTermsRepository.getTermsByContractId(contractId);
            let contractPicturesPromise = this.contractPicturesRepository.getPicturesByContractId(contractId);
            let contractCommissionPromise = this.contractCommissionRepository.getCommissionByContractId(contractId);
            let contractCyclePromise = this.contractCycleRepository.getCycleByContractId(contractId);
            let contractFeesPromise = this.contractFeeRepository.getFeesByContractId(contractId);
            let contractOtherFeesPromise = this.contractOtherFeesRepository.getOtherFeesByContractId(contractId);
            let contractTerminationPromise = this.contractTerminationRepository.getTerminationByContractId(contractId);

            const [
                terms,
                pictures,
                commission,
                cycle,
                fees,
                otherFees,
                termination
            ] = await Promise.all([
                contractTermsPromise,
                contractPicturesPromise,
                contractCommissionPromise,
                contractCyclePromise,
                contractFeesPromise,
                contractOtherFeesPromise,
                contractTerminationPromise
            ]);

            const contractDetails: IContractBody = {
                ...contract,
                terms: terms || [],
                pictures: pictures!,
                commission: commission!,
                cycle: cycle!,
                fees: fees,
                other_fees: otherFees,
                termination: termination!
            };

            logger.info(`Contract details retrieved successfully for ID ${contractId}`);
            return contractDetails;

        } catch (error) {
            logger.error(`Error in getContractWithRelations: ${error}`);
            return null;
        }
    }


    async getContractById(id: string): Promise<Contract | null> {
        return await this.contractRepository.getContractById(id);
    }

    async getAllContracts(): Promise<Contract[]> {
        return await this.contractRepository.getAllContracts();
    }

    async getContractsByBuildingId(buildingId: string): Promise<Contract[]> {
        return await this.contractRepository.getContractsByBuildingId(buildingId);
    }

    async getActiveContracts(): Promise<Contract[]> {
        return await this.contractRepository.getActiveContracts();
    }

    async updateContract(id: string, data: Partial<Contract>): Promise<boolean> {
        return await this.contractRepository.updateContract(id, data);
    }

    async deleteContract(id: string): Promise<boolean> {
        return await this.contractRepository.deleteContract(id);
    }

    async getContractTerms(contractId: string): Promise<ContractTerms[]> {
        return await this.contractTermsRepository.getTermsByContractId(contractId);
    }

    async getContractPictures(contractId: string): Promise<ContractPictures[]> {
        return await this.contractPicturesRepository.getPicturesByContractId(contractId);
    }

    async getContractCommission(contractId: string): Promise<ContractCommission | null> {
        return await this.contractCommissionRepository.getCommissionByContractId(contractId);
    }

    async getContractCycle(contractId: string): Promise<ContractCycle | null> {
        return await this.contractCycleRepository.getCycleByContractId(contractId);
    }

    async getContractFees(contractId: string): Promise<ContractFee[]> {
        return await this.contractFeeRepository.getFeesByContractId(contractId);
    }

    async getContractOtherFees(contractId: string): Promise<ContractOtherFees[]> {
        return await this.contractOtherFeesRepository.getOtherFeesByContractId(contractId);
    }

    async getContractTermination(contractId: string): Promise<ContractTermination | null> {
        return await this.contractTerminationRepository.getTerminationByContractId(contractId);
    }

    async createInstallment(data: IInstallmentBody): Promise<string | null> {
        try {
            return await this.installmentRepository.createInstallment(data);
        } catch (error) {
            logger.error(`Error in createInstallment: ${error}`);
            return null;
        }
    }

    async getInstallmentById(id: string): Promise<Installment | null> {
        return await this.installmentRepository.getInstallmentById(id);
    }

    async getInstallmentByContractId(contractId: string): Promise<Installment | null> {
        return await this.installmentRepository.getInstallmentByContractId(contractId);
    }

    async updateInstallment(id: string, data: Partial<Installment>): Promise<boolean> {
        return await this.installmentRepository.updateInstallment(id, data);
    }

    async renewContract(contractId: string, newData: Partial<IContractBody>): Promise<string | null> {
        try {
            const existingContract = await this.getContractWithRelations(contractId);
            if (!existingContract) {
                logger.error(`Contract with id ${contractId} not found for renewal`);
                return null;
            }

            let newContractData: IContractBody = {
                ...existingContract,
                ...newData,
                id: undefined,
            };

            const newContractId = await this.createContractWithRelations(newContractData);

            if (newContractId) {
                await this.updateContract(contractId, { is_archived: true });
                logger.info(`Contract ${contractId} renewed successfully with new contract ID: ${newContractId}`);
            } else {
                throw new Error(`Error archiving contract with id ${contractId}`);
            }

            return newContractId;
        } catch (error) {
            logger.error(`Error in renewContract: ${error}`);
            return null;
        }
    }

    async getValidFlats(): Promise<any[]> {
        try {
            const activeContracts = await this.getActiveContracts();

            const occupiedApartmentIds = activeContracts
                .filter(contract => contract.apartment)
                .map(contract => contract.apartment?.id!);

            const availableApartments = await this.apartmentRepository.getAvailableApartments(occupiedApartmentIds);

            return availableApartments.map(apartment => ({
                id: apartment.id,
                type: 'apartment',
                number: apartment.apartment_no,
                building: apartment.building?.name,
                building_id: apartment.building?.id,
                floor: apartment.floor_no,
                area: apartment.area,
                cost_center: apartment.cost_center?.name
            }));
        } catch (error) {
            logger.error(`Error in getValidFlats: ${error}`);
            return [];
        }
    }

    async getValidProperties(): Promise<any[]> {
        try {
            const activeContracts = await this.getActiveContracts();

            const occupiedApartmentIds = activeContracts
                .filter(contract => contract.apartment)
                .map(contract => contract.apartment?.id!);

            const occupiedShopIds = activeContracts
                .filter(contract => contract.shop)
                .map(contract => contract.shop?.id!);

            const occupiedParkingIds = activeContracts
                .filter(contract => contract.parking)
                .map(contract => contract.parking?.id!);

            const availableApartments = await this.apartmentRepository.getAvailableApartments(occupiedApartmentIds);

            const availableShops = await this.shopRepository.getAvailableShops(occupiedShopIds);

            const availableParkings = await this.parkingRepository.getAvailableParkings(occupiedParkingIds);

            const formattedApartments = availableApartments.map(apartment => ({
                id: apartment.id,
                type: 'apartment',
                number: apartment.apartment_no,
                building: apartment.building?.name,
                building_id: apartment.building?.id,
                floor: apartment.floor_no,
                area: apartment.area,
                cost_center: apartment.cost_center?.name
            }));

            const formattedShops = availableShops.map(shop => ({
                id: shop.id,
                type: 'shop',
                number: shop.shop_no,
                building: shop.building?.name,
                building_id: shop.building?.id,
                area: shop.area,
                cost_center: shop.cost_center?.name
            }));

            const formattedParkings = availableParkings.map(parking => ({
                id: parking.id,
                type: 'parking',
                number: parking.parking_no,
                building: parking.building?.name,
                building_id: parking.building?.id,
                cost_center: parking.cost_center?.name
            }));

            return [...formattedApartments, ...formattedShops, ...formattedParkings];
        } catch (error) {
            logger.error(`Error in getValidProperties: ${error}`);
            return [];
        }
    }


    async getPropertiesByBuildingId(buildingId: string, onlyValid: boolean = false): Promise<any> {
        try {
            let occupiedApartmentIds: string[] = [];
            let occupiedShopIds: string[] = [];
            let occupiedParkingIds: string[] = [];

            if (onlyValid) {
                const activeContracts = await this.getActiveContracts();

                occupiedApartmentIds = activeContracts
                    .filter(contract => contract.apartment)
                    .map(contract => contract.apartment?.id || '');

                occupiedShopIds = activeContracts
                    .filter(contract => contract.shop)
                    .map(contract => contract.shop?.id || '');

                occupiedParkingIds = activeContracts
                    .filter(contract => contract.parking)
                    .map(contract => contract.parking?.id || '');
            }

            // Get properties for the specified building
            const apartments = await this.apartmentRepository.getApartmentsByBuildingId(buildingId);
            const shops = await this.shopRepository.getShopsByBuildingId(buildingId);
            const parkings = await this.parkingRepository.getParkingsByBuildingId(buildingId);

            // Filter out occupied properties if onlyValid is true
            const filteredApartments = onlyValid
                ? apartments.filter(apt => !occupiedApartmentIds.includes(apt.id) && !apt.blocked)
                : apartments;

            const filteredShops = onlyValid
                ? shops.filter(shop => !occupiedShopIds.includes(shop.id))
                : shops;

            const filteredParkings = onlyValid
                ? parkings.filter(parking => !occupiedParkingIds.includes(parking.id))
                : parkings;

            const formattedApartments = filteredApartments.map(apartment => ({
                id: apartment.id,
                type: 'apartment',
                number: apartment.apartment_no,
                floor: apartment.floor_no,
                area: apartment.area,
                cost_center: apartment.cost_center?.name
            }));

            const formattedShops = filteredShops.map(shop => ({
                id: shop.id,
                type: 'shop',
                number: shop.shop_no,
                area: shop.area,
                cost_center: shop.cost_center?.name
            }));

            const formattedParkings = filteredParkings.map(parking => ({
                id: parking.id,
                type: 'parking',
                number: parking.parking_no,
                cost_center: parking.cost_center?.name
            }));

            return {
                apartments: formattedApartments,
                shops: formattedShops,
                parkings: formattedParkings
            };
        } catch (error) {
            logger.error(`Error in getPropertiesByBuildingId: ${error}`);
            return {
                apartments: [],
                shops: [],
                parkings: []
            };
        }
    }
}
