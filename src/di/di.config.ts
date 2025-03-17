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
import { CurrencyRepository } from "../repositories/currency.repository";
import { CurrencyService } from "../services/currency.service";
import { CurrencyController } from "../controllers/currency.controller";
import { LessorService } from "../services/lessor.service";
import { LessorRepository } from "../repositories/lessor.repository";
import { LessorController } from "../controllers/lessor.controller";
import { SellerService } from "../services/seller.service";
import { SellerRepository } from "../repositories/seller.repository";
import { SellerController } from "../controllers/seller.controller";
import { PropertyValuesRepository } from "../repositories/property-values.repository";
import { ChequePatternRepository } from '../repositories/patterns/cheque-pattern.repository';
import { ContractPatternRepository } from '../repositories/patterns/contract-pattern.repository';
import { BillPatternRepository } from '../repositories/patterns/bill-pattern.repository';
import { VoucherPatternRepository } from '../repositories/patterns/voucher-pattern.repository';
import { AccountingVoucherPatternRepository } from '../repositories/patterns/account-voucher-pattern.repository';
import { PatternService } from "../services/pattern.service";
import { PatternController } from "../controllers/pattern.controller";
import { MaterialRepository } from "../repositories/material/material.repository";
import { MaterialGroupRepository } from "../repositories/material/material-group.repository";
import { MaterialBalanceRepository } from "../repositories/material/material-balance.repository";
import { MaterialMinimumRepository } from "../repositories/material/material-minimum.repository";
import { MaterialPricesRepository } from "../repositories/material/material-prices.repository";
import { MaterialPricesDetailsRepository } from "../repositories/material/material-prices-details.repository";
import { MaterialService } from "../services/material.service";
import { MaterialController } from "../controllers/material.controller";
import { MaterialSpecificationsRepository } from "../repositories/material/material-specifications.repository";
import { EntryMainDataRepository } from "../repositories/entries/entry-main-data.repository";
import { EntryGridDataRepository } from "../repositories/entries/entry-grid-data.repository";
import { EntriesController } from "../controllers/entry.controller";
import { EntriesService } from "../services/entries.service";
import { VoucherController } from "../controllers/voucher.controller";
import { VoucherService } from "../services/voucher.service";
import { VoucherMainDataRepository } from "../repositories/voucher/voucher-main-data.repository";
import { VoucherGridDataRepository } from "../repositories/voucher/voucher-grid-data.repository";
import { VoucherPicturesRepository } from "../repositories/voucher/voucher-pictures.repository";
import { ChequeController } from "../controllers/cheque.controller";
import { ChequeService } from "../services/cheque.service";
import { ChequeRepository } from "../repositories/cheque.repository";
import { ChequeEntryService } from "../services/entry-services/cheque-entry.service";
import { TerminationEntryService } from "../services/entry-services/termination-entry.service";
import { TerminationFinesEntryService } from "../services/entry-services/termination-fines-entry.service";
import { FeesEntryService } from "../services/entry-services/fees-entry.service";
import { ContractEntryService } from "../services/entry-services/generate-entry.service";
import { EntryGenerationFacade } from "../services/entry-services/entry-services-facade";
import { ContractController } from "../controllers/contract.controller";
import { ContractService } from "../services/contract.service";
import { ContractRepository } from "../repositories/contract/contract.repository";
import { ContractTermsRepository } from "../repositories/contract/contract-terms.repository";
import { ContractPicturesRepository } from "../repositories/contract/contract-pictures.repository";
import { ContractCommissionRepository } from "../repositories/contract/contract-commision.repository";
import { ContractCycleRepository } from "../repositories/contract/contract-cycle.repository";
import { ContractFeeRepository } from "../repositories/contract/contract-fee.repository";
import { ContractOtherFeesRepository } from "../repositories/contract/contract-other-fees.repository";
import { ContractTerminationRepository } from "../repositories/contract/contract-termination.repository";
import { InstallmentRepository } from "../repositories/installment.repository";
import { VoucherEntryService } from "../services/entry-services/voucher-entry.service";
import { OpController } from "../controllers/op.controller";
import { OpService } from "../services/op.service";
import { OpCollectionRepository } from "../repositories/op/op-collection.repository";
import { OpDeportationRepository } from "../repositories/op/op-deportation.repository";
import { OpPartialCollectionRepository } from "../repositories/op/op-partial-collection.repository";
import { OpReturnRepository } from "../repositories/op/op-return.repository";


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
        const buildingsRepository =
            await context.container.getAsync<BuildingsRepository>(
                DI_TYPES.BuildingsRepository
            );
        const accountRepository =
            await context.container.getAsync<AccountRepository>(
                DI_TYPES.AccountRepository
            );
        const costCenterRepository =
            await context.container.getAsync<CostCenterRepository>(
                DI_TYPES.CostCenterRepository
            );
        const propertyValuesRepository =
            await context.container.getAsync<PropertyValuesRepository>(
                DI_TYPES.PropertyValuesRepository
            );

        const apartmentService =
            await context.container.getAsync<ApartmentService>(
                DI_TYPES.ApartmentService
            );

        const parkingService = await context.container.getAsync<ParkingService>(
            DI_TYPES.ParkingService
        );

        const shopService = await context.container.getAsync<ShopService>(
            DI_TYPES.ShopService
        );

        return new BuildingsService(
            buildingsRepository,
            accountRepository,
            costCenterRepository,
            propertyValuesRepository,
            apartmentService,
            parkingService,
            shopService
        );
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


