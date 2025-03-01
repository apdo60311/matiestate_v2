import { DatabaseConfig } from "../config/db.config";
import { AsyncContainerModule, Container } from "inversify";
import { DataSource } from "typeorm";
import { DI_TYPES } from "./di.types";
import { BuildingsRepository } from "../repositories/buildings.repository";
import { BuildingsService } from "../services/buildings.service";
import { BuildingsController } from "../controllers/buildings.controller";
import { CostCenterRepository } from "../repositories/cost-center.repository";
import { AccountRepository } from "../repositories/account.repository";
import { ReservationPropertyService } from "../services/reservation-property.service";
import { ReservationPropertyController } from "../controllers/reservation-property.controller";
import { ReservationPropertyRepository } from "../repositories/reservation-property.repository";
import { ApartmentController } from "../controllers/apartment.controller";
import { ApartmentService } from "../services/apartment.service";
import { ApartmentRepository } from "../repositories/apartment/apartment.repository";
import { ApartmentAccumulateRepository } from "../repositories/apartment/apartment-accumulate.repository";
import { ApartmentSellingPriceRepository } from "../repositories/apartment/apartment-selling-price.repository";
import { ApartmentRentalPriceRepository } from "../repositories/apartment/apartment-rental-price.repository";
import { ApartmentPicturesRepository } from "../repositories/apartment/apartment-picture.repository";
import { ShopRepository } from "../repositories/shop/shop.repository";
import { ShopService } from "../services/shop.service";
import { ShopPicturesRepository } from "../repositories/shop/shop-pictures.repository";
import { ShopRentalPriceRepository } from "../repositories/shop/shop-rental-price.repository";
import { ShopSellingPriceRepository } from "../repositories/shop/shop-selling-price.repository";
import { ShopAccumulateRepository } from "../repositories/shop/shop-accumulate.repository";
import { ShopFixedAssetsRepository } from "../repositories/shop/shop-fixed-assets.repository";
import { ShopController } from "../controllers/shop.controller";
import { ParkingService } from "../services/parking.service";
import { ParkingRepository } from "../repositories/parking/parking.repository";
import { ParkingPicturesRepository } from "../repositories/parking/parking-pictures.repository";
import { ParkingRentalPriceRepository } from "../repositories/parking/parking-rental-price.repository";
import { ParkingSellingPriceRepository } from "../repositories/parking/parking-selling-price.repositroy";
import { ParkingAccumulateRepository } from "../repositories/parking/parking-accumulate.repository";
import { ParkingWalletRepository } from "../repositories/parking/parking-wallet.repository";
import { ParkingController } from "../controllers/parking.controller";
import { LandController } from "../controllers/land.controller";
import { LandService } from "../services/land.service";
import { LandRepository } from "../repositories/land/land.repository";
import { LandRentalPriceRepository } from "../repositories/land/land-rental-price.repository";
import { LandSellingPriceRepository } from "../repositories/land/land-selling-price.repository";
import { LandAccumulateRepository } from "../repositories/land/land-accumulate.repository";
import { LandWalletRepository } from "../repositories/land/land-wallet.repository";
import { VillaRepository } from "../repositories/villa/villa.repository";
import { VillaRentalPriceRepository } from "../repositories/villa/villa-rental-price.repository";
import { VillaSellingPriceRepository } from "../repositories/villa/villa-selling-price.repository";
import { VillaService } from "../services/villa.service";
import { VillaController } from "../controllers/villa.controller";
import { OwnerExpensesTypesRepository } from "../repositories/owner/owner-expenses-types.repository";
import { OwnerExpensesDetailsRepository } from "../repositories/owner/owner-expenses-details.repository";
import { OwnerExpensesRepository } from "../repositories/owner/owner-expenses.repository";
import { OwnerRepository } from "../repositories/owner/owner.repository";
import { OwnerService } from "../services/owner.service";
import { OwnerController } from "../controllers/owner.controller";
import { BankRepository } from "../repositories/bank.repository";
import { BankService } from "../services/bank.service";
import { BankController } from "../controllers/bank.controller";



export const container = new Container({ autoBindInjectable: true });

// DataSource 
container.bind<DataSource>(DI_TYPES.DataSource).toDynamicValue(async () => {
  const dbConfig = DatabaseConfig.getInstance();
  const dataSource = await dbConfig.getDataSource();
  
  // Initialize if not already initialized
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  
  return dataSource;
}).inSingletonScope();

