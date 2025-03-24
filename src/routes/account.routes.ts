import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { AccountController } from "../controllers/account.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateAccountDto, CreateAccountAssemblyDto, CreateAccountDistributiveDto } from "../dtos/create/account.dtos";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAccountDto:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         code:
 *           type: number
 *         name:
 *           type: string
 *           minLength: 1
 *         type:
 *           type: number
 *           enum: [1, 2, 3, 4]
 *           description: "1: Normal, 2: Closing, 3: Assembly, 4: Distributive"
 *         parent_id:
 *           type: string
 *           format: uuid
 *         balance:
 *           type: number
 *         tenantId:
 *           type: string
 *           format: uuid
 *         isActive:
 *           type: boolean
 *           default: true
 *     
 *     CreateAccountAssemblyDto:
 *       type: object
 *       required:
 *         - accountId
 *       properties:
 *         accountId:
 *           type: string
 *           format: uuid
 *         code:
 *           type: number
 *         percentage:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *         note:
 *           type: string
 *         tenantId:
 *           type: string
 *           format: uuid
 *     
 *     CreateAccountDistributiveDto:
 *       type: object
 *       required:
 *         - accountId
 *       properties:
 *         accountId:
 *           type: string
 *           format: uuid
 *         code:
 *           type: number
 *         percentage:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *         note:
 *           type: string
 *         tenantId:
 *           type: string
 *           format: uuid
 *     
 *     Account:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         code:
 *           type: number
 *         name:
 *           type: string
 *         type:
 *           type: number
 *         parent_id:
 *           type: string
 *           format: uuid
 *         balance:
 *           type: number
 *         tenantId:
 *           type: string
 *           format: uuid
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     AccountResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             account:
 *               $ref: '#/components/schemas/Account'
 *     
 *     AccountsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             accounts:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *     
 *     AccountAssembly:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         accountId:
 *           type: string
 *           format: uuid
 *         code:
 *           type: number
 *         percentage:
 *           type: number
 *         note:
 *           type: string
 *         tenantId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         account:
 *           $ref: '#/components/schemas/Account'
 *     
 *     AccountAssemblyResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             assembly:
 *               $ref: '#/components/schemas/AccountAssembly'
 *     
 *     AccountDistributive:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         accountId:
 *           type: string
 *           format: uuid
 *         code:
 *           type: number
 *         percentage:
 *           type: number
 *         note:
 *           type: string
 *         tenantId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         account:
 *           $ref: '#/components/schemas/Account'
 *     
 *     AccountDistributiveResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             distributive:
 *               $ref: '#/components/schemas/AccountDistributive'
 */
(async () => {
    const accountController = await container.getAsync<AccountController>(
        DI_TYPES.AccountController
    );

    /**
     * @openapi
     * /accounts:
     *   post:
     *     summary: Create a new account
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateAccountDto'
     *     responses:
     *       201:
     *         description: Account created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", auth, validateDto(CreateAccountDto), accountController.createAccount);

    /**
     * @openapi
     * /accounts:
     *   get:
     *     summary: Get all accounts
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Accounts retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 data:
     *                   type: object
     *                   properties:
     *                     accounts:
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/Account'
     *       500:
     *         description: Server error
     */
    router.get("/", auth, accountController.getAccounts);

    /**
     * @openapi
     * /accounts/customers:
     *   get:
     *     summary: Get customer accounts
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Customer accounts retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AccountsResponse'
     *       500:
     *         description: Server error
     */
    router.get("/customers", auth, accountController.getCustomerAccounts);

    /**
     * @openapi
     * /accounts/suppliers:
     *   get:
     *     summary: Get supplier accounts
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Supplier accounts retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AccountsResponse'
     *       500:
     *         description: Server error
     */
    router.get("/suppliers", auth, accountController.getSupplierAccounts);

    /**
     * @openapi
     * /accounts/{id}:
     *   get:
     *     summary: Get account by ID
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Account ID
     *     responses:
     *       200:
     *         description: Account retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AccountResponse'
     *       404:
     *         description: Account not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", auth, accountController.getAccountById);

    /**
     * @openapi
     * /accounts/assembly:
     *   post:
     *     summary: Create a new account assembly
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateAccountAssemblyDto'
     *     responses:
     *       201:
     *         description: Account assembly created successfully
     *       500:
     *         description: Server error
     */
    router.post("/assembly", auth, validateDto(CreateAccountAssemblyDto), accountController.createAccountAssembly);

    /**
     * @openapi
     * /accounts/assembly/{id}:
     *   get:
     *     summary: Get account assembly by ID
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Assembly ID
     *     responses:
     *       200:
     *         description: Account assembly retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AccountAssemblyResponse'
     *       404:
     *         description: Account assembly not found
     *       500:
     *         description: Server error
     */
    router.get("/assembly/:id", auth, accountController.getAccountAssemblyById);

    /**
     * @openapi
     * /accounts/distributive:
     *   post:
     *     summary: Create a new account distributive
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateAccountDistributiveDto'
     *     responses:
     *       201:
     *         description: Account distributive created successfully
     *       500:
     *         description: Server error
     */
    router.post("/distributive", auth, validateDto(CreateAccountDistributiveDto), accountController.createAccountDistributive);

    /**
     * @openapi
     * /accounts/distributive/{id}:
     *   get:
     *     summary: Get account distributive by ID
     *     tags: [Accounts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Distributive ID
     *     responses:
     *       200:
     *         description: Account distributive retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AccountDistributiveResponse'
     *       404:
     *         description: Account distributive not found
     *       500:
     *         description: Server error
     */
    router.get("/distributive/:id", auth, accountController.getAccountDistributiveById);
})();

export default router;