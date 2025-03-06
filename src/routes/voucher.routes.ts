import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { VoucherController } from "../controllers/voucher.controller";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateVoucherRequestDto } from "../dtos/create-voucher.dto";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";

const router = express.Router();

(async () => {
    const voucherController = await container.getAsync<VoucherController>(
        DI_TYPES.VoucherController
    );

/**
 * @openapi
 * components:
 *   schemas:
 *     VoucherMainDataDto:
 *       type: object
 *       required:
 *         - voucherType
 *       properties:
 *         number:
 *           type: number
 *         voucherType:
 *           type: number
 *         currencyId:
 *           type: string
 *           format: uuid
 *         sellerId:
 *           type: string
 *           format: uuid
 *         accountId:
 *           type: string
 *           format: uuid
 *         patternId:
 *           type: string
 *           format: uuid
 *         tenantId:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         code:
 *           type: number
 *         totalAmount:
 *           type: number
 *           minimum: 0
 *         currencyVal:
 *           type: number
 *     
 *     VoucherGridDataDto:
 *       type: object
 *       required:
 *         - accountId
 *       properties:
 *         accountId:
 *           type: string
 *           format: uuid
 *         costCenterId:
 *           type: string
 *           format: uuid
 *         tenantId:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         debit:
 *           type: number
 *           minimum: 0
 *         credit:
 *           type: number
 *           minimum: 0
 *         currencyId:
 *           type: string
 *           format: uuid
 *         currencyVal:
 *           type: number
 *     
 *     VoucherPicturesDto:
 *       type: object
 *       required:
 *         - picture
 *       properties:
 *         picture:
 *           type: string
 *         tenantId:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         voucherMainDataId:
 *           type: string
 *           format: uuid
 *         number:
 *           type: number
 *     CreateVoucherRequestDto:
 *       type: object
 *       required:
 *         - mainData
 *         - gridData
 *       properties:
 *         mainData:
 *           $ref: '#/components/schemas/VoucherMainDataDto'
 *         gridData:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/VoucherGridDataDto'
 *         pictures:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/VoucherPicturesDto'
 */
    /**
     * @openapi
     * /vouchers:
     *   post:
     *     summary: Create a new voucher with details
     *     tags: [Vouchers]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateVoucherRequestDto'
     *     responses:
     *       201:
     *         description: Voucher created successfully
     *       500:
     *         description: Server error
     */
    router.post("/", validateDto(CreateVoucherRequestDto), voucherController.create);

    /**
     * @openapi
     * /vouchers/{id}:
     *   get:
     *     summary: Get voucher by ID
     *     tags: [Vouchers]
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
     *         description: Voucher details
     *       404:
     *         description: Voucher not found
     *       500:
     *         description: Server error
     */
    router.get("/:id", voucherController.getById);

    /**
     * @openapi
     * /vouchers/{id}:
     *   get:
     *     summary: Get all vouchers
     *     tags: [Vouchers]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: All Vouchers details
     *       404:
     *         description: Vouchers not found
     *       500:
     *         description: Server error
     */
    router.get("/", voucherController.getAll);


    /**
     * @openapi
     * /vouchers/{id}/grid:
     *   get:
     *     summary: Get voucher grid entries
     *     tags: [Vouchers]
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
     *         description: Voucher grid entries
     *       500:
     *         description: Server error
     */
    router.get("/:id/grid", voucherController.getGridEntries);

    /**
     * @openapi
     * /vouchers/{id}/pictures:
     *   get:
     *     summary: Get voucher pictures
     *     tags: [Vouchers]
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
     *         description: Voucher pictures
     *       500:
     *         description: Server error
     */
    router.get("/:id/pictures", voucherController.getPictures);
})();

export default router;