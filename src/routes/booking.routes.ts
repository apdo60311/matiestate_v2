import express from "express";
import * as BookingController from "../controllers/booking.controller";
import {
    createUserSelectorMiddleware as auth,
} from "../middlewares/auth";
import { IRoute } from "@/types/router.types";

const mainRouter = express.Router();

const bookingsRoutes: IRoute[] = [
    { path: "/", method: "get", handler: BookingController.getBookingsController },
];

bookingsRoutes.forEach(route => mainRouter[route.method](route.path, auth, route.handler));

export default mainRouter;