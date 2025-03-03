import { container } from "../di/di.config";
import { BuildingsController } from "../controllers/buildings.controller";
import express from "express";
import { DI_TYPES } from "../di/di.types";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateBuildingDto } from "../dtos/create-building.dto";
import { CreateBuildingDetailsDto } from "../dtos/create-building-details.dto";

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
