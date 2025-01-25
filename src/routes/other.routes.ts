import express from "express";
import * as OtherController from "../controllers/other.controller";
import {
    createUserSelectorMiddleware as auth,
    isCustomerPreHandler,
    isSupervisorPreHandler,
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


router.post("/owner/getAllOwnerCash", auth, OtherController.getAllOwnerCashController);
router.post("/owner/getAllOwnerCheck", auth, OtherController.getAllOwnerCheckController);
router.post("/owner/getOwnerContract", auth, OtherController.getOwnerContractController);
router.post("/owner/getOwnerUnits", auth, OtherController.getOwnerUnitsController);
router.post("/getCustomerUnits", auth, OtherController.getCustomerUnitsController);
router.post("/customer/getContractDetails", auth, isCustomerPreHandler, OtherController.getContractDetailsController);
router.post("/getContractCheque", auth, OtherController.getContractChequeController);
router.post("/getContractCash", auth, OtherController.getContractCashController);
router.post("/customer/getPayments", auth, OtherController.customerGetPaymentsController);
router.post("/supervisor/getTechnicians",auth, OtherController.supervisorGetTechniciansController);
router.post("/customer/rateWorker", auth, OtherController.customerRateWorkerController);
router.post("/customer/addRequestEvacuation", auth, OtherController.customerAddRequestEvacuationController);
router.get("/customer/getRequestsEvacuation", auth, OtherController.customerGetRequestsEvacuationController);
router.post("/customer/updateEvacuationRequestStatus", auth, isCustomerPreHandler, OtherController.customerUpdateEvacuationRequestStatusController);

router.post("/owner/getStatisticsCheques",auth, OtherController.ownerGetStatisticsChequesController);
router.post("/owner/getStatisticsMaintenance",auth, OtherController.ownerGetStatisticsMaintenanceController);
router.post("/owner/getStatisticsRevenue",auth, OtherController.ownerGetStatisticsRevenueController);
router.post("/supervisor/assets", auth, OtherController.supervisorGetAssetsController);
router.get("/getServicesStatistics",auth, OtherController.getServicesStatisticsController);
router.post("/supervisor/getServiceWorkerDetails", auth,isSupervisorPreHandler, OtherController.supervisorGetServiceWorkerDetailsController);
router.post("/getServiceById", auth, OtherController.getServiceByIdController);
router.post("/owner/getExpensesTypes", auth, OtherController.ownerGetExpensesTypesController);
router.post("/owner/getOwnerFinancialDetails",auth, OtherController.ownerGetOwnerFinancialDetailsController);
router.post("/customer/getAllCustomerChequesCount", auth, OtherController.customerGetAllCustomerChequesCountController);
router.post("/customer/getAllCustomerContractCount", auth, OtherController.customerGetAllCustomerContractCountController);
router.post("/customer/getUnitContract", auth, OtherController.customerGetUnitContractController);

router.post("/reports/complaints-report",  OtherController.reportsComplaintsReportController);
router.post("/reports/warehouse-report",  OtherController.reportsWareHouseReportController);
router.post("/reports/worker-report",  OtherController.reportsWorkerReportController);
router.post("/reports/owner-expenses-report",  OtherController.reportsOwnerExpensesReportController);
router.get("/supervisor/getStatistics", auth,isSupervisorPreHandler, OtherController.supervisorGetStatisticsController);
router.get("/worker/getStatistics",auth, isWorkerPreHandler, OtherController.workerGetStatisticsController);
router.get("/getWorkerByService/:service_id", auth, OtherController.getWorkerByServiceController);


export default router;