// Bind Repositories
container.bind<BuildingsRepository>(DI_TYPES.BuildingsRepository)
  .toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    return new BuildingsRepository(dataSource);
  })
  .inSingletonScope();

  container.bind<CostCenterRepository>(DI_TYPES.CostCenterRepository)
  .toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    return new CostCenterRepository(dataSource);
  })
  .inSingletonScope();

container.bind<AccountRepository>(DI_TYPES.AccountRepository)
.toDynamicValue(async (context) => {
  const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return new AccountRepository(dataSource);
})
.inSingletonScope();

container.bind<ApartmentPicturesRepository>(DI_TYPES.ApartmentPicturesRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ApartmentPicturesRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ApartmentRentalPriceRepository>(DI_TYPES.ApartmentRentalPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ApartmentRentalPriceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ApartmentSellingPriceRepository>(DI_TYPES.ApartmentSellingPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ApartmentSellingPriceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ApartmentAccumulateRepository>(DI_TYPES.ApartmentAccumulateRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ApartmentAccumulateRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ShopRepository>(DI_TYPES.ShopRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ShopRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ShopPicturesRepository>(DI_TYPES.ShopPicturesRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ShopPicturesRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ShopRentalPriceRepository>(DI_TYPES.ShopRentalPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ShopRentalPriceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ShopSellingPriceRepository>(DI_TYPES.ShopSellingPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ShopSellingPriceRepository(dataSource);
    }
    )
    .inSingletonScope();

container.bind<ShopAccumulateRepository>(DI_TYPES.ShopAccumulateRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ShopAccumulateRepository(dataSource);
    }
    )
    .inSingletonScope();

container.bind<ShopFixedAssetsRepository>(DI_TYPES.ShopFixedAssetsRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ShopFixedAssetsRepository(dataSource);
    }
    )
    .inSingletonScope();

    container.bind<ParkingRepository>(DI_TYPES.ParkingRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ParkingRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ParkingPicturesRepository>(DI_TYPES.ParkingPicturesRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ParkingPicturesRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ParkingRentalPriceRepository>(DI_TYPES.ParkingRentalPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ParkingRentalPriceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ParkingSellingPriceRepository>(DI_TYPES.ParkingSellingPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ParkingSellingPriceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ParkingAccumulateRepository>(DI_TYPES.ParkingAccumulateRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ParkingAccumulateRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ParkingWalletRepository>(DI_TYPES.ParkingWalletRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ParkingWalletRepository(dataSource);
    })
    .inSingletonScope();

container.bind<LandRepository>(DI_TYPES.LandRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new LandRepository(dataSource);
    })
    .inSingletonScope();

container.bind<LandRentalPriceRepository>(DI_TYPES.LandRentalPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new LandRentalPriceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<LandSellingPriceRepository>(DI_TYPES.LandSellingPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new LandSellingPriceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<LandAccumulateRepository>(DI_TYPES.LandAccumulateRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new LandAccumulateRepository(dataSource);
    })
    .inSingletonScope();

container.bind<LandWalletRepository>(DI_TYPES.LandWalletRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new LandWalletRepository(dataSource);
    })
    .inSingletonScope();


container.bind<VillaRepository>(DI_TYPES.VillaRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new VillaRepository(dataSource);
    })
    .inSingletonScope();

container.bind<VillaRentalPriceRepository>(DI_TYPES.VillaRentalPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new VillaRentalPriceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<VillaSellingPriceRepository>(DI_TYPES.VillaSellingPriceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new VillaSellingPriceRepository(dataSource);
    })
    .inSingletonScope();


container.bind<OwnerRepository>(DI_TYPES.OwnerRepository)
  .toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    return new OwnerRepository(dataSource);
  })
  .inSingletonScope();

container.bind<OwnerExpensesRepository>(DI_TYPES.OwnerExpensesRepository)
  .toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    return new OwnerExpensesRepository(dataSource);
  })
  .inSingletonScope();

container.bind<OwnerExpensesDetailsRepository>(DI_TYPES.OwnerExpensesDetailsRepository)
  .toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    return new OwnerExpensesDetailsRepository(dataSource);
  })
  .inSingletonScope();

