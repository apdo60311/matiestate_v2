import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { BillController } from "../controllers/bill.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const billController = await container.getAsync<BillController>(
        DI_TYPES.BillController
    );

    /**
     * @openapi
     * components:
     *   schemas:
     *     BillDto:
     *       type: object
     *       required:
     *         - currency_id
     *         - client_account_id
     *         - bill_date
     *       properties:
     *         currency_id:
     *           type: string
     *           format: uuid
     *         currency_val:
     *           type: number
     *         client_account_id:
     *           type: string
     *           format: uuid
     *         bill_date:
     *           type: string
     *           format: date
     *         note:
     *           type: string
     *         subtotal:
     *           type: number
     *         total:
     *           type: number
     *         vat_amount:
     *           type: number
     *         extras:
     *           type: number
     *         discounts:
     *           type: number
     *
     *     CreateBillRequestDto:
     *       type: object
     *       required:
     *         - bill
     *         - materialDetails
     *         - discountDetails
     *       properties:
     *         bill:
     *           $ref: '#/components/schemas/BillDto'
     *         materialDetails:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/BillMaterialDetailDto'
     *         discountDetails:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/BillDiscountDetailDto'
     */

    /**
     * @openapi
     * /bills:
     *   post:
     *     summary: Create a new bill
     *     tags: [Bills]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateBillRequestDto'
     *     responses:
     *       201:
     *         description: Bill created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", auth, billController.create);

    /**
     * @openapi
     * /bills/{id}:
     *   get:
     *     summary: Get bill by ID
     *     tags: [Bills]
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
     *         description: Bill details retrieved successfully
     *       404:
     *         description: Bill not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", auth, billController.getById);

    /**
     * @openapi
     * /bills/{id}:
     *   put:
     *     summary: Update bill by ID
     *     tags: [Bills]
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
     *             $ref: '#/components/schemas/CreateBillRequestDto'
     *     responses:
     *       200:
     *         description: Bill updated successfully
     *       500:
     *         description: Server error
     */
    router.put("/:id", auth, billController.update);

    /**
     * @openapi
     * /bills/{id}:
     *   delete:
     *     summary: Delete bill by ID
     *     tags: [Bills]
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
     *         description: Bill deleted successfully
     *       500:
     *         description: Server error
     */
    router.delete("/:id", auth, billController.delete);

    /**
     * @openapi
     * /bills/date-range:
     *   get:
     *     summary: Get bills by date range
     *     tags: [Bills]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: startDate
     *         required: true
     *         schema:
     *           type: string
     *           format: date
     *       - in: query
     *         name: endDate
     *         required: true
     *         schema:
     *           type: string
     *           format: date
     *     responses:
     *       200:
     *         description: Bills retrieved successfully
     *       500:
     *         description: Server error
     */
    router.get("/date-range", auth, billController.getByDateRange);

    /**
     * @openapi
     * /bills/tenant/{tenantId}:
     *   get:
     *     summary: Get bills by tenant ID
     *     tags: [Bills]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: tenantId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Bills retrieved successfully
     *       500:
     *         description: Server error
     */
    router.get("/tenant/:tenantId", auth, billController.getByTenant);

    /**
     * @openapi
     * /bills/customer/{customerAccountId}:
     *   get:
     *     summary: Get bills by customer account ID
     *     tags: [Bills]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: customerAccountId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Bills retrieved successfully
     *       500:
     *         description: Server error
     */
    router.get("/customer/:customerAccountId", auth, billController.getByCustomer);

})();

export default router;