import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { ShopController } from "../controllers/shop.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateShopDto } from "../dtos/create-shop.dto";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const shopController = await container.getAsync<ShopController>(
        DI_TYPES.ShopController
    );


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateShopDto:
 *       type: object
 *       required:
 *         - shop_no
 *         - building_id
 *       properties:
 *         shop_no:
 *           type: string
 *         building_id:
 *           type: string
 *           format: uuid
 *         floor_no:
 *           type: string
 *         description:
 *           type: string
 *         area:
 *           type: number
 *         area_unit:
 *           type: string
 *         view:
 *           type: string
 *         shop_kind:
 *           type: number
 */
    /**
     * @openapi
     * /shops:
     *   post:
     *     summary: Create a new shop
     *     tags: [Shops]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateShopDto'
     *     responses:
     *       201:
     *         description: Shop created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateShopDto), shopController.create);

    /**
     * @openapi
     * /shops:
     *   get:
     *     summary: Get all shops
     *     tags: [Shops]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of shops
     *       500:
     *         description: Server error
     */
    router.get("/", shopController.getAll);

    /**
     * @openapi
     * /shops/{id}:
     *   get:
     *     summary: Get shop by ID
     *     tags: [Shops]
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
     *         description: Shop details
     *       404:
     *         description: Shop not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", shopController.getById);
})();

export default router;