container.bind<OwnerExpensesTypesRepository>(DI_TYPES.OwnerExpensesTypesRepository)
  .toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    return new OwnerExpensesTypesRepository(dataSource);
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

  container.bind<ShopService>(DI_TYPES.ShopService)
  .toDynamicValue(async (context) => {
      const shopRepository = await context.container.getAsync<ShopRepository>(DI_TYPES.ShopRepository);
      const shopPicturesRepository = await context.container.getAsync<ShopPicturesRepository>(DI_TYPES.ShopPicturesRepository);
      const shopRentalPriceRepository = await context.container.getAsync<ShopRentalPriceRepository>(DI_TYPES.ShopRentalPriceRepository);
      const shopSellingPriceRepository = await context.container.getAsync<ShopSellingPriceRepository>(DI_TYPES.ShopSellingPriceRepository);
      const shopAccumulateRepository = await context.container.getAsync<ShopAccumulateRepository>(DI_TYPES.ShopAccumulateRepository);
      const shopFixedAssetsRepository = await context.container.getAsync<ShopFixedAssetsRepository>(DI_TYPES.ShopFixedAssetsRepository);

      return new ShopService(
          shopRepository,
          shopPicturesRepository,
          shopRentalPriceRepository,
          shopSellingPriceRepository,
          shopAccumulateRepository,
          shopFixedAssetsRepository
      );
  })
  .inSingletonScope();

  container.bind<ParkingService>(DI_TYPES.ParkingService)
    .toDynamicValue(async (context) => {
        const parkingRepository = await context.container.getAsync<ParkingRepository>(DI_TYPES.ParkingRepository);
        const parkingPicturesRepository = await context.container.getAsync<ParkingPicturesRepository>(DI_TYPES.ParkingPicturesRepository);
        const parkingRentalPriceRepository = await context.container.getAsync<ParkingRentalPriceRepository>(DI_TYPES.ParkingRentalPriceRepository);
        const parkingSellingPriceRepository = await context.container.getAsync<ParkingSellingPriceRepository>(DI_TYPES.ParkingSellingPriceRepository);
        const parkingAccumulateRepository = await context.container.getAsync<ParkingAccumulateRepository>(DI_TYPES.ParkingAccumulateRepository);
        const parkingWalletRepository = await context.container.getAsync<ParkingWalletRepository>(DI_TYPES.ParkingWalletRepository);

        return new ParkingService(
            parkingRepository,
            parkingPicturesRepository, 
            parkingRentalPriceRepository,
            parkingSellingPriceRepository,
            parkingAccumulateRepository,
            parkingWalletRepository
        );
    })
    .inSingletonScope();

container.bind<VillaService>(DI_TYPES.VillaService)
    .toDynamicValue(async (context) => {
        const villaRepository = await context.container.getAsync<VillaRepository>(DI_TYPES.VillaRepository);
        const villaRentalPriceRepository = await context.container.getAsync<VillaRentalPriceRepository>(DI_TYPES.VillaRentalPriceRepository);
        const villaSellingPriceRepository = await context.container.getAsync<VillaSellingPriceRepository>(DI_TYPES.VillaSellingPriceRepository);

        return new VillaService(
            villaRepository,
            villaRentalPriceRepository,
            villaSellingPriceRepository
        );
    })
    .inSingletonScope();

container.bind<OwnerService>(DI_TYPES.OwnerService)
    .toDynamicValue(async (context) => {
      const ownerRepository = await context.container.getAsync<OwnerRepository>(DI_TYPES.OwnerRepository);
      const ownerExpensesRepository = await context.container.getAsync<OwnerExpensesRepository>(DI_TYPES.OwnerExpensesRepository);
      const ownerExpensesDetailsRepository = await context.container.getAsync<OwnerExpensesDetailsRepository>(DI_TYPES.OwnerExpensesDetailsRepository);
      const ownerExpensesTypesRepository = await context.container.getAsync<OwnerExpensesTypesRepository>(DI_TYPES.OwnerExpensesTypesRepository);
  
      return new OwnerService(
        ownerRepository,
        ownerExpensesRepository,
        ownerExpensesDetailsRepository,
        ownerExpensesTypesRepository
      );
    })
    .inSingletonScope();

// Bind Controllers
container.bind<BuildingsController>(DI_TYPES.BuildingsController)
  .toDynamicValue(async (context) => {
    const service = await context.container.getAsync<BuildingsService>(DI_TYPES.BuildingsService);
    return new BuildingsController(service);
  })
  .inSingletonScope();

  container.bind<ReservationPropertyRepository>(DI_TYPES.ReservationPropertyRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        return new ReservationPropertyRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ReservationPropertyService>(DI_TYPES.ReservationPropertyService)
    .toDynamicValue(async (context) => {
        const repository = await context.container.getAsync<ReservationPropertyRepository>(
            DI_TYPES.ReservationPropertyRepository
        );
        return new ReservationPropertyService(repository);
    })
    .inSingletonScope();

container.bind<ReservationPropertyController>(DI_TYPES.ReservationPropertyController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<ReservationPropertyService>(
            DI_TYPES.ReservationPropertyService
        );
        return new ReservationPropertyController(service);
    })
    .inSingletonScope();

