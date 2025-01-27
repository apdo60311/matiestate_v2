import express from "express";
import * as WorkerController from "../controllers/worker.controller";
import {
    createUserSelectorMiddleware as auth,
    isWorkerPreHandler,
} from "../middlewares/auth";

const router = express.Router();


router.post("/startingService", auth, isWorkerPreHandler,  WorkerController.workerStartingService);
router.post("/crashesService", auth, isWorkerPreHandler,  WorkerController.workerCrashesService);
router.post("/requestMaterials", auth, isWorkerPreHandler,  WorkerController.workerRequestMaterials);

router.post("/endService", auth, isWorkerPreHandler, WorkerController.workerEndService);
router.post("/getServiceLackReason", auth, isWorkerPreHandler,  WorkerController.workerGetServiceLackReason);


router.post("/startPropertyPreparingService", auth, isWorkerPreHandler,  WorkerController.workerStartPropertyPreparingService);
router.post("/completePropertyPreparingService", auth, isWorkerPreHandler,  WorkerController.workerCompletePropertyPreparingService);
router.get("/getStatistics",auth, isWorkerPreHandler, WorkerController.workerGetStatisticsController);

export default router;