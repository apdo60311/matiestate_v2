import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { LessorController } from "../controllers/lessor.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateLessorDto } from "../dtos/create-lessor.dto";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const lessorController = await container.getAsync<LessorController>(
        DI_TYPES.LessorController
    );

    /**
 * @openapi
 * components:
 *   schemas:
 *     CreateLessorDto:
 *       type: object
 *       required:
 *         - name
 *         - passport
 *       properties:
 *         name:
 *           type: string
 *         passport:
 *           type: number
 *         id_card:
 *           type: number
 *         lessor_card:
 *           type: number
 *         cell_phone:
 *           type: number
 *         passport_expiry_date:
 *           type: string
 *         address:
 *           type: string
 *         nationality:
 *           type: string
 *         fax:
 *           type: string
 *         mailbox:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         note:
 *           type: string
 *         mobile:
 *           type: number
 *         role:
 *           type: string
 */
    /**
     * @openapi
     * /lessors:
     *   post:
     *     summary: Create a new lessor
     *     tags: [Lessors]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateLessorDto'
     *     responses:
     *       201:
     *         description: Lessor created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateLessorDto), lessorController.create);

    /**
     * @openapi
     * /lessors:
     *   get:
     *     summary: Get all lessors
     *     tags: [Lessors]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of lessors
     *       500:
     *         description: Server error
     */
    router.get("/", lessorController.getAll);

    /**
     * @openapi
     * /lessors/{id}:
     *   get:
     *     summary: Get lessor by ID
     *     tags: [Lessors]
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
     *         description: Lessor details
     *       404:
     *         description: Lessor not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", lessorController.getById);

    /**
     * @openapi
     * /lessors/{id}:
     *   patch:
     *     summary: Update lessor by ID
     *     tags: [Lessors]
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
     *             $ref: '#/components/schemas/CreateLessorDto'
     *     responses:
     *       200:
     *         description: Lessor updated successfully
     *       500:
     *         description: Server error
     */
    router.patch("/:id", validateDto(CreateLessorDto), lessorController.update);

    /**
     * @openapi
     * /lessors/{id}:
     *   delete:
     *     summary: Delete lessor by ID
     *     tags: [Lessors]
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
     *         description: Lessor deleted successfully
     *       500:
     *         description: Server error
     */
    router.delete("/:id", lessorController.delete);
})();

export default router;