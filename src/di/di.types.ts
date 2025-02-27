export const DI_TYPES = {
  DataSource: Symbol.for("DataSource"),
  BuildingsRepository: Symbol.for("BuildingsRepository"),
  BuildingsService: Symbol.for("BuildingsService"),
  BuildingsController: Symbol.for("BuildingsController"),
  CostCenterRepository: Symbol.for("CostCenterRepository"),
  AccountRepository: Symbol.for("AccountRepository"),
  
  ReservationPropertyRepository: Symbol.for("ReservationPropertyRepository"),
  ReservationPropertyService: Symbol.for("ReservationPropertyService"),
  ReservationPropertyController: Symbol.for("ReservationPropertyController"),
  
  ApartmentRepository: Symbol.for("ApartmentRepository"),
  ApartmentService: Symbol.for("ApartmentService"),
  ApartmentController: Symbol.for("ApartmentController"),
  ApartmentPicturesRepository: Symbol.for("ApartmentPicturesRepository"),
  ApartmentRentalPriceRepository: Symbol.for("ApartmentRentalPriceRepository"),
  ApartmentSellingPriceRepository: Symbol.for(
    "ApartmentSellingPriceRepository"
  ),
  ApartmentAccumulateRepository: Symbol.for("ApartmentAccumulateRepository"),
  
  ShopRepository: Symbol.for('ShopRepository'),
  ShopService: Symbol.for('ShopService'),
  ShopController: Symbol.for('ShopController'),
  ShopPicturesRepository: Symbol.for('ShopPicturesRepository'),
  ShopRentalPriceRepository: Symbol.for('ShopRentalPriceRepository'),
  ShopSellingPriceRepository: Symbol.for('ShopSellingPriceRepository'),
  ShopAccumulateRepository: Symbol.for('ShopAccumulateRepository'),
  ShopFixedAssetsRepository: Symbol.for('ShopFixedAssetsRepository'),

  ParkingRepository: Symbol.for('ParkingRepository'),
  ParkingPicturesRepository: Symbol.for('ParkingPicturesRepository'),
  ParkingAccumulateRepository: Symbol.for('ParkingAccumulateRepository'),
  ParkingRentalPriceRepository: Symbol.for('ParkingRentalPriceRepository'),
  ParkingSellingPriceRepository: Symbol.for('ParkingSellingPriceRepository'),
  ParkingWalletRepository: Symbol.for('ParkingWalletRepository'),
  ParkingService: Symbol.for('ParkingService'),
  ParkingController: Symbol.for('ParkingController'),

  LandRepository: Symbol.for('LandRepository'),
  LandRentalPriceRepository: Symbol.for('LandRentalPriceRepository'),
  LandSellingPriceRepository: Symbol.for('LandSellingPriceRepository'),
  LandAccumulateRepository: Symbol.for('LandAccumulateRepository'),
  LandWalletRepository: Symbol.for('LandWalletRepository'),
  LandService: Symbol.for('LandService'),
  LandController: Symbol.for('LandController'),

  VillaRepository: Symbol.for('VillaRepository'),
  VillaRentalPriceRepository: Symbol.for('VillaRentalPriceRepository'), 
  VillaSellingPriceRepository: Symbol.for('VillaSellingPriceRepository'),
  VillaService: Symbol.for('VillaService'),
  VillaController: Symbol.for('VillaController'),
};
