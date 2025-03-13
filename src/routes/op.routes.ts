import { Router } from "express";
import { OpController } from "../controllers/op.controller";
import { container } from "../di/di.config";
import { DI_TYPES } from "../di/di.types";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateOpCollectionDto, CreateOpDeportationDto, CreateOpPartialCollectionDto, CreateOpReturnDto } from "../dtos/create-op.dto";

const router = Router();


(async () => {

    const opController = await container.getAsync<OpController>(
        DI_TYPES.OpController
    );

    router.post("/collection", validateDto(CreateOpCollectionDto), opController.createCollection);
    router.get("/collections", opController.getAllCollections);
    router.get("/collection/:id", opController.getCollectionById);

    router.post("/deportation", validateDto(CreateOpDeportationDto), opController.createDeportation);
    router.get("/deportations", opController.getAllDeportations);
    router.get("/deportation/:id", opController.getDeportationById);

    router.post("/partial-collection", validateDto(CreateOpPartialCollectionDto), opController.createPartialCollection);
    router.get("/partial-collections", opController.getAllPartialCollections);
    router.get("/partial-collection/:id", opController.getPartialCollectionById);

    router.post("/return", validateDto(CreateOpReturnDto), opController.createReturn);
    router.get("/returns", opController.getAllReturns);
    router.get("/return/:id", opController.getReturnById);
    router.get("/returns/cheque/:chequeId", opController.getReturnsByChequeId);

})();


export default router;
