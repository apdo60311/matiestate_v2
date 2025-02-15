import { DatabaseConfig } from "../config/db.config";
import { AsyncContainerModule, Container } from "inversify";
import { DataSource } from "typeorm";
import { DI_TYPES } from "./di.types";
import { BuildingsRepository } from "../repositories/buildings.repository";
import { BuildingsService } from "../services/buildings.service";
import { BuildingsController } from "../controllers/buildings.controller";

export const container = new Container({ autoBindInjectable: true });

// DataSource 
container.bind<DataSource>(DI_TYPES.DataSource).toDynamicValue(async () => {
  const dataSource = await DatabaseConfig.getInstance().getDataSource();
  return dataSource;
}).inSingletonScope();

// Bind Repositories
container.bind<BuildingsRepository>(DI_TYPES.BuildingsRepository)
  .toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    return new BuildingsRepository(dataSource);
  })
  .inSingletonScope();

// Bind Services
container.bind<BuildingsService>(DI_TYPES.BuildingsService)
  .toDynamicValue(async (context) => {
    const repository = await context.container.getAsync<BuildingsRepository>(DI_TYPES.BuildingsRepository);
    return new BuildingsService(repository);
  })
  .inSingletonScope();

// Bind Controllers
container.bind<BuildingsController>(DI_TYPES.BuildingsController)
  .toDynamicValue(async (context) => {
    const service = await context.container.getAsync<BuildingsService>(DI_TYPES.BuildingsService);
    return new BuildingsController(service);
  })
  .inSingletonScope();

// export const initializeContainer = async () => {
//   await container.loadAsync(bindings);
//   return container;
// };
