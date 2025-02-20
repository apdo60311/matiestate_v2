import { DatabaseConfig } from "../config/db.config";
import { AsyncContainerModule, Container } from "inversify";
import { DataSource } from "typeorm";
import { DI_TYPES } from "./di.types";
import { BuildingsRepository } from "../repositories/buildings.repository";
import { BuildingsService } from "../services/buildings.service";
import { BuildingsController } from "../controllers/buildings.controller";
import { CostCenterRepository } from "../repositories/cost-center.repository";
import { AccountRepository } from "../repositories/account.repository";

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

  container.bind<CostCenterRepository>(DI_TYPES.CostCenterRepository)
  .toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    return new CostCenterRepository(dataSource);
  })
  .inSingletonScope();

container.bind<AccountRepository>(DI_TYPES.AccountRepository)
.toDynamicValue(async (context) => {
  const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
  return new AccountRepository(dataSource);
})
.inSingletonScope();

// Bind Services
container.bind<BuildingsService>(DI_TYPES.BuildingsService)
  .toDynamicValue(async (context) => {
    const buildingsRepository = await context.container.getAsync<BuildingsRepository>(DI_TYPES.BuildingsRepository);
    const accountRepository = await context.container.getAsync<AccountRepository>(DI_TYPES.AccountRepository);
    const costCenterRepository = await context.container.getAsync<CostCenterRepository>(DI_TYPES.CostCenterRepository);
    
    return new BuildingsService(buildingsRepository,accountRepository,costCenterRepository);
  })
  .inSingletonScope();

// Bind Controllers
container.bind<BuildingsController>(DI_TYPES.BuildingsController)
  .toDynamicValue(async (context) => {
    const service = await context.container.getAsync<BuildingsService>(DI_TYPES.BuildingsService);
    return new BuildingsController(service);
  })
  .inSingletonScope();