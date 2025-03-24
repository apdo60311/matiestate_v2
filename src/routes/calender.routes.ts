import express from "express";
import { createUserSelectorMiddleware as auth } from "../middlewares/auth";
import { IRoute } from "@/types/router.types";
import { getCalenderByCategoryAndBuildingId } from "@/controllers/calender.controller";

const mainRouter = express.Router();

const calenderRoutes: IRoute[] = [
    {
        path: "/",
        method: "get",
        middlewares: [auth],
        handler: getCalenderByCategoryAndBuildingId
    }
];

calenderRoutes.forEach((route: IRoute) => {
    mainRouter[route.method](route.path, ...(route.middlewares || []), route.handler);
});


export default mainRouter;