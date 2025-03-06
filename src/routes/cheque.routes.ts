import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { ChequeController } from "../controllers/cheque.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";
import {
  CreateChequeRequestDto,
  UpdateChequeRequestDto,
} from "../dtos/create-cheque.dto";

const router = express.Router();

(async () => {
  const chequeController = await container.getAsync<ChequeController>(
    DI_TYPES.ChequeController
  );

  /**
   * @openapi
   * components:
   *   schemas:
   *     ChequeMainDataDto:
   *       type: object
   *       required:
   *         - type
   *       properties:
   *         number:
   *           type: number
   *         type:
   *           type: number
   *         currencyId:
   *           type: string
   *           format: uuid
   *         sellerId:
   *           type: string
   *           format: uuid
   *         accountId:
   *           type: string
   *           format: uuid
   *         patternId:
   *           type: string
   *           format: uuid
   *         tenantId:
   *           type: string
   *           format: uuid
   *         note:
   *           type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         code:
   *           type: number
   *         amount:
   *           type: number
   *           minimum: 0
   *         currencyVal:
   *           type: number
   *         beneficiaryName:
   *           type: string
   *         costCenterId:
   *           type: string
   *           format: uuid
   *         bankId:
   *           type: string
   *           format: uuid
   *         installmentId:
   *           type: string
   *           format: uuid
   *         apartmentId:
   *           type: string
   *           format: uuid
   *         shopId:
   *           type: string
   *           format: uuid
   *         parkingId:
   *           type: string
   *           format: uuid
   *
   *     CreateChequeRequestDto:
   *       type: object
   *       required:
   *         - mainData
   *       properties:
   *         mainData:
   *           $ref: '#/components/schemas/ChequeMainDataDto'
   *
   *     UpdateChequeRequestDto:
   *       type: object
   *       required:
   *         - mainData
   *       properties:
   *         mainData:
   *           $ref: '#/components/schemas/ChequeMainDataDto'
   */

  /**
   * @openapi
   * /cheques:
   *   post:
   *     summary: Create a new cheque
   *     tags: [Cheques]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateChequeRequestDto'
   *     responses:
   *       201:
   *         description: Cheque created successfully
   *       500:
   *         description: Server error
   */
  router.post(
    "/",
    validateDto(CreateChequeRequestDto),
    chequeController.create
  );

  /**
   * @openapi
   * /cheques/{id}:
   *   get:
   *     summary: Get cheque by ID
   *     tags: [Cheques]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Cheque details
   *       404:
   *         description: Cheque not found
   *       500:
   *         description: Server error
   */
  router.get("/:id", chequeController.getById);

  /**
   * @openapi
   * /cheques:
   *   get:
   *     summary: Get all cheques
   *     tags: [Cheques]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: All cheques details
   *       404:
   *         description: Cheques not found
   *       500:
   *         description: Server error
   */
  router.get("/", chequeController.getAll);

  /**
   * @openapi
   * /cheques/{id}:
   *   put:
   *     summary: Update cheque by ID
   *     tags: [Cheques]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateChequeRequestDto'
   *     responses:
   *       200:
   *         description: Cheque updated successfully
   *       500:
   *         description: Server error
   */
  router.put(
    "/:id",
    validateDto(UpdateChequeRequestDto),
    chequeController.update
  );
})();

export default router;
