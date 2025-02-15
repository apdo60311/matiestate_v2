import { container } from "../di/di.config";
import { BuildingsController } from "../controllers/buildings.controller";
import express from "express";
import { DI_TYPES } from "../di/di.types";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateBuildingDto } from "../dtos/create-building.dto";
import { logger } from "../utils/logger";

const router = express.Router();


(async () => {
    const buildingsController = await container.getAsync<BuildingsController>(DI_TYPES.BuildingsController);

    router.get("/", buildingsController.getAll);
    router.get("/:id", buildingsController.get);
    router.post("/",validateDto(CreateBuildingDto) ,buildingsController.create);
    router.put("/:id", buildingsController.update);
    
})()


export default router;