container.bind<CurrencyRepository>(DI_TYPES.CurrencyRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new CurrencyRepository(dataSource);
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

container.bind<CurrencyService>(DI_TYPES.CurrencyService)
    .to(CurrencyService)
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

    container.bind<OpCollectionRepository>(DI_TYPES.OpCollectionRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        return new OpCollectionRepository(dataSource);
    })
    .inSingletonScope();

    container.bind<OpDeportationRepository>(DI_TYPES.OpDeportationRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        return new OpDeportationRepository(dataSource);
    })
    .inSingletonScope();

    container.bind<OpPartialCollectionRepository>(DI_TYPES.OpPartialCollectionRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        return new OpPartialCollectionRepository(dataSource);
    })
    .inSingletonScope();

    container.bind<OpReturnRepository>(DI_TYPES.OpReturnRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        return new OpReturnRepository(dataSource);
    })
    .inSingletonScope();

    container.bind<OpService>(DI_TYPES.OpService)
    .toDynamicValue(async (context) => {
        const opCollectionRepository = await context.container.getAsync<OpCollectionRepository>(
            DI_TYPES.OpCollectionRepository
        );

        const opDeportationRepository = await context.container.getAsync<OpDeportationRepository>(
            DI_TYPES.OpDeportationRepository
        );

        const opPartialCollectionRepository = await context.container.getAsync<OpPartialCollectionRepository>(
            DI_TYPES.OpPartialCollectionRepository
        );

        const OpReturnRepository = await context.container.getAsync<OpReturnRepository>(
            DI_TYPES.OpReturnRepository
        );
        
        return new OpService(
          opCollectionRepository,
          opDeportationRepository,
          opPartialCollectionRepository,
          OpReturnRepository
        );
    })
    .inSingletonScope();
container.bind<OpController>(DI_TYPES.OpController).toDynamicValue(async (context) => {
    const service = await context.container.getAsync<OpService>(DI_TYPES.OpService);
    return new OpController(service)
}).inSingletonScope()

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

container.bind<CurrencyController>(DI_TYPES.CurrencyController)
    .to(CurrencyController)
    .inSingletonScope();

container.bind<LessorRepository>(DI_TYPES.LessorRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new LessorRepository(dataSource);
    })
    .inSingletonScope();

container.bind<LessorService>(DI_TYPES.LessorService)
    .toDynamicValue(async (context) => {
        const lessorRepository = await context.container.getAsync<LessorRepository>(DI_TYPES.LessorRepository);
        return new LessorService(lessorRepository);
    })
    .inSingletonScope();

