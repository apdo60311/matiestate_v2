import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { BankController } from "../controllers/bank.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateBankDto } from "../dtos/create-bank.dto";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Banks
 *   description: Bank management endpoints
 */
(async () => {
    const bankController = await container.getAsync<BankController>(
        DI_TYPES.BankController
    );

    /**
     * @openapi
     * /banks:
     *   post:
     *     summary: Create a new bank
     *     tags: [Banks]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateBankDto'
     *     responses:
     *       201:
     *         description: Bank created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateBankDto), bankController.create);

    /**
     * @openapi
     * /banks:
     *   get:
     *     summary: Get all banks
     *     tags: [Banks]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of banks
     *       500:
     *         description: Server error
     */
    router.get("/", bankController.getAll);

    /**
     * @openapi
     * /banks/{id}:
     *   get:
     *     summary: Get bank by ID
     *     tags: [Banks]
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
     *         description: Bank details
     *       404:
     *         description: Bank not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", bankController.getById);

    /**
     * @openapi
     * /banks/{id}:
     *   put:
     *     summary: Update a bank
     *     tags: [Banks]
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
     *             $ref: '#/components/schemas/CreateBankDto'
     *     responses:
     *       200:
     *         description: Bank updated successfully
     *       500:
     *         description: Server error
     */
    router.put("/:id", bankController.update);

    /**
     * @openapi
     * /banks/{id}:
     *   delete:
     *     summary: Delete a bank
     *     tags: [Banks]
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
     *         description: Bank deleted successfully
     *       500:
     *         description: Server error
     */
    router.delete("/:id", bankController.delete);
})();

export default router;