import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { ParkingController } from "../controllers/parking.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateParkingDto } from "../dtos/create/parking.dtos";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const parkingController = await container.getAsync<ParkingController>(
        DI_TYPES.ParkingController
    );

    /**
     * @openapi
     * components:
     *   schemas:
     *     CreateParkingDto:
     *       type: object
     *       required:
     *         - building_id
     *         - parking_no
     *         - x_index
     *         - y_index
     *       properties:
     *         building_id:
     *           type: string
     *           format: uuid
     *         parking_no:
     *           type: string
     *         floor_no:
     *           type: string
     *         description:
     *           type: string
     *         x_index:
     *           type: number
     *         y_index:
     *           type: number
     *         area:
     *           type: number
     *         area_unit:
     *           type: string
     *         view:
     *           type: string
     *         parking_kind:
     *           type: number
     *         has_lawsuit:
     *           type: boolean
     *         property_type:
     *           type: number
     *         hex:
     *           type: string
     *         row_index:
     *           type: number
     *         pictures:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/CreateParkingPicturesDto'
     *         rental_price:
     *           $ref: '#/components/schemas/CreateParkingRentalPriceDto'
     *         selling_price:
     *           $ref: '#/components/schemas/CreateParkingSellingPriceDto'
     *
     *     UpdateParkingDto:
     *       $ref: '#/components/schemas/CreateParkingDto'
     */
    /**
     * @openapi
     * /parkings:
     *   post:
     *     summary: Create a new parking
     *     tags: [Parkings]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateParkingDto'
     *     responses:
     *       201:
     *         description: Parking created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateParkingDto), parkingController.create);

    /**
     * @openapi
     * /parkings:
     *   get:
     *     summary: Get all parkings
     *     tags: [Parkings]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of parkings
     *       500:
     *         description: Server error
     */
    router.get("/", parkingController.getAll);

    /**
     * @openapi
     * /parkings/{id}:
     *   get:
     *     summary: Get parking by ID
     *     tags: [Parkings]
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
     *         description: Parking details
     *       404:
     *         description: Parking not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", parkingController.getById);

    /**
     * @openapi
     * /parkings/{id}:
     *   put:
     *     summary: Update a parking
     *     tags: [Parkings]
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
     *             $ref: '#/components/schemas/UpdateParkingDto'
     *     responses:
     *       200:
     *         description: Parking updated successfully
     *       500:
     *         description: Server error
     */
    router.put("/:id", parkingController.update);

    /**
     * @openapi
     * /parkings/{id}:
     *   delete:
     *     summary: Delete a parking
     *     tags: [Parkings]
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
     *         description: Parking deleted successfully
     *       500:
     *         description: Server error
     */
    router.delete("/:id", parkingController.delete);
})();

export default router;