container.bind<LessorController>(DI_TYPES.LessorController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<LessorService>(DI_TYPES.LessorService);
        return new LessorController(service);
    })
    .inSingletonScope();

container.bind<SellerRepository>(DI_TYPES.SellerRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new SellerRepository(dataSource);
    })
    .inSingletonScope();

container.bind<SellerService>(DI_TYPES.SellerService)
    .toDynamicValue(async (context) => {
        const sellerRepository = await context.container.getAsync<SellerRepository>(DI_TYPES.SellerRepository);
        return new SellerService(sellerRepository);
    })
    .inSingletonScope();


container.bind<SellerController>(DI_TYPES.SellerController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<SellerService>(DI_TYPES.SellerService);
        return new SellerController(service);
    })
    .inSingletonScope();

container.bind<PropertyValuesRepository>(DI_TYPES.PropertyValuesRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new PropertyValuesRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ChequePatternRepository>(DI_TYPES.ChequePatternRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ChequePatternRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractPatternRepository>(DI_TYPES.ContractPatternRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractPatternRepository(dataSource);
    })
    .inSingletonScope();

container.bind<BillPatternRepository>(DI_TYPES.BillPatternRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new BillPatternRepository(dataSource);
    })
    .inSingletonScope();

container.bind<VoucherPatternRepository>(DI_TYPES.VoucherPatternRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new VoucherPatternRepository(dataSource);
    })
    .inSingletonScope();

container.bind<AccountingVoucherPatternRepository>(DI_TYPES.AccountingVoucherPatternRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new AccountingVoucherPatternRepository(dataSource);
    })
    .inSingletonScope();

container.bind<PatternService>(DI_TYPES.PatternService)
    .to(PatternService)
    .inSingletonScope();

container.bind<PatternController>(DI_TYPES.PatternController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<PatternService>(DI_TYPES.PatternService);
        return new PatternController(service);
    })
    .inSingletonScope();

container.bind<MaterialRepository>(DI_TYPES.MaterialRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new MaterialRepository(dataSource);
    })
    .inSingletonScope();

container.bind<MaterialGroupRepository>(DI_TYPES.MaterialGroupRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new MaterialGroupRepository(dataSource);
    })
    .inSingletonScope();

container.bind<MaterialBalanceRepository>(DI_TYPES.MaterialBalanceRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new MaterialBalanceRepository(dataSource);
    })
    .inSingletonScope();

container.bind<MaterialMinimumRepository>(DI_TYPES.MaterialMinimumRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new MaterialMinimumRepository(dataSource);
    })
    .inSingletonScope();

container.bind<MaterialPricesRepository>(DI_TYPES.MaterialPricesRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new MaterialPricesRepository(dataSource);
    })
    .inSingletonScope();

container.bind<MaterialPricesDetailsRepository>(DI_TYPES.MaterialPricesDetailsRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new MaterialPricesDetailsRepository(dataSource);
    })
    .inSingletonScope();

container.bind<MaterialSpecificationsRepository>(DI_TYPES.MaterialSpecificationsRepository).toDynamicValue(
    async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new MaterialSpecificationsRepository(dataSource);
    }
);

container.bind<MaterialService>(DI_TYPES.MaterialService)
    .to(MaterialService)
    .inSingletonScope();

container
    .bind<MaterialController>(DI_TYPES.MaterialController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<MaterialService>(
            DI_TYPES.MaterialService
        );
        return new MaterialController(service);
    })
    .inSingletonScope();

container.bind<EntryMainDataRepository>(DI_TYPES.EntryMainDataRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new EntryMainDataRepository(dataSource);
    })
    .inSingletonScope();

container.bind<EntryGridDataRepository>(DI_TYPES.EntryGridDataRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new EntryGridDataRepository(dataSource);
    })
    .inSingletonScope();

container.bind<EntriesService>(DI_TYPES.EntriesService)
    .toDynamicValue(async (context) => {
        const entryMainDataRepository = await context.container.getAsync<EntryMainDataRepository>(
            DI_TYPES.EntryMainDataRepository
        );
        const entryGridDataRepository = await context.container.getAsync<EntryGridDataRepository>(
            DI_TYPES.EntryGridDataRepository
        );
        return new EntriesService(entryMainDataRepository, entryGridDataRepository);
    })
    .inSingletonScope();


