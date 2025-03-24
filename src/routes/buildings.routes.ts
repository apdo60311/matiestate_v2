import { container } from "../di/di.config";
import { BuildingsController } from "../controllers/buildings.controller";
import express from "express";
import { DI_TYPES } from "../di/di.types";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateBuildingDto } from "../dtos/create/building.dtos";
import { CreateBuildingDetailsDto } from "../dtos/create/building-details.dtos";

/**
 * @swagger
 * tags:
 *   name: Buildings
 *   description: Building management endpoints
 */
const router = express.Router();

(async () => {
  const buildingsController = await container.getAsync<BuildingsController>(
    DI_TYPES.BuildingsController
  );

  /**
   * @openapi
   * /buildings:
   *   get:
   *     summary: Get all buildings
   *     tags: [Buildings]
   *     responses:
   *       200:
   *         description: A list of buildings or an empty list
   *       500:
   *         description: error while retrieving buildings
  */
  router.get("/", buildingsController.getAll);

  /**
   * @openapi
   * /buildings/{id}:
   *   get:
   *     summary: Get a building by ID
   *     tags: [Buildings]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the building
   *     responses:
   *       200:
   *         description: The building object or an empty object
   *       500:
   *         description: error while retrieving the building
   */
  router.get("/:id", buildingsController.get);

  /**
 * @openapi
 * components:
 *   schemas:
 *     PropertyValuesDto:
 *       type: object
 *       properties:
 *         value:
 *           type: number
 *         note:
 *           type: string
 *         tenant_id:
 *           type: string
 *         number:
 *           type: number
 *
 *     BaseAssetDto:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *         area:
 *           type: number
 *         area_unit:
 *           type: string
 *         view:
 *           type: string
 *         has_lawsuit:
 *           type: boolean
 *         main_cost_center_id:
 *           type: string
 *         cost_center_id:
 *           type: string
 *         water_meter:
 *           type: string
 *         electricity_meter:
 *           type: string
 *         statement:
 *           type: string
 *         note:
 *           type: string
 *         tenant_id:
 *           type: string
 *         x_index:
 *           type: number
 *         y_index:
 *           type: number
 *         floor_no:
 *           type: number
 *         asset_hash:
 *           type: string
 *         row_index:
 *           type: number
 *         hex:
 *           type: string
 *
 *     ApartmentDetailDto:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAssetDto'
 *         - type: object
 *           required:
 *             - apartment_no
 *             - apartment_kind
 *           properties:
 *             apartment_no:
 *               type: string
 *             category:
 *               type: string
 *             bathroom_count:
 *               type: number
 *             balcony_count:
 *               type: number
 *             room_count:
 *               type: number
 *             property_values_id:
 *               type: string
 *             apartment_kind:
 *               type: number
 *
 *     ShopDetailDto:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAssetDto'
 *         - type: object
 *           required:
 *             - shop_no
 *             - shop_kind
 *           properties:
 *             shop_no:
 *               type: string
 *             shop_kind:
 *               type: number
 *
 *     ParkingDetailDto:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAssetDto'
 *         - type: object
 *           required:
 *             - parking_no
 *             - parking_kind
 *           properties:
 *             parking_no:
 *               type: string
 *             parking_kind:
 *               type: number
 *
 *     BuildingDetailsDataDto:
 *       type: object
 *       required:
 *         - apartment
 *         - mezzanine
 *         - office
 *         - store
 *         - shop
 *         - parking
 *         - penthouse
 *         - underground parking
 *       properties:
 *         apartment:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ApartmentDetailDto'
 *         mezzanine:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ApartmentDetailDto'
 *         office:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ApartmentDetailDto'
 *         store:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ShopDetailDto'
 *         shop:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ShopDetailDto'
 *         parking:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ParkingDetailDto'
 *         penthouse:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ApartmentDetailDto'
 *         underground parking:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ParkingDetailDto'
 *
 *     CreateBuildingDetailsDto:
 *       type: object
 *       required:
 *         - property_values
 *         - building_details
 *       properties:
 *         property_values:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PropertyValuesDto'
 *         building_details:
 *           $ref: '#/components/schemas/BuildingDetailsDataDto'
 *
 *     CreateBuildingDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         emirate:
 *           type: string
 *         suburb:
 *           type: string 
 *         area:
 *           type: string
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         purchase_amount:
 *           type: number
 *         building_cost:
 *           type: number
 *         apartment_count:
 *           type: integer
 *           minimum: 0
 */
  /**
   * @openapi
   * /buildings:
   *   post:
   *     summary: Create a new building
   *     tags: [Buildings]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBuildingDto'
   *     responses:
   *       201:
   *         description: Building created successfully
   *       400: 
   *         description: Invalid building data
   *       500:
   *         description: error while creating the building
   */
  router.post("/", validateDto(CreateBuildingDto), buildingsController.create);

  /**
   * @openapi
   * /buildings/{id}:
   *   put:
   *     summary: Update an existing building
   *     tags: [Buildings]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the building
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBuildingDto'
   *     responses:
   *       200:
   *         description: Building updated successfully
   *       404:
   *         description: Building not found
   */
  router.put("/:id", buildingsController.update);


  /**
 * @openapi
 * /buildings/details:
 *   post:
 *     summary: Create building details
 *     tags: [Buildings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBuildingDetailsDto'
 *     responses:
 *       201:
 *         description: Building details created successfully
 *       400:
 *         description: Invalid building details data  
 *       500:
 *         description: Error creating building details
 */
  router.post("/details/:id", buildingsController.createDetails);
  /**
   * @openapi
   * /buildings/{id}/details:
   *   get:
   *     summary: Get building details
   *     tags: [Buildings]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The building ID
   *     responses:
   *       200:
   *         description: Building details retrieved successfully
   *       500:
   *         description: Error retrieving building details
   */
  router.get("/details/:id", buildingsController.getDetails);


})();

export default router;
