import { Router } from "express";
import { OpController } from "../controllers/op.controller";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateOpCollectionDto, CreateOpDeportationDto, CreateOpPartialCollectionDto, CreateOpReturnDto } from "../dtos/create/op.dtos";

const router = Router();


(async () => {

   const opController = await container.getAsync<OpController>(
      DI_TYPES.OpController
   );

   /**
    * @openapi
    * components:
    *   schemas:
    *     CreateOpCollectionDto:
    *       type: object
    *       required:
    *         - amount
    *         - currency_id
    *         - debit_account_id
    *         - credit_account_id
    *       properties:
    *         amount:
    *           type: number
    *           description: The amount to be collected
    *         currency_id:
    *           type: string
    *           format: uuid
    *           description: ID of the currency
    *         debit_account_id:
    *           type: string
    *           format: uuid
    *           description: ID of the debit account
    *         credit_account_id:
    *           type: string
    *           format: uuid
    *           description: ID of the credit account
    *         cost_center_id:
    *           type: string
    *           format: uuid
    *           description: ID of the cost center
    *         note:
    *           type: string
    *           description: Additional notes
    *         commission_value:
    *           type: number
    *           description: Value of the commission
    *         commission_percentage:
    *           type: number
    *           description: Percentage of the commission
    *         commission_debit_id:
    *           type: string
    *           format: uuid
    *           description: ID of the commission debit account
    *         commission_credit_id:
    *           type: string
    *           format: uuid
    *           description: ID of the commission credit account
    *         commission_cost_center_id:
    *           type: string
    *           format: uuid
    *           description: ID of the commission cost center
    *         commission_note:
    *           type: string
    *           description: Notes about the commission
    *         accounting_voucher_main_data_id:
    *           type: string
    *           format: uuid
    *           description: ID of the accounting voucher main data
    *         gen_entries:
    *           type: boolean
    *           description: Whether to generate entries
    *         currency_val:
    *           type: number
    *           description: Currency value
    *
    *     CreateOpDeportationDto:
    *       type: object
    *       required:
    *         - amount
    *         - currency_id
    *         - debit_account_id
    *         - credit_account_id
    *         - cheque_id
    *       properties:
    *         amount:
    *           type: number
    *           description: The amount to be deported
    *         currency_id:
    *           type: string
    *           format: uuid
    *           description: ID of the currency
    *         debit_account_id:
    *           type: string
    *           format: uuid
    *           description: ID of the debit account
    *         credit_account_id:
    *           type: string
    *           format: uuid
    *           description: ID of the credit account
    *         cost_center_id:
    *           type: string
    *           format: uuid
    *           description: ID of the cost center
    *         note:
    *           type: string
    *           description: Additional notes
    *         accounting_voucher_main_data_id:
    *           type: string
    *           format: uuid
    *           description: ID of the accounting voucher main data
    *         gen_entries:
    *           type: boolean
    *           description: Whether to generate entries
    *         cheque_id:
    *           type: string
    *           format: uuid
    *           description: ID of the associated cheque
    *         currency_val:
    *           type: number
    *           description: Currency value
    *
    *     CreateOpPartialCollectionDto:
    *       type: object
    *       required:
    *         - amount
    *         - currency_id
    *         - debit_account_id
    *         - credit_account_id
    *         - cheque_id
    *         - number
    *       properties:
    *         amount:
    *           type: number
    *           description: The partial amount to be collected
    *         currency_id:
    *           type: string
    *           format: uuid
    *           description: ID of the currency
    *         debit_account_id:
    *           type: string
    *           format: uuid
    *           description: ID of the debit account
    *         credit_account_id:
    *           type: string
    *           format: uuid
    *           description: ID of the credit account
    *         cost_center_id:
    *           type: string
    *           format: uuid
    *           description: ID of the cost center
    *         note:
    *           type: string
    *           description: Additional notes
    *         commission_value:
    *           type: number
    *           description: Value of the commission
    *         commission_percentage:
    *           type: number
    *           description: Percentage of the commission
    *         commission_debit_id:
    *           type: string
    *           format: uuid
    *           description: ID of the commission debit account
    *         commission_credit_id:
    *           type: string
    *           format: uuid
    *           description: ID of the commission credit account
    *         commission_cost_center_id:
    *           type: string
    *           format: uuid
    *           description: ID of the commission cost center
    *         commission_note:
    *           type: string
    *           description: Notes about the commission
    *         accounting_voucher_main_data_id:
    *           type: string
    *           format: uuid
    *           description: ID of the accounting voucher main data
    *         total_value:
    *           type: number
    *           description: Total value
    *         total_sum:
    *           type: number
    *           description: Total sum
    *         rest:
    *           type: number
    *           description: Remaining amount
    *         total_sum_prev:
    *           type: number
    *           description: Previous total sum
    *         gen_entries:
    *           type: boolean
    *           description: Whether to generate entries
    *         cheque_id:
    *           type: string
    *           format: uuid
    *           description: ID of the associated cheque
    *         currency_val:
    *           type: number
    *           description: Currency value
    *         number:
    *           type: number
    *           description: Partial collection number
    *
    *     CreateOpReturnDto:
    *       type: object
    *       required:
    *         - cheque_id
    *         - amount
    *       properties:
    *         cheque_id:
    *           type: string
    *           format: uuid
    *           description: ID of the associated cheque
    *         amount:
    *           type: number
    *           description: The amount to be returned
    */

   /**
* @openapi
* /collection:
*   post:
*     summary: Create a new op collection
*     tags: [collection]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CreateOpCollectionDto'
*     responses:
*       201:
*         description: collection created successfully
*       500:
*         description: Server error
*/

   router.post("/collection", validateDto(CreateOpCollectionDto), opController.createCollection);


   /**
* @openapi
* /collections:
*   get:
*     summary: Get all collections
*     tags: [collections]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of all collections
*       500:
*         description: Server error
*/
   router.get("/collections", opController.getAllCollections);


   /**
* @openapi
* /collections/{id}:
*   get:
*     summary: Get collection by ID
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
*         description: collection details
*       404:
*         description: collection not found
*       500:
*         description: Server error
*/
   router.get("/collection/:id", opController.getCollectionById);


   /**
   * @openapi
   * /deportation:
   *   post:
   *     summary: Create a new deportation
   *     tags: [deportation]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateOpDeportationDto'
   *     responses:
   *       201:
   *         description: Deportation created successfully
   *       500:
   *         description: Server error
   */
   router.post("/deportation", validateDto(CreateOpDeportationDto), opController.createDeportation);


   /**
* @openapi
* /deportations:
*   get:
*     summary: Get all deportations
*     tags: [deportation]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of all deportations
*       500:
*         description: Server error
*/
   router.get("/deportations", opController.getAllDeportations);

   /**
 * @openapi
 * /deportation/{id}:
 *   get:
 *     summary: Get deportation by ID
 *     tags: [deportation]
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
 *         description: Deportation details
 *       404:
 *         description: Deportation not found
 *       500:
 *         description: Server error
 */
   router.get("/deportation/:id", opController.getDeportationById);

   /**
* @openapi
* /partial-collection:
*   post:
*     summary: Create a new partial collection
*     tags: [partial-collection]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CreateOpPartialCollectionDto'
*     responses:
*       201:
*         description: Partial collection created successfully
*       500:
*         description: Server error
*/
   router.post("/partial-collection", validateDto(CreateOpPartialCollectionDto), opController.createPartialCollection);


   /**
* @openapi
* /partial-collections:
*   get:
*     summary: Get all partial collections
*     tags: [partial-collection]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of all partial collections
*       500:
*         description: Server error
*/
   router.get("/partial-collections", opController.getAllPartialCollections);

   /**
* @openapi
* /partial-collection/{id}:
*   get:
*     summary: Get partial collection by ID
*     tags: [partial-collection]
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
*         description: Partial collection details
*       404:
*         description: Partial collection not found
*       500:
*         description: Server error
*/
   router.get("/partial-collection/:id", opController.getPartialCollectionById);

   /**
 * @openapi
 * /return:
 *   post:
 *     summary: Create a new return
 *     tags: [return]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOpReturnDto'
 *     responses:
 *       201:
 *         description: Return created successfully
 *       500:
 *         description: Server error
 */
   router.post("/return", validateDto(CreateOpReturnDto), opController.createReturn);

   /**
* @openapi
* /returns:
*   get:
*     summary: Get all returns
*     tags: [return]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of all returns
*       500:
*         description: Server error
*/
   router.get("/returns", opController.getAllReturns);

   /**
    * @openapi
    * /return/{id}:
    *   get:
    *     summary: Get return by ID
    *     tags: [return]
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
    *         description: Return details
    *       404:
    *         description: Return not found
    *       500:
    *         description: Server error
    */
   router.get("/return/:id", opController.getReturnById);

   /**
    * @openapi
    * /returns/cheque/{chequeId}:
    *   get:
    *     summary: Get returns by cheque ID
    *     tags: [return]
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: chequeId
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       200:
    *         description: Returns associated with the cheque
    *       404:
    *         description: No returns found for this cheque
    *       500:
    *         description: Server error
    */
   router.get("/returns/cheque/:chequeId", opController.getReturnsByChequeId);

})();


export default router;
