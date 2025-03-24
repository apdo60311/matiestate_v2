import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { OwnerController } from "../controllers/owner.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateOwnerDto, CreateOwnerExpenseDetailDto, CreateOwnerExpenseDto } from "../dtos/create/owner.dtos";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const ownerController = await container.getAsync<OwnerController>(
        DI_TYPES.OwnerController
    );

    /**
 * @openapi
 * components:
 *   schemas:
 *     CreateOwnerDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         id_card:
 *           type: string
 *         phone:
 *           type: string
 *         cell_phone:
 *           type: string
 *         fax:
 *           type: string
 *         mailbox:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         address:
 *           type: string
 *         nationality:
 *           type: string
 *         account_id:
 *           type: string
 *           format: uuid
 *         tenant_id:
 *           type: string
 *           format: uuid
 *     
 *     CreateOwnerExpenseDto:
 *       type: object
 *       required:
 *         - owner_id
 *         - amount
 *         - type_id
 *       properties:
 *         owner_id:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *         date:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         type_id:
 *           type: string
 *           format: uuid
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         number:
 *           type: number
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateOwnerExpenseDetailDto'
 *     UpdateOwnerDto:
 *       $ref: '#/components/schemas/CreateOwnerDto'
 */
    /**
     * @openapi
     * /owners:
     *   post:
     *     summary: Create a new owner
     *     tags: [Owners]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateOwnerDto'
     *     responses:
     *       201:
     *         description: Owner created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateOwnerDto), ownerController.create);

    /**
     * @openapi
     * /owners:
     *   get:
     *     summary: Get all owners
     *     tags: [Owners]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of owners
     *       500:
     *         description: Server error
     */
    router.get("/", ownerController.getAll);

    /**
     * @openapi
     * /owners/{id}:
     *   get:
     *     summary: Get an owner by ID
     *     tags: [Owners]
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
     *         description: Owner details
     *       404:
     *         description: Owner not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", ownerController.getById);

    /**
     * @openapi
     * /owners/{id}:
     *   put:
     *     summary: Update an owner
     *     tags: [Owners]
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
     *             $ref: '#/components/schemas/UpdateOwnerDto'
     *     responses:
     *       200:
     *         description: Owner updated successfully
     *       500:
     *         description: Server error
     */
    router.put("/:id", ownerController.update);

    /**
     * @openapi
     * /owners/{id}:
     *   delete:
     *     summary: Delete an owner
     *     tags: [Owners]
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
     *         description: Owner deleted successfully
     *       500:
     *         description: Server error
     */
    router.delete("/:id", ownerController.delete);

    // Owner Expenses Routes
    /**
     * @openapi
     * /owners/expenses:
     *   post:
     *     summary: Create owner expense
     *     tags: [OwnerExpenses]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateOwnerExpenseDto'
     *     responses:
     *       201:
     *         description: Owner expense created successfully
     *       500:
     *         description: Server error
     */
    router.post("/expenses", validateDto(CreateOwnerExpenseDto), ownerController.createExpense);

    /**
     * @openapi
     * /owners/{ownerId}/expenses:
     *   get:
     *     summary: Get owner expenses
     *     tags: [OwnerExpenses]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: ownerId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of owner expenses
     *       500:
     *         description: Server error
     */
    router.get("/:ownerId/expenses", ownerController.getExpenses);


    /**
     * @openapi
     * /owners/expenses:
     *   get:
     *     summary: Get all expenses
     *     tags: [AllExpenses]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of all expenses
     *       500:
     *         description: Server error
     */
    router.get("/expenses/all", ownerController.getAllExpenses);

    /**
     * @openapi
     * /owners/expenses/{id}:
     *   put:
     *     summary: Update owner expense
     *     tags: [OwnerExpenses]
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
     *         description: Owner expense updated successfully
     *       500:
     *         description: Server error
     */
    router.put("/expenses/:id", ownerController.updateExpense);

    /**
     * @openapi
     * /owners/expenses/{id}:
     *   delete:
     *     summary: Delete owner expense
     *     tags: [OwnerExpenses]
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
     *         description: Owner expense deleted successfully
     *       500:
     *         description: Server error
     */
    router.delete("/expenses/:id", ownerController.deleteExpense);

    // Owner Expense Details Routes
    router.put("/expenses/details/:id", ownerController.updateExpenseDetail);
    router.delete("/expenses/details/:id", ownerController.deleteExpenseDetail);

    // Owner Expense Types Routes  
    router.put("/expenses/types/:id", ownerController.updateExpenseType);
    router.delete("/expenses/types/:id", ownerController.deleteExpenseType);
})();

export default router;