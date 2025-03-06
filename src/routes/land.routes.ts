import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { LandController } from "../controllers/land.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateLandDto } from "../dtos/create-land.dto";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
  const landController = await container.getAsync<LandController>(
    DI_TYPES.LandController
  );

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLandRentalPriceDto:
 *       type: object
 *       required:
 *         - date
 *         - price
 *         - land_id
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
 *         note:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         number:
 *           type: number
 *         land_id:
 *           type: string
 *           format: uuid
 *           
 *     CreateLandSellingPriceDto:
 *       type: object
 *       required:
 *         - date
 *         - price
 *         - land_id
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
 *         note:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         number:
 *           type: number
 *         land_id:
 *           type: string
 *           format: uuid
 *           
 *     CreateLandDto:
 *       type: object
 *       required:
 *         - type
 *       properties:
 *         land_no:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: number
 *         area:
 *           type: number
 *           minimum: 0
 *         area_unit:
 *           type: string
 *         city:
 *           type: string
 *         region:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         rental_price:
 *           $ref: '#/components/schemas/CreateLandRentalPriceDto'
 *         selling_price:
 *           $ref: '#/components/schemas/CreateLandSellingPriceDto'
 *     
 *     UpdateLandDto:
 *       $ref: '#/components/schemas/CreateLandDto'
 */
  /**
   * @openapi
   * /lands:
   *   post:
   *     summary: Create a new land
   *     tags: [Lands]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateLandDto'
   *     responses:
   *       201:
   *         description: Land created successfully
   *       500:
   *         description: Server error
   */
  router.post("/", validateDto(CreateLandDto), landController.create);

  /**
   * @openapi
   * /lands:
   *   get:
   *     summary: Get all lands
   *     tags: [Lands]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of lands
   *       500:
   *         description: Server error
   */
  router.get("/", landController.getAll);

  /**
   * @openapi
   * /lands/{id}:
   *   get:
   *     summary: Get land by ID
   *     tags: [Lands]
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
   *         description: Land details
   *       404:
   *         description: Land not found
   *       500:
   *         description: Server error
   */
  router.get("/:id", landController.getById);

  /**
   * @openapi
   * /lands/{id}:
   *   put:
   *     summary: Update a land
   *     tags: [Lands]
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
   *             $ref: '#/components/schemas/UpdateLandDto'
   *     responses:
   *       200:
   *         description: Land updated successfully
   *       500:
   *         description: Server error
   */
  router.put("/:id", landController.update);

  /**
   * @openapi
   * /lands/{id}:
   *   delete:
   *     summary: Delete a land
   *     tags: [Lands]
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
   *         description: Land deleted successfully
   *       500:
   *         description: Server error
   */
  router.delete("/:id", landController.delete);
})();

export default router;
