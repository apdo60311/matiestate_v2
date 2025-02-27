// src/routes/parking.routes.ts
import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { ParkingController } from "../controllers/parking.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateParkingDto } from "../dtos/create-parking.dto";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const parkingController = await container.getAsync<ParkingController>(
        DI_TYPES.ParkingController
    );

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