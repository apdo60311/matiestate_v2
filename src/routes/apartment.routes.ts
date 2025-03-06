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
 * components:
 *   schemas:
 *     CreateApartmentDto:
 *       type: object
 *       required:
 *         - building_id
 *         - apartment_no
 *         - x_index
 *         - y_index
 *       properties:
 *         building_id:
 *           type: string
 *           format: uuid
 *         apartment_no:
 *           type: string
 *         floor_no:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         area:
 *           type: number
 *           minimum: 0
 *         area_unit:
 *           type: string
 *         view:
 *           type: string
 *         bathroom_count:
 *           type: number
 *           minimum: 0
 *         balcony_count:
 *           type: number
 *           minimum: 0
 *         has_lawsuit:
 *           type: boolean
 *           default: false
 *         x_index:
 *           type: number
 *         y_index:
 *           type: number
 *         pictures:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateApartmentPicturesDto'
 *         rental_price:
 *           $ref: '#/components/schemas/CreateApartmentRentalPriceDto'
 *         selling_price:
 *           $ref: '#/components/schemas/CreateApartmentSellingPriceDto'
 *         accumulates:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateApartmentAccumulateDto'
 *     UpdateApartmentDto:
 *       type: object
 *       properties:
 *         building_id:
 *           type: string
 *           format: uuid
 *         apartment_no:
 *           type: string
 *         floor_no:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         area:
 *           type: number
 *           minimum: 0
 *         area_unit:
 *           type: string
 *         view:
 *           type: string
 *         bathroom_count:
 *           type: number
 *           minimum: 0
 *         balcony_count:
 *           type: number
 *           minimum: 0
 *         has_lawsuit:
 *           type: boolean
 *         x_index:
 *           type: number
 *         y_index:
 *           type: number
 *         pictures:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateApartmentPicturesDto'
 *         rental_price:
 *           $ref: '#/components/schemas/CreateApartmentRentalPriceDto'
 *         selling_price:
 *           $ref: '#/components/schemas/CreateApartmentSellingPriceDto'
 *     CreateApartmentPicturesDto:
 *       type: object
 *       required:
 *         - apartment_id
 *         - picture
 *       properties:
 *         apartment_id:
 *           type: string
 *           format: uuid
 *         picture:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *     CreateApartmentRentalPriceDto:
 *       type: object
 *       required:
 *         - apartment_id
 *         - date
 *         - price
 *       properties:
 *         apartment_id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date-time
 *         price:
 *           type: number
 *           minimum: 0
 *     CreateApartmentSellingPriceDto:
 *       type: object
 *       required:
 *         - apartment_id
 *         - date
 *         - price
 *       properties:
 *         apartment_id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date-time
 *         price:
 *           type: number
 *           minimum: 0
 *     CreateApartmentAccumulateDto:
 *       type: object
 *       required:
 *         - main_apartment_id
 *         - apartment_id
 *         - tenant_id
 *       properties:
 *         number:
 *           type: number
 *         main_apartment_id:
 *           type: string
 *           format: uuid
 *         apartment_id:
 *           type: string
 *           format: uuid
 *         tenant_id:
 *           type: string
 *           format: uuid
 */

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