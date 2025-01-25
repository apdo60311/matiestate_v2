import express from "express";
import * as BookingController from "../controllers/booking.controller";
import {
    createUserSelectorMiddleware as auth,
    isCustomerPreHandler,
    isSupervisorPreHandler,
    isWorkerPreHandler,
} from "../middlewares/auth";

const router = express.Router();


// Auth
router.post("/getBookings", auth,  BookingController.getBookingsController);


router.post("/customer/bookService", auth, isCustomerPreHandler,  BookingController.customerBookService);
router.post("/customer/updateServiceDate", auth, isCustomerPreHandler, BookingController.customerUpdateServiceDate);

router.post("/supervisor/changeServiceStatus", auth, isSupervisorPreHandler,  BookingController.supervisorChangeServiceStatus);
router.post("/worker/startingService", auth, isWorkerPreHandler,  BookingController.workerStartingService);
router.post("/worker/crashesService", auth, isWorkerPreHandler,  BookingController.workerCrashesService);
router.post("/worker/requestMaterials", auth, isWorkerPreHandler,  BookingController.workerRequestMaterials);

router.post("/supervisor/acceptMaterials", auth, isSupervisorPreHandler,  BookingController.supervisorAcceptMaterials);
router.post("/worker/endService", auth, isWorkerPreHandler, BookingController.workerEndService);
router.post("/worker/getServiceLackReason", auth, isWorkerPreHandler,  BookingController.workerGetServiceLackReason);

router.post("/supervisor/getServiceProblems", auth, isSupervisorPreHandler,  BookingController.supervisorGetServiceProblems);
router.post("/supervisor/addPropertyPreparing", auth, isSupervisorPreHandler,  BookingController.supervisorAddPropertyPreparing);
router.post("/supervisor/addNewProblem", auth, isSupervisorPreHandler,  BookingController.supervisorAddNewProblem);
router.post("/supervisor/removeProblem", auth, isSupervisorPreHandler,  BookingController.supervisorRemoveProblem);

router.post("/worker/startPropertyPreparingService", auth, isWorkerPreHandler,  BookingController.workerStartPropertyPreparingService);
router.post("/worker/completePropertyPreparingService", auth, isWorkerPreHandler,  BookingController.workerCompletePropertyPreparingService);

router.post("/supervisor/endPropertyPreparingService", auth, isSupervisorPreHandler,  BookingController.supervisorEndPropertyPreparingService);

export default router;