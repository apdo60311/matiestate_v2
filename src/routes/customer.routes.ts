import express from "express";
import * as CustomerController from "../controllers/customer.controller";
import {
    createUserSelectorMiddleware as auth,
    isCustomerPreHandler,
} from "../middlewares/auth";
import { IRoute } from "@/types/router.types";


const mainRouter = express.Router();

const serviceRouter = express.Router();

const serviceRoutes: IRoute[] = [
    {
        path: "/book",
        method: "post",
        handler: CustomerController.customerBookService,
    },
    {
        path: "/update-date",
        method: "put",
        handler: CustomerController.customerUpdateServiceDate
    }
];

serviceRoutes.forEach(route => serviceRouter[route.method](route.path, route.handler));


const contractRoutes: IRoute[] = [
    {
        path: "/contract/details",
        method: "get",
        handler: CustomerController.getContractDetailsController,
    },
    {
        path: "/contracts/count",
        method: "get",
        handler: CustomerController.customerGetAllCustomerContractCountController,
    },
    {
        path: "/contract/cheque",
        method: "get",
        handler: CustomerController.getContractChequeController,
    },
];

contractRoutes.forEach(route => mainRouter[route.method](route.path, auth, isCustomerPreHandler, route.handler));


const requestEvacuationRoutes: IRoute[] = [
    {
        path: "/evacuations/request",
        method: "get",
        handler: CustomerController.customerGetRequestsEvacuationController,
    },

    {
        path: "/evacuations/request",
        method: "post",
        handler: CustomerController.customerAddRequestEvacuationController,
    },
    {
        path: "/evacuations/request",
        method: "put",
        handler: CustomerController.customerUpdateEvacuationRequestStatusController,
    },
]

requestEvacuationRoutes.forEach(route => mainRouter[route.method](route.path, auth, isCustomerPreHandler, route.handler));

const unitRoutes: IRoute[] = [
    {
        path: "/unit/contract",
        method: "get",
        handler: CustomerController.customerGetUnitContractController,
    },
    {
        path: "/units",
        method: "get",
        handler: CustomerController.getCustomerUnitsController,
    },
];

unitRoutes.forEach(route => mainRouter[route.method](route.path, auth, route.handler));

const otherRoutes: IRoute[] = [
    {
        path: "/payments",
        method: "get",
        handler: CustomerController.customerGetPaymentsController,
    },

    {
        path: "/rate-worker",
        method: "get",
        handler: CustomerController.customerGetPaymentsController,
    },

    {
        path: "/cheques",
        method: "get",
        handler: CustomerController.customerGetAllCustomerChequesCountController,
    },

];

otherRoutes.forEach(route => mainRouter[route.method](route.path, auth, route.handler));


mainRouter.use('/service', serviceRouter);

export default mainRouter;
