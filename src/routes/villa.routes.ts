import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { VillaController } from "../controllers/villa.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";
import { CreateVillaDto } from "../dtos/create-villa.dto";

const router = express.Router();

(async () => {
    const villaController = await container.getAsync<VillaController>(
        DI_TYPES.VillaController
    );

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateVillaRentalPriceDto:
 *       type: object
 *       required:
 *         - date
 *         - price
 *         - villa_id
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *         price:
 *           type: number
 *           minimum: 0
 *         currency_id:
 *           type: string
 *           format: uuid
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         number:
 *           type: number
 *         villa_id:
 *           type: string
 *           format: uuid
 *     
 *     CreateVillaSellingPriceDto:
 *       type: object
 *       required:
 *         - date
 *         - price
 *         - villa_id
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *         price:
 *           type: number
 *           minimum: 0
 *         currency_id:
 *           type: string
 *           format: uuid
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         number:
 *           type: number
 *         villa_id:
 *           type: string
 *           format: uuid
 *     CreateVillaDto:
 *       type: object
 *       required:
 *         - complex_name
 *         - villa_no
 *       properties:
 *         complex_name:
 *           type: string
 *         villa_no:
 *           type: string
 *         emirate:
 *           type: string
 *         area:
 *           type: string
 *         rental_price:
 *           $ref: '#/components/schemas/CreateVillaRentalPriceDto'
 *         selling_price:
 *           $ref: '#/components/schemas/CreateVillaSellingPriceDto'
 *     
 *     UpdateVillaDto:
 *       $ref: '#/components/schemas/CreateVillaDto'
 */
    /**
     * @openapi
     * /villas:
     *   post:
     *     summary: Create a new villa
     *     tags: [Villas]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateVillaDto'
     *     responses:
     *       201:
     *         description: Villa created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateVillaDto), villaController.create);

    /**
     * @openapi
     * /villas:
     *   get:
     *     summary: Get all villas
     *     tags: [Villas]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of villas
     *       500:
     *         description: Server error
     */
    router.get("/", villaController.getAll);

    /**
     * @openapi
     * /villas/{id}:
     *   get:
     *     summary: Get villa by ID
     *     tags: [Villas]
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
     *         description: Villa details
     *       404:
     *         description: Villa not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", villaController.getById);

    /**
     * @openapi
     * /villas/{id}:
     *   put:
     *     summary: Update a villa
     *     tags: [Villas]
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
     *             $ref: '#/components/schemas/UpdateVillaDto'
     *     responses:
     *       200:
     *         description: Villa updated successfully
     *       500:
     *         description: Server error
     */
    router.put("/:id", villaController.update);

    /**
     * @openapi
     * /villas/{id}:
     *   delete:
     *     summary: Delete a villa
     *     tags: [Villas]
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
     *         description: Villa deleted successfully
     *       500:
     *         description: Server error
     */
    router.delete("/:id", villaController.delete);
})();

export default router;