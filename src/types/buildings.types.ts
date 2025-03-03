export interface IBuildingsBody {
  name: string;
  emirate: string;
  suburb: string;
  area: string;
  street: string;
  part_number: string;
  basin_number: string;
  city: string;
  ltnname: string;
  purchase_amount: number;
  purchase_date: Date;
  purchase_statement: string;
  purchase_gen_entries: boolean;
  building_cost: number;
  building_purchase_date: Date;
  building_amount: number;
  building_receipt: string;
  building_gen_entries: boolean;
  apartment_count: number;
  penthouse_count: number;
  parking_count: number;
  mezzanine_count: number;
  office_count: number;
  warehouse_count: number;
  service_apartments: number;
  drivers_apartments: number;
  store_count: number;
  shop_count: number;
  apartment_floor: number;
  penthouse_floor: number;
  parking_floor: number;
  mezzanine_floor: number;
  office_floor: number;
  underground_parking: number;
  investment_start_date: Date;
  investment_end_date: Date;
  investment_value: number;
  investment_gen_entries: boolean;
  terminating_tenancies: boolean;
  commission_rate: number;
  received_date: Date;
  received_amount: number;
  received_note: string;
  statement: string;
  display: boolean;
  investment_currency_val: number;
  received_currency_val: number;
  building_currency_val: number;
  create_into_account: boolean;
  create_into_cost_center: boolean;
  bond_number: string;
  bond_type: string;
  bond_date: Date;
  entry_commission_rate: number;
  entry_vat_rate: number;
  purchaseCurrencyId: string;
  supplierAccountId: string;
  investmentOwnerAccountId: string;
  investmentCurrencyId: string;
  rentersInsuranceId: string;
  receivedAccountId: string;
  receivedCurrencyId: string;
  ownerAccountId: string;
  revenueId: string;
  tenantId: string;
  entryVatAccountId: string;
  entryLandlordAccountId: string;
  entryCommissionFromOwnerAccountId: string;
  entryRevenueAccountId: string;
  ownerId: string;
  lessorId: string;
  bankId: string;
  buildingCurrencyId: string;
  buildingAccountId: string;
  mainCostCenterId: string;
  createIntoAccountId: string;
  createIntoCostCenterId: string;
  buildingBankAccountId: string;
  buildingCashAccountId: string;
  buildingDepositAccountId: string;
  buildingChequeAccountId: string;
  vatAccountId: string;
  deferredVatAccountId: string;
  ownerBalanceId: string;
  ownerTaxAccountId: string;
  commissionExpenseAccountId: string;
  realestateCompanyAccountId: string;
  customersMainAccountId: string;
  buildingInsuranceAccountId: string;
  buildingDiscountAccountId: string;
}

export interface IPropertyValues {
  id?: string;
  area?: number | null;
  area_unit?: string;
  view?: string | null;
  property_type?: string | null;
  room_count?: number;
  hex?: string;
  row_index?: string;
  description?: string;
  building_id?: string;
  tenant_id?: string;
}

export interface IBaseAsset {
  name?: string;
  x_index: number | string;
  y_index: number | string;
  floor_no: number | string;
  hex: string;
  row_index: number | string;
  asset_hash: string;
}

export interface IApartmentDetail extends IBaseAsset {
  id?: string;
  building_id?: string;
  apartment_no: string;
  description?: string;
  category?: string | null;
  area?: string;
  area_unit?: string;
  view?: string | null;
  bathroom_count?: number | null;
  balcony_count?: number | null;
  has_lawsuit?: boolean;
  main_cost_center_id?: string;
  cost_center_id?: string;
  property_type?: string | null;
  water_meter?: string | null;
  electricity_meter?: string | null;
  statement?: string | null;
  room_count?: number | null;
  property_values_id?: string;
  cost_price?: number | null;
  amount_paid?: number | null;
  cost_currency_id?: string | null;
  note?: string | null;
  apartment_kind: number;
  number?: string;
  code?: string;
  blocked?: boolean | null;
  kind?: string | null;
  tenant_id?: string;
}

export interface IShopDetail extends IBaseAsset {
  shop_no: string;
  shop_kind: number;
  property_values_id?: string;
}

export interface IParkingDetail extends IBaseAsset {
  parking_no: string;
  parking_kind: number;
  property_values_id?: string;
}

export interface IBuildingDetailsData {
  apartment: Record<string, IApartmentDetail>;
  mezzanine: Record<string, IApartmentDetail>;
  office: Record<string, IApartmentDetail>;
  store: Record<string, IShopDetail>;
  shop: Record<string, IShopDetail>;
  parking: Record<string, IParkingDetail>;
  penthouse: Record<string, IApartmentDetail>;
  'underground parking': Record<string, IParkingDetail>;
}

export interface IBuildingDetailsBody {
  property_values: IPropertyValues[];
  building_details: IBuildingDetailsData;
}

export enum AssetKind {
  Apartment = 1,
  Mezzanine = 2,
  Office = 3,
  Penthouse = 4
}

export enum ParkingKind {
  Regular = 1,
  Underground = 2
}

export enum ShopKind {
  Shop = 1,
  Store = 2
}


export interface IBuildingDetailsResponse {
  apartments: any[];
  parkings: any[];
  shops: any[];
  property_values?: any[];
}