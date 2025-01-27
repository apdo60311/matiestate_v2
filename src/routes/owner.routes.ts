import express from "express";
import * as OwnerController from "../controllers/owner.controller";
import {
    createUserSelectorMiddleware as auth,
    isWorkerPreHandler,
     isSuplierPreHandler,
} from "../middlewares/auth";
import { IRoute } from "@/types/router.type";


const mainRouter = express.Router();


const statisticsRouter = express.Router();

const statisticsRoutes: IRoute[] = [
    {
        path:"cheques",
        method:"get",
        handler: OwnerController.ownerGetStatisticsChequesController
    },

    {
        path:"maintenance",
        method:"get",
        handler: OwnerController.ownerGetStatisticsMaintenanceController
    },
    {
        path:"revenue",
        method:"get",
        handler: OwnerController.ownerGetStatisticsRevenueController
    },


];

statisticsRoutes.forEach(route => statisticsRouter[route.method](route.path, auth, isSuplierPreHandler, route.handler));

const otherRoutes: IRoute[] = [
    {
        path:"/cash",
        method:"get",
        handler: OwnerController.getAllOwnerCashController
    },
    {
        path:"/check",
        method:"get",
        handler: OwnerController.getAllOwnerCheckController
    },
    {
        path:"/contract",
        method:"get",
        handler: OwnerController.getOwnerContractController
    },
    {
        path:"/units",
        method:"get",
        handler: OwnerController.getOwnerUnitsController
    },
    {
        path:"/expenses-types",
        method:"get",
        handler: OwnerController.ownerGetExpensesTypesController
    },
    {
        path:"/financial-details",
        method:"get",
        handler: OwnerController.ownerGetOwnerFinancialDetailsController
    },
];
otherRoutes.forEach(route => mainRouter[route.method](route.path, auth, isWorkerPreHandler, route.handler));

mainRouter.use('/statistics', statisticsRouter);

export default mainRouter;