container.bind<EntriesController>(DI_TYPES.EntriesController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<EntriesService>(
            DI_TYPES.EntriesService
        );
        return new EntriesController(service);
    })
    .inSingletonScope();

container.bind<VoucherMainDataRepository>(DI_TYPES.VoucherMainDataRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new VoucherMainDataRepository(dataSource);
    })
    .inSingletonScope();

container.bind<VoucherGridDataRepository>(DI_TYPES.VoucherGridDataRepository)
    .toDynamicValue(
        async (context) => {
            const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
            return new VoucherGridDataRepository(dataSource);
        }
    ).inSingletonScope();


container.bind<VoucherPicturesRepository>(DI_TYPES.VoucherPicturesRepository)
    .toDynamicValue(
        async (context) => {
            const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
            return new VoucherPicturesRepository(dataSource);
        }
    ).inSingletonScope();


container.bind<VoucherService>(DI_TYPES.VoucherService)
    .toDynamicValue(async (context) => {
        const voucherMainDataRepository = await context.container.getAsync<VoucherMainDataRepository>(
            DI_TYPES.VoucherMainDataRepository
        );
        const voucherGridDataRepository = await context.container.getAsync<VoucherGridDataRepository>(
            DI_TYPES.VoucherGridDataRepository
        );
        const voucherPicturesRepository = await context.container.getAsync<VoucherPicturesRepository>(
            DI_TYPES.VoucherPicturesRepository
        );

        const entryGenerationFacade = await context.container.getAsync<EntryGenerationFacade>(
            DI_TYPES.EntryGenerationFacade
        );

        return new VoucherService(
            voucherMainDataRepository,
            voucherGridDataRepository,
            voucherPicturesRepository,
            entryGenerationFacade
        );
    })
    .inSingletonScope();

container.bind<VoucherController>(DI_TYPES.VoucherController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<VoucherService>(
            DI_TYPES.VoucherService
        );
        return new VoucherController(service);
    })
    .inSingletonScope();

container.bind<ChequeRepository>(DI_TYPES.ChequeRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ChequeRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ChequeService>(DI_TYPES.ChequeService)
    .toDynamicValue(async (context) => {
        const chequeRepository = await context.container.getAsync<ChequeRepository>(
            DI_TYPES.ChequeRepository
        );
        return new ChequeService(chequeRepository);
    })
    .inSingletonScope();

container.bind<ChequeController>(DI_TYPES.ChequeController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<ChequeService>(
            DI_TYPES.ChequeService
        );
        return new ChequeController(service);
    })
    .inSingletonScope();

container.bind<ChequeEntryService>(DI_TYPES.ChequeEntryService).to(ChequeEntryService);
container.bind<TerminationEntryService>(DI_TYPES.TerminationEntryService).to(TerminationEntryService);
container.bind<TerminationFinesEntryService>(DI_TYPES.TerminationFinesEntryService).to(TerminationFinesEntryService);
container.bind<FeesEntryService>(DI_TYPES.FeesEntryService).to(FeesEntryService);
container.bind<ContractEntryService>(DI_TYPES.ContractEntryService).to(ContractEntryService);
container.bind<VoucherEntryService>(DI_TYPES.VoucherEntryService).to(VoucherEntryService);
// container.bind<EntryGenerationFacade>(DI_TYPES.EntryGenerationFacade).to(EntryGenerationFacade);


