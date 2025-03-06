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
 * components:
 *   schemas:
 *     MaterialDto:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - material_group_id
 *         - material_type
 *         - tenant_id
 *       properties:
 *         name:
 *           type: string
 *         code:
 *           type: number
 *         material_group_id:
 *           type: string
 *           format: uuid
 *         material_type:
 *           type: number
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         category_id:
 *           type: string
 *           format: uuid
 *         ltnname:
 *           type: string
 *         unit1:
 *           type: string
 *         barcode1:
 *           type: string
 *         defaults1:
 *           type: boolean
 *
 *     MaterialPricesDto:
 *       type: object
 *       required:
 *         - tenant_id
 *         - vat_rate
 *       properties:
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         vat_rate:
 *           type: number
 *         currency_id:
 *           type: string
 *           format: uuid
 *         currency_val:
 *           type: number
 *         average_purchase:
 *           type: number
 *           minimum: 0
 *
 *     MaterialPriceDetailsDto:
 *       type: object
 *       required:
 *         - price_type
 *         - tenant_id
 *       properties:
 *         price_type:
 *           type: number
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         unit1_price:
 *           type: number
 *           minimum: 0
 *
 *     MaterialSpecificationsDto:
 *       type: object
 *       required:
 *         - specification
 *         - value
 *         - tenant_id
 *       properties:
 *         specification:
 *           type: string
 *         value:
 *           type: number
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *     MaterialRequestBody:
 *       type: object
 *       required:
 *         - material
 *       properties:
 *         material:
 *           $ref: '#/components/schemas/MaterialDto'
 *         prices:
 *           $ref: '#/components/schemas/MaterialPricesDto'
 *         priceDetails:
 *           $ref: '#/components/schemas/MaterialPriceDetailsDto'
 *         specifications:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MaterialSpecificationsDto'
 *     
 *     MaterialGroup:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 */
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