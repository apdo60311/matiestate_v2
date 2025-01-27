import express from "express";
import * as OtherController from "../controllers/other.controller";
import {
    createUserSelectorMiddleware as auth,
    isWorkerPreHandler,
     isSuplierPreHandler,
} from "../middlewares/auth";

const router = express.Router();

router.get("/getCategories", auth, OtherController.getCategoriesController);
router.post("/getCategoryProblemsByCategoryId", OtherController.getCategoryProblemsByCategoryIdController);
router.get("/owner/getOwnerBuildings",auth, isSuplierPreHandler, OtherController.getOwnerBuildingsController);
router.get("/owner/getUserBuilding", auth, isWorkerPreHandler, OtherController.getUserBuildingController);
router.get("/getBuildings", auth, OtherController.getBuildingsController);
router.get("/getUserCategories", auth, OtherController.getUserCategoriesController);
router.post("/getUnitsByBuildingId", OtherController.getUnitsByBuildingIdController);

router.get("/materials/:categoryId/:name", OtherController.getMaterialsController);

router.post("/uploadAttachment/:entity_type/:id/:attachment_type", OtherController.uploadAttachmentController);
router.post("/create/:tableName", OtherController.createRecordController);
router.post("/read/:tableName", OtherController.readRecordsController);
router.post("/update/:tableName", OtherController.updateRecordsController);
router.post("/delete/:tableName", OtherController.deleteRecordsController);


router.get("/getNotifications", auth, OtherController.getNotificationsController);
router.get("/getUnreadNotificationsCount", auth, OtherController.getUnreadNotificationsCountController);
router.post("/updateNotificationsStatus", auth, OtherController.updateNotificationsStatusController);


router.post("/getContractCash", auth, OtherController.getContractCashController);



export default router;