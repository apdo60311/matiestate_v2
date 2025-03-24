import express from "express";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { validateDto } from "../middlewares/validation.middleware";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";
import { EntriesController } from "../controllers/entry.controller";
import {
  CreateEntryRequestDto,
  UpdateEntryRequestDto,
} from "../dtos/create/entry.dtos";

const router = express.Router();

(async () => {
  const entriesController = await container.getAsync<EntriesController>(
    DI_TYPES.EntriesController
  );

  /**
   * @openapi
   * components:
   *   schemas:
   *     EntryMainData:
   *       type: object
   *       required:
   *         - debit
   *         - credit
   *         - difference
   *       properties:
   *         currencyId:
   *           type: string
   *           format: uuid
   *         note:
   *           type: string
   *         debit:
   *           type: number
   *         credit:
   *           type: number
   *         difference:
   *           type: number
   *         currencyVal:
   *           type: number
   *         createdFrom:
   *           type: number
   *         createdFromId:
   *           type: string
   *         tenantId:
   *           type: string
   *           format: uuid
   *
   *     EntryGridData:
   *       type: object
   *       required:
   *         - accountId
   *       properties:
   *         accountId:
   *           type: string
   *           format: uuid
   *         debit:
   *           type: number
   *         credit:
   *           type: number
   *         currencyId:
   *           type: string
   *           format: uuid
   *         costCenterId:
   *           type: string
   *           format: uuid
   *         observeAccountId:
   *           type: string
   *           format: uuid
   *         note:
   *           type: string
   *         tenantId:
   *           type: string
   *           format: uuid
   *         currencyVal:
   *           type: number
   */
  /**
   * @openapi
   * /entries:
   *   post:
   *     summary: Create a new entry with main and grid data
   *     tags: [Entries]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               mainData:
   *                 $ref: '#/components/schemas/EntryMainData'
   *               gridData:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/EntryGridData'
   *     responses:
   *       201:
   *         description: Entry created successfully
   *       500:
   *         description: Server error
   */
  router.post(
    "/",
    validateDto(CreateEntryRequestDto),
    entriesController.create
  );

  /**
   * @openapi
   * /entries/{id}:
   *   get:
   *     summary: Get an entry by ID
   *     tags: [Entries]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Entry details
   *       404:
   *         description: Entry not found
   *       500:
   *         description: Server error
   */
  router.get("/:id", entriesController.getById);

  /**
   * @openapi
   * /entries/{id}:
   *   put:
   *     summary: Update an entry
   *     tags: [Entries]
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
   *             type: object
   *             properties:
   *               mainData:
   *                 $ref: '#/components/schemas/EntryMainData'
   *               gridData:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/EntryGridData'
   *     responses:
   *       200:
   *         description: Entry updated successfully
   *       500:
   *         description: Server error
   */
  router.put(
    "/:id",
    validateDto(UpdateEntryRequestDto),
    entriesController.update
  );

  /**
   * @openapi
   * /entries/{id}:
   *   delete:
   *     summary: Delete an entry
   *     tags: [Entries]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Entry deleted successfully
   *       500:
   *         description: Server error
   */
  router.delete("/:id", entriesController.delete);
})();

export default router;
