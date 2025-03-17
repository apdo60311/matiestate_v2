import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { ContractController } from "../controllers/contract.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateContractDto } from "../dtos/create-contract.dto";
import { CreateInstallmentDto } from "../dtos/create-installment.dto";

const router = express.Router();

(async () => {
    const contractController = await container.getAsync<ContractController>(
        DI_TYPES.ContractController
    );

    /**
     * @openapi
     * components:
     *   schemas:
     *     CreateContractDto:
     *       type: object
     *       required:
     *         - contract_type
     *         - flat_type
     *         - code
     *         - final_price
     *         - revenue_account_id
     *         - client_id
     *         - paid_type
     *         - contract_value
     *         - contract_pattern_id
     *       properties:
     *         contract_type:
     *           type: number
     *           description: Type of contract
     *         flat_type:
     *           type: number
     *           description: Type of flat
     *         code:
     *           type: number
     *           description: Contract code
     *         final_price:
     *           type: number
     *           description: Final price of the contract
     *         revenue_account_id:
     *           type: string
     *           format: uuid
     *           description: ID of the revenue account
     *         client_id:
     *           type: string
     *           format: uuid
     *           description: ID of the client
     *         paid_type:
     *           type: number
     *           description: Payment type
     *         contract_value:
     *           type: number
     *           description: Value of the contract
     *         contract_pattern_id:
     *           type: string
     *           format: uuid
     *           description: ID of the contract pattern
     *         building_id:
     *           type: string
     *           format: uuid
     *           description: ID of the building
     *         apartment_id:
     *           type: string
     *           format: uuid
     *           description: ID of the apartment
     *         shop_id:
     *           type: string
     *           format: uuid
     *           description: ID of the shop
     *         parking_id:
     *           type: string
     *           format: uuid
     *           description: ID of the parking
     *         start_duration_date:
     *           type: string
     *           format: date
     *           description: Start date of the contract
     *         end_duration_date:
     *           type: string
     *           format: date
     *           description: End date of the contract
     *         terms:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/ContractTermsDto'
     *         pictures:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/ContractPicturesDto'
     *         commission:
     *           $ref: '#/components/schemas/ContractCommissionDto'
     *         cycle:
     *           $ref: '#/components/schemas/ContractCycleDto'
     *         fees:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/ContractFeeDto'
     *         other_fees:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/ContractOtherFeesDto'
     *         termination:
     *           $ref: '#/components/schemas/ContractTerminationDto'
     *     
     *     ContractTermsDto:
     *       type: object
     *       required:
     *         - contract_terms
     *       properties:
     *         contract_terms:
     *           type: string
     *         tenant_id:
     *           type: string
     *           format: uuid
     *     
     *     ContractPicturesDto:
     *       type: object
     *       required:
     *         - picture
     *       properties:
     *         picture:
     *           type: string
     *         tenant_id:
     *           type: string
     *           format: uuid
     *     
     *     ContractCommissionDto:
     *       type: object
     *       properties:
     *         commission_percentage:
     *           type: number
     *         commission_value:
     *           type: number
     *         commission_account_id:
     *           type: string
     *           format: uuid
     *         commission_note:
     *           type: string
     *         gen_entries:
     *           type: boolean
     *     
     *     ContractCycleDto:
     *       type: object
     *       properties:
     *         contract_documented:
     *           type: boolean
     *         contract_certifying:
     *           type: boolean
     *         contract_received:
     *           type: boolean
     *         contract_delivered:
     *           type: boolean
     *         contract_signed:
     *           type: boolean
     *     
     *     ContractFeeDto:
     *       type: object
     *       properties:
     *         date:
     *           type: string
     *           format: date
     *         account_id:
     *           type: string
     *           format: uuid
     *         value:
     *           type: number
     *         create_entry:
     *           type: boolean
     *         note:
     *           type: string
     *     
     *     ContractOtherFeesDto:
     *       type: object
     *       properties:
     *         date:
     *           type: string
     *           format: date
     *         fee_amount:
     *           type: number
     *         account_id:
     *           type: string
     *           format: uuid
     *         notes:
     *           type: string
     *     
     *     ContractTerminationDto:
     *       type: object
     *       required:
     *         - revenue_account_id
     *       properties:
     *         termination_date:
     *           type: string
     *           format: date
     *         owner_total_amount:
     *           type: number
     *         revenue_account_id:
     *           type: string
     *           format: uuid
     *         terminated:
     *           type: boolean
     *         gen_entries:
     *           type: boolean
     *     
     *     CreateInstallmentDto:
     *       type: object
     *       required:
     *         - contract_id
     *         - total_amount
     *         - first_batch
     *         - currency_id
     *         - rest_amount
     *         - installments_numbers
     *         - each_number
     *         - each_duration
     *         - first_installment_date
     *       properties:
     *         contract_id:
     *           type: string
     *           format: uuid
     *         total_amount:
     *           type: number
     *         gen_entries_type:
     *           type: number
     *           default: 1
     *         first_batch:
     *           type: number
     *         payment_date:
     *           type: string
     *           format: date
     *         currency_id:
     *           type: string
     *           format: uuid
     *         currency_val:
     *           type: number
     *         rest_amount:
     *           type: number
     *         bank_id:
     *           type: string
     *           format: uuid
     *         installments_numbers:
     *           type: number
     *         each_number:
     *           type: number
     *         each_duration:
     *           type: number
     *         first_installment_date:
     *           type: string
     *           format: date
     *         begin_number:
     *           type: number
     *         beneficiary_name:
     *           type: string
     *         tenant_id:
     *           type: string
     *           format: uuid
     */

    /**
     * @openapi
     * /contracts:
     *   post:
     *     summary: Create a new contract with related entities
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateContractDto'
     *     responses:
     *       201:
     *         description: Contract created successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateContractDto), contractController.create);

    /**
     * @openapi
     * /contracts:
     *   get:
     *     summary: Get all contracts
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of contracts
     *       500:
     *         description: Server error
     */
    router.get("/", contractController.getAll);

    /**
     * @openapi
     * /contracts/{id}:
     *   get:
     *     summary: Get a contract by ID with all related data
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Contract ID
     *     responses:
     *       200:
     *         description: Contract details with related data
     *       404:
     *         description: Contract not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", contractController.getById);

    /**
     * @openapi
     * /contracts/building/{buildingId}:
     *   get:
     *     summary: Get contracts by building ID
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: buildingId
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Building ID
     *     responses:
     *       200:
     *         description: List of contracts in the building
     *       500:
     *         description: Server error
     */
    router.get("/building/:buildingId", contractController.getByBuildingId);

    /**
     * @openapi
     * /contracts/{id}:
     *   put:
     *     summary: Update a contract
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Contract ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateContractDto'
     *     responses:
     *       200:
     *         description: Contract updated successfully
     *       404:
     *         description: Contract not found
     *       500:
     *         description: Server error
     */
    router.put("/:id", contractController.update);

    /**
     * @openapi
     * /contracts/{id}:
     *   delete:
     *     summary: Delete a contract
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Contract ID
     *     responses:
     *       200:
     *         description: Contract deleted successfully
     *       404:
     *         description: Contract not found
     *       500:
     *         description: Server error
     */
    router.delete("/:id", contractController.delete);

    /**
     * @openapi
     * /contracts/{id}/renew:
     *   post:
     *     summary: Renew a contract
     *     tags: [Contracts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Contract ID to renew
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateContractDto'
     *     responses:
     *       200:
     *         description: Contract renewed successfully
     *       404:
     *         description: Contract not found
     *       500:
     *         description: Server error
     */
    router.post("/:id/renew", contractController.renewContract);

    /**
     * @openapi
     * /contracts/installment:
     *   post:
     *     summary: Create a new installment plan for a contract
     *     tags: [Contracts, Installments]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateInstallmentDto'
     *     responses:
     *       201:
     *         description: Installment created successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.post("/installment", validateDto(CreateInstallmentDto), contractController.createInstallment);

    /**
     * @openapi
     * /contracts/installment/{id}:
     *   get:
     *     summary: Get an installment by ID
     *     tags: [Contracts, Installments]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Installment ID
     *     responses:
     *       200:
     *         description: Installment details
     *       404:
     *         description: Installment not found
     *       500:
     *         description: Server error
     */
    router.get("/installment/:id", contractController.getInstallment);

    /**
     * @openapi
     * /contracts/contract/{contractId}/installment:
     *   get:
     *     summary: Get installment by contract ID
     *     tags: [Contracts, Installments]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: contractId
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Contract ID
     *     responses:
     *       200:
     *         description: Installment details for the contract
     *       404:
     *         description: Installment
     *       404:
     *         description: Installment not found for this contract
     *       500:
     *         description: Server error
     */
    router.get("/contract/:contractId/installment", contractController.getInstallmentByContract);

    /**
     * @openapi
     * /contracts/installment/{id}:
     *   put:
     *     summary: Update an installment
     *     tags: [Contracts, Installments]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Installment ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateInstallmentDto'
     *     responses:
     *       200:
     *         description: Installment updated successfully
     *       404:
     *         description: Installment not found
     *       500:
     *         description: Server error
     */
    router.put("/installment/:id", contractController.updateInstallment);

    /**
     * @openapi
     * /contracts/valid-flats:
     *   get:
     *     summary: Get all available flats that can be contracted
     *     tags: [Contracts, Properties]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of available flats
     *       500:
     *         description: Server error
     */
    router.get("/valid-flats", contractController.getValidFlats);

    /**
     * @openapi
     * /contracts/building/{buildingId}/properties:
     *   get:
     *     summary: Get all properties in a building
     *     tags: [Contracts, Properties]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: buildingId
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Building ID
     *       - in: query
     *         name: onlyValid
     *         schema:
     *           type: string
     *           enum: ['true', 'false']
     *         description: If true, returns only properties that are not in active contracts
     *     responses:
     *       200:
     *         description: List of properties in the building
     *       500:
     *         description: Server error
     */
    router.get("/building/:buildingId/properties", contractController.getPropertiesByBuilding);
})();

export default router;
