import express from "express";
import * as ServicesController from "../controllers/services.controller";
import {
    createUserSelectorMiddleware as auth,
} from "../middlewares/auth";
import { IRoute } from "@/types/router.type";

const mainRouter = express.Router();

const workerRouter = express.Router();

const workerRoutes : IRoute[] = [
    {
        path: '/:service_id',
        method: 'get',
        handler: ServicesController.getWorkerByServiceController
    }
];

workerRoutes.forEach(route => workerRouter[route.method](route.path, auth, route.handler));

mainRouter.get("/statistics",auth, ServicesController.getServicesStatisticsController);
mainRouter.get("/", auth, ServicesController.getServiceByIdController);

mainRouter.use('/worker', workerRouter);

export default mainRouter;