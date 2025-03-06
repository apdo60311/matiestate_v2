import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { PatternController } from "../controllers/pattern.controller";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";
import { validateDto } from "../middlewares/validation.middleware";
import {
  CreateAccountingVoucherPatternDto,
  CreateBillPatternDto,
  CreateChequePatternDto,
  CreateContractPatternDto,
  CreateVoucherPatternDto,
} from "../dtos/create-patterns.dto";

const router = express.Router();

(async () => {
  const patternController = await container.getAsync<PatternController>(
    DI_TYPES.PatternController
  );

  /**
 * @openapi
 * components:
 *   schemas:
 *     AccountingVoucherPattern:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_account_id:
 *           type: string
 *           format: uuid
 *     
 *     VoucherPattern:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_account_id:
 *           type: string
 *           format: uuid
 *     
 *     BillPattern:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_store_id:
 *           type: string
 *           format: uuid
 *         cost_center_id:
 *           type: string
 *           format: uuid
 *         material_account_id:
 *           type: string
 *           format: uuid
 *         currency_id:
 *           type: string
 *           format: uuid
 *     
 *     ContractPattern:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *     
 *     ChequePattern:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_account_id:
 *           type: string
 *           format: uuid
 */
  /**
   * @openapi
   * /patterns/cheque:
   *   post:
   *     summary: Create a new cheque pattern
   *     tags: [Patterns]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ChequePattern'
   *     responses:
   *       201:
   *         description: Cheque pattern created successfully
   *       500:
   *         description: Server error
   */
  router.post(
    "/cheque",
    validateDto(CreateChequePatternDto),
    patternController.createChequePattern
  );

  /**
   * @openapi
   * /patterns/cheque/{id}:
   *   get:
   *     summary: Get cheque pattern by ID
   *     tags: [Patterns]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Cheque pattern retrieved successfully
   *       404:
   *         description: Pattern not found
   */
  router.get("/cheque/:id", patternController.getChequePatternById);

  
  /**
   * @openapi
   * /patterns/cheque:
   *   get:
   *     summary: Get all cheque patterns
   *     tags: [Patterns]
   *     responses:
   *       200:
   *         description: Cheque patterns retrieved successfully
   *       500:
   *         description: Server error
   */
  router.get("/cheque", patternController.getAllChequePatterns);


  /**
   * @openapi
   * /patterns/contract:
   *   post:
   *     summary: Create a new contract pattern
   *     tags: [Patterns]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ContractPattern'
   *     responses:
   *       201:
   *         description: Contract pattern created successfully
   *       500:
   *         description: Server error
   */
  router.post(
    "/contract",
    validateDto(CreateContractPatternDto),
    patternController.createContractPattern
  );

  /**
   * @openapi
   * /patterns/contract/{id}:
   *   get:
   *     summary: Get contract pattern by ID
   *     tags: [Patterns]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Contract pattern retrieved successfully
   *       404:
   *         description: Pattern not found
   */
  router.get("/contract/:id", patternController.getContractPatternById);


  /**
   * @openapi
   * /patterns/contract:
   *   get:
   *     summary: Get all contract patterns
   *     tags: [Patterns]
   *     responses:
   *       200:
   *         description: Contract patterns retrieved successfully
   *       500:
   *         description: Server error
   */
  router.get("/contract", patternController.getAllContractPatterns);

  /**
   * @openapi
   * /patterns/bill:
   *   post:
   *     summary: Create a new bill pattern
   *     tags: [Patterns]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BillPattern'
   *     responses:
   *       201:
   *         description: Bill pattern created successfully
   *       500:
   *         description: Server error
   */
  router.post(
    "/bill",
    validateDto(CreateBillPatternDto),
    patternController.createBillPattern
  );

  /**
   * @openapi
   * /patterns/bill/{id}:
   *   get:
   *     summary: Get bill pattern by ID
   *     tags: [Patterns]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Bill pattern retrieved successfully
   *       404:
   *         description: Pattern not found
   */
  router.get("/bill/:id", patternController.getBillPatternById);


  /**
   * @openapi
   * /patterns/bill:
   *   get:
   *     summary: Get all bill patterns
   *     tags: [Patterns]
   *     responses:
   *       200:
   *         description: Bill patterns retrieved successfully
   *       500:
   *         description: Server error
   */
  router.get("/bill", patternController.getAllBillPatterns);

  /**
   * @openapi
   * /patterns/voucher:
   *   post:
   *     summary: Create a new voucher pattern
   *     tags: [Patterns]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/VoucherPattern'
   *     responses:
   *       201:
   *         description: Voucher pattern created successfully
   *       500:
   *         description: Server error
   */
  router.post(
    "/voucher",
    validateDto(CreateVoucherPatternDto),
    patternController.createVoucherPattern
  );

  /**
   * @openapi
   * /patterns/voucher/{id}:
   *   get:
   *     summary: Get voucher pattern by ID
   *     tags: [Patterns]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Voucher pattern retrieved successfully
   *       404:
   *         description: Pattern not found
   */
  router.get("/voucher/:id", patternController.getVoucherPatternById);


  /**
   * @openapi
   * /patterns/voucher:
   *   get:
   *     summary: Get all voucher patterns
   *     tags: [Patterns]
   *     responses:
   *       200:
   *         description: Voucher patterns retrieved successfully
   *       500:
   *         description: Server error
   */
  router.get("/voucher", patternController.getAllVoucherPatterns);


  /**
   * @openapi
   * /patterns/accounting-voucher:
   *   post:
   *     summary: Create a new accounting voucher pattern
   *     tags: [Patterns]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AccountingVoucherPattern'
   *     responses:
   *       201:
   *         description: Accounting voucher pattern created successfully
   *       500:
   *         description: Server error
   */
  router.post(
    "/accounting-voucher",
    validateDto(CreateAccountingVoucherPatternDto),
    patternController.createAccountingVoucherPattern
  );

  /**
   * @openapi
   * /patterns/accounting-voucher/{id}:
   *   get:
   *     summary: Get accounting voucher pattern by ID
   *     tags: [Patterns]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Accounting voucher pattern retrieved successfully
   *       404:
   *         description: Pattern not found
   */
  router.get(
    "/accounting-voucher/:id",
    patternController.getAccountingVoucherPatternById
  );

  /**
   * @openapi
   * /patterns/accounting-voucher:
   *   get:
   *     summary: Get all accounting voucher patterns
   *     tags: [Patterns]
   *     responses:
   *       200:
   *         description: Accounting voucher patterns retrieved successfully
   *       500:
   *         description: Server error
   */
  router.get("/accounting-voucher", patternController.getAllAccountingVoucherPatterns);
})();

export default router;
