import express from "express";
import * as SupervisorController from "../controllers/supervisor.controller";
import {
    createUserSelectorMiddleware as auth,
    isSupervisorPreHandler,
} from "../middlewares/auth";
import { IRoute } from "@/types/router.types";

const mainRouter = express.Router();


const serviceRouter = express.Router();

const serviceRoutes: IRoute[] = [
    {
        path: '/status',
        method: 'post',
        handler: SupervisorController.supervisorChangeServiceStatus
    },
    {
        path: '/worker-details',
        method: 'get',
        handler: SupervisorController.supervisorGetServiceWorkerDetailsController
    },
    {
        path: '/problems',
        method: 'get',
        handler: SupervisorController.supervisorGetServiceProblems
    },
    {
        path: '/problem/',
        method: 'post',
        handler: SupervisorController.supervisorAddNewProblem
    },
    {
        path: '/problem/',
        method: 'delete',
        handler: SupervisorController.supervisorRemoveProblem
    },

];

serviceRoutes.forEach(route => serviceRouter[route.method](route.path, auth, isSupervisorPreHandler, route.handler));

const propertyPreparingRouter = express.Router();

const propertyPreparingRoutes: IRoute[] = [
    {
        path: '/add',
        method: 'post',
        handler: SupervisorController.supervisorAddPropertyPreparing
    },
    {
        path: '/end',
        method: 'post',
        handler: SupervisorController.supervisorEndPropertyPreparingService
    },
];

propertyPreparingRoutes.forEach(route => propertyPreparingRouter[route.method](route.path, auth, isSupervisorPreHandler, route.handler));

const otherRoutes: IRoute[] = [
    {
        path: '/materials/accept',
        method: 'post',
        handler: SupervisorController.supervisorAcceptMaterials
    },
    {
        path: '/technicians',
        method: 'get',
        handler: SupervisorController.supervisorGetTechniciansController
    },
    {
        path: '/assets',
        method: 'get',
        handler: SupervisorController.supervisorGetAssetsController
    },
    {
        path: '/statistics',
        method: 'get',
        handler: SupervisorController.supervisorGetStatisticsController
    },
    {
        path: '/workers/search/:id',
        method: 'get',
        handler: SupervisorController.supervisorSearchWorkersController
    }
];

otherRoutes.forEach(route => mainRouter[route.method](route.path, auth, isSupervisorPreHandler, route.handler));


mainRouter.use('/service', serviceRouter);
mainRouter.use('/property-preparing', propertyPreparingRouter);

export default mainRouter;