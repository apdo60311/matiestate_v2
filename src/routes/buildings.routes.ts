import { container } from "../di/di.config";
import { BuildingsController } from "../controllers/buildings.controller";
import express from "express";
import { DI_TYPES } from "../di/di.types";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateBuildingDto } from "../dtos/create-building.dto";

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
})();

export default router;
