import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { MaterialController } from "../controllers/material.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { IMaterialRequestBody } from "../types/material.types";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";
import { MaterialDto, MaterialRequestDto } from "../dtos/create-material.dto";

const router = express.Router();

(async () => {
    const materialController = await container.getAsync<MaterialController>(
        DI_TYPES.MaterialController
    );

    /**
     * @openapi
     * /materials:
     *   post:
     *     summary: Create a new material with related entities
     *     tags: [Materials]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MaterialRequestBody'
     *     responses:
     *       201:
     *         description: Material created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(MaterialRequestDto), materialController.createMaterial);

    /**
     * @openapi
     * /materials:
     *   get:
     *     summary: Get all materials
     *     tags: [Materials]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of materials
     *       500:
     *         description: Server error
     */
    router.get("/", materialController.getAllMaterials);

    /**
     * @openapi
     * /materials/{id}:
     *   get:
     *     summary: Get material by ID
     *     tags: [Materials]
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
     *         description: Material details
     *       404:
     *         description: Material not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", materialController.getMaterialById);

    /**
     * @openapi
     * /materials/groups:
     *   post:
     *     summary: Create a new material group
     *     tags: [MaterialGroups]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MaterialGroup'
     *     responses:
     *       201:
     *         description: Material group created successfully
     *       500:
     *         description: Server error
     */
    router.post("/groups", materialController.createMaterialGroup);

    /**
     * @openapi
     * /materials/groups:
     *   get:
     *     summary: Get all material groups
     *     tags: [MaterialGroups]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of material groups
     *       500:
     *         description: Server error
     */
    router.get("/groups", materialController.getAllMaterialGroups);

    /**
     * @openapi
     * /materials/groups/{id}:
     *   get:
     *     summary: Get material group by ID
     *     tags: [MaterialGroups]
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
     *         description: Material group details
     *       404:
     *         description: Material group not found
     *       500:
     *         description: Server error
     */
    router.get("/groups/:id", materialController.getMaterialGroupById);

    /**
     * @openapi
     * /materials/{materialId}/balance/{storeId}:
     *   get:
     *     summary: Get material balance by material ID and store ID
     *     tags: [MaterialBalance]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: materialId
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: storeId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Material balance details
     *       404:
     *         description: Balance not found
     *       500:
     *         description: Server error
     */
    router.get("/:materialId/balance/:storeId", materialController.getBalanceByMaterialAndStore);

    /**
     * @openapi
     * /materials/{materialId}/prices:
     *   get:
     *     summary: Get material prices by material ID
     *     tags: [MaterialPrices]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: materialId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Material prices details
     *       404:
     *         description: Prices not found
     *       500:
     *         description: Server error
     */
    router.get("/:materialId/prices", materialController.getMaterialPrices);

})();

export default router;