container.bind<EntryGenerationFacade>(DI_TYPES.EntryGenerationFacade)
    .toDynamicValue(async (context) => {
        const chequeEntryService = await context.container.getAsync<ChequeEntryService>(
            DI_TYPES.ChequeEntryService
        );
        const terminationEntryService = await context.container.getAsync<TerminationEntryService>(
            DI_TYPES.TerminationEntryService
        );
        const terminationFinesEntryService = await context.container.getAsync<TerminationFinesEntryService>(
            DI_TYPES.TerminationFinesEntryService
        );
        const feesEntryService = await context.container.getAsync<FeesEntryService>(
            DI_TYPES.FeesEntryService
        );
        const contractEntryService = await context.container.getAsync<ContractEntryService>(
            DI_TYPES.ContractEntryService
        );
        const voucherEntryService = await context.container.getAsync<VoucherEntryService>(
            DI_TYPES.VoucherEntryService
        );

        return new EntryGenerationFacade(
            chequeEntryService,
            terminationEntryService,
            terminationFinesEntryService,
            feesEntryService,
            contractEntryService,
            voucherEntryService
        );
    })
    .inSingletonScope();


container.bind<ContractRepository>(DI_TYPES.ContractRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractTermsRepository>(DI_TYPES.ContractTermsRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractTermsRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractPicturesRepository>(DI_TYPES.ContractPicturesRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractPicturesRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractCommissionRepository>(DI_TYPES.ContractCommissionRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractCommissionRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractCycleRepository>(DI_TYPES.ContractCycleRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractCycleRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractFeeRepository>(DI_TYPES.ContractFeeRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractFeeRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractOtherFeesRepository>(DI_TYPES.ContractOtherFeesRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractOtherFeesRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractTerminationRepository>(DI_TYPES.ContractTerminationRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new ContractTerminationRepository(dataSource);
    })
    .inSingletonScope();

container.bind<InstallmentRepository>(DI_TYPES.InstallmentRepository)
    .toDynamicValue(async (context) => {
        const dataSource = await context.container.getAsync<DataSource>(DI_TYPES.DataSource);
        return new InstallmentRepository(dataSource);
    })
    .inSingletonScope();

container.bind<ContractService>(DI_TYPES.ContractService)
    .toDynamicValue(async (context) => {
        const contractRepository = await context.container.getAsync<ContractRepository>(DI_TYPES.ContractRepository);
        const contractTermsRepository = await context.container.getAsync<ContractTermsRepository>(DI_TYPES.ContractTermsRepository);
        const contractPicturesRepository = await context.container.getAsync<ContractPicturesRepository>(DI_TYPES.ContractPicturesRepository);
        const contractCommissionRepository = await context.container.getAsync<ContractCommissionRepository>(DI_TYPES.ContractCommissionRepository);
        const contractCycleRepository = await context.container.getAsync<ContractCycleRepository>(DI_TYPES.ContractCycleRepository);
        const contractFeeRepository = await context.container.getAsync<ContractFeeRepository>(DI_TYPES.ContractFeeRepository);
        const contractOtherFeesRepository = await context.container.getAsync<ContractOtherFeesRepository>(DI_TYPES.ContractOtherFeesRepository);
        const contractTerminationRepository = await context.container.getAsync<ContractTerminationRepository>(DI_TYPES.ContractTerminationRepository);
        const installmentRepository = await context.container.getAsync<InstallmentRepository>(DI_TYPES.InstallmentRepository);
        const apartmentRepository = await context.container.getAsync<ApartmentRepository>(DI_TYPES.ApartmentRepository);
        const shopRepository = await context.container.getAsync<ShopRepository>(DI_TYPES.ShopRepository);
        const parkingRepository = await context.container.getAsync<ParkingRepository>(DI_TYPES.ParkingRepository);
        const buildingsRepository = await context.container.getAsync<BuildingsRepository>(DI_TYPES.BuildingsRepository);

        return new ContractService(
            contractRepository,
            contractTermsRepository,
            contractPicturesRepository,
            contractCommissionRepository,
            contractCycleRepository,
            contractFeeRepository,
            contractOtherFeesRepository,
            contractTerminationRepository,
            installmentRepository,
            apartmentRepository,
            shopRepository,
            parkingRepository,
            buildingsRepository
        );
    })
    .inSingletonScope();

container.bind<ContractController>(DI_TYPES.ContractController)
    .toDynamicValue(async (context) => {
        const service = await context.container.getAsync<ContractService>(DI_TYPES.ContractService);
        return new ContractController(service);
    })
    .inSingletonScope();