container.bind<ParkingController>(DI_TYPES.ParkingController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<ParkingService>(DI_TYPES.ParkingService);
        return new ParkingController(service);
    })
    .inSingletonScope();

container.bind<ApartmentRepository>(DI_TYPES.ApartmentRepository)
.toDynamicValue(async (context) => {
    const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    return new ApartmentRepository(dataSource);
})
.inSingletonScope();

container.bind<BankRepository>(DI_TYPES.BankRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new BankRepository(dataSource);
    })
    .inSingletonScope();


container.bind<ApartmentService>(DI_TYPES.ApartmentService)
.toDynamicValue(async (context) => {
    const apartmentRepository = await context.container.getAsync<ApartmentRepository>(
        DI_TYPES.ApartmentRepository
    );

    const apartmentPicturesRepository = await context.container.getAsync<ApartmentPicturesRepository>(
      DI_TYPES.ApartmentPicturesRepository
    )

    const apartmentSellingPriceRepository = await context.container.getAsync<ApartmentSellingPriceRepository>(
      DI_TYPES.ApartmentSellingPriceRepository
    )

    const apartmentRentalPriceRepository = await context.container.getAsync<ApartmentRentalPriceRepository>(
      DI_TYPES.ApartmentRentalPriceRepository
    )

    const apartmentAccumulateRepository = await context.container.getAsync<ApartmentAccumulateRepository>(
      DI_TYPES.ApartmentAccumulateRepository
    )


    return new ApartmentService(
        apartmentRepository,
        apartmentPicturesRepository,
        apartmentAccumulateRepository,
        apartmentRentalPriceRepository,
        apartmentSellingPriceRepository
    );
})
.inSingletonScope();

container.bind<LandService>(DI_TYPES.LandService)
    .toDynamicValue(async (context) => {
        const landRepository = await context.container.getAsync<LandRepository>(DI_TYPES.LandRepository);
        const landRentalPriceRepository = await context.container.getAsync<LandRentalPriceRepository>(DI_TYPES.LandRentalPriceRepository);
        const landSellingPriceRepository = await context.container.getAsync<LandSellingPriceRepository>(DI_TYPES.LandSellingPriceRepository);
        const landAccumulateRepository = await context.container.getAsync<LandAccumulateRepository>(DI_TYPES.LandAccumulateRepository);
        const landWalletRepository = await context.container.getAsync<LandWalletRepository>(DI_TYPES.LandWalletRepository);

        return new LandService(
            landRepository,
            landRentalPriceRepository,
            landSellingPriceRepository, 
            landAccumulateRepository,
            landWalletRepository
        );
    })
    .inSingletonScope();

container.bind<BankService>(DI_TYPES.BankService)
.toDynamicValue(async (context) => {
    const bankRepository = await context.container.getAsync<BankRepository>(DI_TYPES.BankRepository);
    return new BankService(bankRepository);
})
.inSingletonScope();

container.bind<ApartmentController>(DI_TYPES.ApartmentController)
.toDynamicValue(async (context) => {
    const service = await context.container.getAsync<ApartmentService>(
        DI_TYPES.ApartmentService
    );
    return new ApartmentController(service);
})
.inSingletonScope();

container.bind<ShopController>(DI_TYPES.ShopController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<ShopService>(DI_TYPES.ShopService);
        return new ShopController(service);
    })
    .inSingletonScope();

container.bind<LandController>(DI_TYPES.LandController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<LandService>(DI_TYPES.LandService);
        return new LandController(service);
    })
    .inSingletonScope();

    container.bind<VillaController>(DI_TYPES.VillaController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<VillaService>(DI_TYPES.VillaService);
        return new VillaController(service);
    })
    .inSingletonScope();

container.bind<OwnerController>(DI_TYPES.OwnerController)
.toDynamicValue(async (context) => {
    const service = await context.container.getAsync<OwnerService>(DI_TYPES.OwnerService);
    return new OwnerController(service);
})
.inSingletonScope();

container.bind<BankController>(DI_TYPES.BankController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<BankService>(DI_TYPES.BankService);
        return new BankController(service);
    })
    .inSingletonScope();