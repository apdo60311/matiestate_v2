import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { SellerController } from "../controllers/seller.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateSellerDto } from "../dtos/create-seller.dto";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const sellerController = await container.getAsync<SellerController>(
        DI_TYPES.SellerController
    );

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSellerDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         address:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 */
    /**
     * @openapi
     * /sellers:
     *   post:
     *     summary: Create a new seller
     *     tags: [Sellers]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateSellerDto'
     *     responses:
     *       201:
     *         description: Seller created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateSellerDto), sellerController.create);

    /**
     * @openapi
     * /sellers:
     *   get:
     *     summary: Get all sellers
     *     tags: [Sellers]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of sellers
     *       500:
     *         description: Server error
     */
    router.get("/", sellerController.getAll);

    /**
     * @openapi
     * /sellers/{id}:
     *   get:
     *     summary: Get seller by ID
     *     tags: [Sellers]
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
     *         description: Seller details
     *       404:
     *         description: Seller not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", sellerController.getById);

    /**
     * @openapi
     * /sellers/{id}:
     *   put:
     *     summary: Update a seller
     *     tags: [Sellers]
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
     *             $ref: '#/components/schemas/CreateSellerDto'
     *     responses:
     *       200:
     *         description: Seller updated successfully
     *       500:
     *         description: Server error
     */
    router.put("/:id", validateDto(CreateSellerDto), sellerController.update);

    /**
     * @openapi
     * /sellers/{id}:
     *   delete:
     *     summary: Delete a seller
     *     tags: [Sellers]
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
     *         description: Seller deleted successfully
     *       500:
     *         description: Server error
     */
    router.delete("/:id", sellerController.delete);
})();

export default router;