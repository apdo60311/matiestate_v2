import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { ReservationPropertyController } from "../controllers/reservation-property.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateReservationPropertyDto } from "../dtos/create/reservation-property.dtos";

const router = express.Router();

(async () => {
    const reservationPropertyController = await container.getAsync<ReservationPropertyController>(
        DI_TYPES.ReservationPropertyController
    );

    /**
     * @openapi
     * /reservation-properties:
     *   post:
     *     summary: Create a new reservation property
     *     tags: [ReservationProperties]
     *     responses:
     *       201:
     *         description: Reservation property created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateReservationPropertyDto), reservationPropertyController.create);

    /**
     * @openapi
     * /reservation-properties:
     *   get:
     *     summary: Get all reservation properties
     *     tags: [ReservationProperties]
     *     responses:
     *       200:
     *         description: List of reservation properties
     *       500:
     *         description: Server error
     */
    router.get("/", reservationPropertyController.getAll);

    /**
     * @openapi
     * /reservation-properties/{id}:
     *   get:
     *     summary: Get a reservation property by ID
     *     tags: [ReservationProperties]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Reservation property details
     *       404:
     *         description: Reservation property not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", reservationPropertyController.getById);
})();

export default router;