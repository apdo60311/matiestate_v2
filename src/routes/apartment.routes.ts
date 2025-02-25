import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { ApartmentController } from "../controllers/apartment.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateApartmentDto } from "../dtos/create-apartment.dto";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const apartmentController = await container.getAsync<ApartmentController>(
        DI_TYPES.ApartmentController
    );

    /**
     * @openapi
     * /apartments:
     *   post:
     *     summary: Create a new apartment with related entities
     *     tags: [Apartments]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateApartmentDto'
     *     responses:
     *       201:
     *         description: Apartment created successfully
     *       400:
     *         description: Invalid input data
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateApartmentDto), apartmentController.create);

    /**
     * @openapi
     * /apartments:
     *   get:
     *     summary: Get all apartments
     *     tags: [Apartments]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of apartments
     *       500:
     *         description: Server error
     */
    router.get("/", apartmentController.getAll);

    /**
     * @openapi
     * /apartments/{id}:
     *   get:
     *     summary: Get an apartment by ID
     *     tags: [Apartments]
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
     *         description: Apartment details
     *       404:
     *         description: Apartment not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", apartmentController.getById);

    /**
     * @openapi
     * /apartments/building/{buildingId}:
     *   get:
     *     summary: Get apartments by building ID
     *     tags: [Apartments]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: buildingId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of apartments in the building
     *       500:
     *         description: Server error
     */
    router.get("/building/:buildingId", apartmentController.getByBuildingId);

    /**
     * @openapi
     * /apartments/{id}/pictures:
     *   get:
     *     summary: Get apartment pictures
     *     tags: [Apartments]
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
     *         description: List of apartment pictures
     *       500:
     *         description: Server error
     */
    router.get("/:id/pictures", apartmentController.getPictures);

    /**
     * @openapi
     * /apartments/{id}/rental-history:
     *   get:
     *     summary: Get apartment rental price history
     *     tags: [Apartments]
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
     *         description: Rental price history
     *       500:
     *         description: Server error
     */
    router.get("/:id/rental-history", apartmentController.getRentalHistory);

    /**
     * @openapi
     * /apartments/{id}/selling-history:
     *   get:
     *     summary: Get apartment selling price history
     *     tags: [Apartments]
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
     *         description: Selling price history
     *       500:
     *         description: Server error
     */
    router.get("/:id/selling-history", apartmentController.getSellingHistory);

    /**
     * @openapi
     * /apartments/{id}:
     *   put:
     *     summary: Update an apartment
     *     tags: [Apartments]
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
     *             $ref: '#/components/schemas/UpdateApartmentDto'
     *     responses:
     *       200:
     *         description: Apartment updated successfully
     *       404:
     *         description: Apartment not found
     *       500:
     *         description: Server error
     */
    router.put("/:id", apartmentController.update);

    /**
     * @openapi
     * /apartments/{id}:
     *   delete:
     *     summary: Delete an apartment
     *     tags: [Apartments]
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
     *         description: Apartment deleted successfully
     *       404:
     *         description: Apartment not found
     *       500:
     *         description: Server error
     */
    router.delete("/:id", apartmentController.delete);
})();

export default router;