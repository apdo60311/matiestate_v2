import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { validateDto } from "../middlewares/validation.middleware";
import { CurrencyController } from "../controllers/currency.controller";
import { CreateCurrencyDto } from "../dtos/create/currency.dtos";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

/**
 * @Swagger
 * tags:
 *   name: Currencies
 *   description: API endpoints for managing currencies
 */
(async () => {
  const currencyController = await container.getAsync<CurrencyController>(
    DI_TYPES.CurrencyController
  );

  /**
   * @openapi
   * components:
   *   schemas:
   *     CreateCurrencyDto:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         name:
   *           type: string
   *         code:
   *           type: string
   *         rate:
   *           type: number
   *         tenant_id:
   *           type: string
   *           format: uuid
   *     UpdateCurrencyDto:
   *       type: object
   *       properties:
   *         name:
   *           type: string
   *         code:
   *           type: string
   *         rate:
   *           type: number
   */
  /**
   * @openapi
   * /currencies:
   *   post:
   *     summary: Create a new currency
   *     tags: [Currencies]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCurrencyDto'
   *     responses:
   *       201:
   *         description: Currency created successfully
   *       500:
   *         description: Server error
   */
  router.post("/", validateDto(CreateCurrencyDto), currencyController.create);

  /**
   * @openapi
   * /currencies:
   *   get:
   *     summary: Get all currencies
   *     tags: [Currencies]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of currencies
   *       500:
   *         description: Server error
   */
  router.get("/", currencyController.getAll);

  /**
   * @openapi
   * /currencies/{id}:
   *   get:
   *     summary: Get currency by ID
   *     tags: [Currencies]
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
   *         description: Currency details
   *       404:
   *         description: Currency not found
   *       500:
   *         description: Server error
   */
  router.get("/:id", currencyController.getById);

  /**
   * @openapi
   * /currencies/{id}:
   *   put:
   *     summary: Update a currency
   *     tags: [Currencies]
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
   *             $ref: '#/components/schemas/UpdateCurrencyDto'
   *     responses:
   *       200:
   *         description: Currency updated successfully
   *       500:
   *         description: Server error
   */
  router.put("/:id", currencyController.update);

  /**
   * @openapi
   * /currencies/{id}:
   *   delete:
   *     summary: Delete a currency
   *     tags: [Currencies]
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
   *         description: Currency deleted successfully
   *       500:
   *         description: Server error
   */
  router.delete("/:id", currencyController.delete);
})();

export default router;