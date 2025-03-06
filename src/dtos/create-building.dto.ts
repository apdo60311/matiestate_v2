import {
    IsBoolean,
    IsDate,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
    Length,
    Min,
  } from "class-validator";
  

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBuildingDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         emirate:
 *           type: string
 *         suburb:
 *           type: string
 *         area:
 *           type: string
 *         street:
 *           type: string
 *         apartment_count:
 *           type: integer
 *           minimum: 0
 *         parking_count:
 *           type: integer
 *           minimum: 0
 *         building_cost:
 *           type: number
 *           minimum: 0
 */
  export class CreateBuildingDto {
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: "Name must be a string" })
    @Length(1, 255, { message: "Name must be between 1 and 255 characters" })
    name!: string;
  
    @IsOptional()
    @IsString({ message: "Emirate must be a string" })
    @Length(1, 255, { message: "Emirate must be between 1 and 255 characters" })
    emirate?: string;
  
    @IsOptional()
    @IsString({ message: "Suburb must be a string" })
    @Length(1, 255, { message: "Suburb must be between 1 and 255 characters" })
    suburb?: string;
  
    @IsOptional()
    @IsString({ message: "Area must be a string" })
    area?: string;
  
    @IsOptional()
    @IsString({ message: "Street must be a string" })
    street?: string;
  
    @IsOptional()
    @IsNumberString({}, { message: "Part number must be a number" })
    part_number?: string;
  
    @IsOptional()
    @IsNumberString({}, { message: "basin number must be a number" })
    basin_number?: string;
  
    @IsOptional()
    @IsString({ message: "City must be a string" })
    @Length(1, 255, { message: "City must be between 1 and 255 characters" })
    city?: string;
  
    @IsOptional()
    @IsString({ message: "Ltnname must be a string" })
    ltnname?: string;
  
    @IsOptional()
    @IsNumber()
    purchase_amount?: number;
  
    @IsOptional()
    @IsDate({ message: "Purchase date must be a valid date" })
    purchase_date?: Date;
  
    @IsOptional()
    @IsString({ message: "Purchase Statement must be a string" })
    purchase_statement?: string;
  
    @IsOptional()
    @IsBoolean({ message: "Purchase general entries must be a boolean" })
    purchase_gen_entries?: boolean;
  
    // Building
    @IsOptional()
    @IsNumber({}, { message: "Building cost must be a number" })
    @Min(0, { message: "Building cost cannot be negative" })
    building_cost?: number;
  
    @IsOptional()
    @IsDate({ message: "Building Purchase date must be a valid date" })
    building_purchase_date?: Date;
  
    @IsOptional()
    @IsNumber({}, { message: "Building amount must be a number" })
    @Min(0, { message: "Building amount cannot be negative" })
    building_amount?: number;
  
    @IsOptional()
    @IsString({ message: "Building receipt must be a string" })
    @Length(0, 1000, {
      message: "Building receipt should not exceed 1000 characters",
    })
    building_receipt?: string;
  
    @IsOptional()
    @IsBoolean({ message: "Building general entries must be a boolean" })
    building_gen_entries?: boolean;
  
    @IsOptional()
    @IsInt({ message: "Apartment count must be an integer" })
    @Min(0, { message: "Apartment count cannot be negative" })
    apartment_count?: number;
  
    @IsOptional()
    @IsInt({ message: "Penthouse count must be an integer" })
    @Min(0, { message: "Penthouse count cannot be negative" })
    penthouse_count?: number;
  
    @IsOptional()
    @IsInt({ message: "Parking count must be an integer" })
    @Min(0, { message: "Parking count cannot be negative" })
    parking_count?: number;
  
    @IsOptional()
    @IsInt({ message: "Mezzanine count must be an integer" })
    @Min(0, { message: "Mezzanine count cannot be negative" })
    mezzanine_count?: number;
  
    @IsOptional()
    @IsInt({ message: "Office count must be an integer" })
    @Min(0, { message: "Office count cannot be negative" })
    office_count?: number;
  
    @IsOptional()
    @IsInt({ message: "Warehouse count must be an integer" })
    @Min(0, { message: "Warehouse count cannot be negative" })
    warehouse_count?: number;
  
    @IsOptional()
    @IsInt({ message: "Service apartments must be an integer" })
    @Min(0, { message: "Service apartments cannot be negative" })
    service_apartments?: number;
  
    @IsOptional()
    @IsInt({ message: "Drivers apartments must be an integer" })
    @Min(0, { message: "Drivers apartments cannot be negative" })
    drivers_apartments?: number;
  
    @IsOptional()
    @IsInt({ message: "Store count must be an integer" })
    @Min(0, { message: "Store count cannot be negative" })
    store_count?: number;
  
    @IsOptional()
    @IsInt({ message: "Shop count must be an integer" })
    @Min(0, { message: "Shop count cannot be negative" })
    shop_count?: number;
  
    @IsOptional()
    @IsInt({ message: "Apartment Floor must be an integer" })
    @Min(0, { message: "Apartment Floor cannot be negative" })
    apartment_floor?: number;
  
    @IsOptional()
    @IsInt({ message: "Penthouse Floor must be an integer" })
    @Min(0, { message: "Penthouse Floor cannot be negative" })
    penthouse_floor?: number;
  
    @IsOptional()
    @IsInt({ message: "Parking Floor must be an integer" })
    @Min(0, { message: "Parking Floor cannot be negative" })
    parking_floor?: number;
  
    @IsOptional()
    @IsInt({ message: "Mezzanine Floor must be an integer" })
    @Min(0, { message: "Mezzanine Floor cannot be negative" })
    mezzanine_floor?: number;
  
    @IsOptional()
    @IsInt({ message: "Office Floor must be an integer" })
    @Min(0, { message: "Office Floor cannot be negative" })
    office_floor?: number;
  
    @IsOptional()
    @IsInt({ message: "Underground parking must be an integer" })
    @Min(0, { message: "Underground parking cannot be negative" })
    underground_parking?: number;
  
    // Investment
    @IsOptional()
    @IsDate({ message: "Investment Start date must be a valid date" })
    investment_start_date?: Date;
  
    @IsOptional()
    @IsDate({ message: "Investment End date must be a valid date" })
    investment_end_date?: Date;
  
    @IsOptional()
    @IsNumber({}, { message: "Investment value must be a number" })
    @Min(0, { message: "Investment value cannot be negative" })
    investment_value?: number;
  
    @IsOptional()
    @IsBoolean({ message: "Investment gen entries must be a boolean" })
    investment_gen_entries?: boolean;
  
    @IsOptional()
    @IsBoolean({ message: "Investment terminating tenancies must be a boolean" })
    terminating_tenancies?: boolean;
  
    // Financial
    @IsOptional()
    @IsNumber({}, { message: "Commission rate must be a number" })
    commission_rate?: number;
  
    @IsOptional()
    @IsDate({ message: "Received date must be a valid date" })
    received_date?: Date;
  
    @IsOptional()
    @IsNumber({}, { message: "Received amount must be a number" })
    @Min(0, { message: "Received amount cannot be negative" })
    received_amount?: number;
  
    @IsOptional()
    @IsString({ message: "Received note must be a string" })
    received_note?: string;
  
    @IsOptional()
    @IsString({ message: "Statement must be a string" })
    statement?: string;
  
    @IsOptional()
    @IsBoolean({ message: "Display must be a boolean" })
    display?: boolean;
  
    // Currency Values
    @IsOptional()
    @IsNumber({}, { message: "Investment currency value must be a number" })
    investment_currency_val?: number;
  
    @IsOptional()
    @IsNumber({}, { message: "Received currency value must be a number" })
    received_currency_val?: number;
  
    @IsOptional()
    @IsNumber({}, { message: "Building currency value must be a number" })
    building_currency_val?: number;
  
    // Accounting Flags
    @IsOptional()
    @IsBoolean({ message: "Create into account must be a boolean" })
    create_into_account?: boolean;
  
    @IsOptional()
    @IsBoolean({ message: "Create into cost center must be a boolean" })
    create_into_cost_center?: boolean;
  
    // Bond Information
    @IsOptional()
    @IsString({ message: "Bond number must be a string" })
    bond_number?: string;
  
    @IsOptional()
    @IsString({ message: "Bond type must be a string" })
    bond_type?: string;
  
    @IsOptional()
    @IsDate({ message: "Bond date must be a valid date" })
    bond_date?: Date;
  
    // Entry Commission/VAT Rates
    @IsOptional()
    @IsNumber({}, { message: "Entry commission rate must be a number" })
    entry_commission_rate?: number;
  
    @IsOptional()
    @IsNumber({}, { message: "Entry VAT rate must be a number" })
    entry_vat_rate?: number;
  
    // Relations
    @IsOptional()
    @IsString({ message: "Purchase Currency ID must be a string" })
    purchaseCurrencyId?: string;
  
    @IsOptional()
    @IsString({ message: "Supplier Account ID must be a string" })
    supplierAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Investment Owner Account ID must be a string" })
    investmentOwnerAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Investment Currency ID must be a string" })
    investmentCurrencyId?: string;
  
    @IsOptional()
    @IsString({ message: "Renter's Insurance ID must be a string" })
    rentersInsuranceId?: string;
  
    @IsOptional()
    @IsString({ message: "Received Account ID must be a string" })
    receivedAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Received Currency ID must be a string" })
    receivedCurrencyId?: string;
  
    @IsOptional()
    @IsString({ message: "Owner Account ID must be a string" })
    ownerAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Revenue ID must be a string" })
    revenueId?: string;
  
    @IsOptional()
    @IsString({ message: "Tenant ID must be a string" })
    tenantId?: string;
  
    @IsOptional()
    @IsString({ message: "Entry VAT Account ID must be a string" })
    entryVatAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Entry Landlord Account ID must be a string" })
    entryLandlordAccountId?: string;
  
    @IsOptional()
    @IsString({
      message: "Entry Commission From Owner Account ID must be a string",
    })
    entryCommissionFromOwnerAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Entry Revenue Account ID must be a string" })
    entryRevenueAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Owner ID must be a string" })
    ownerId?: string;
  
    @IsOptional()
    @IsString({ message: "Lessor ID must be a string" })
    lessorId?: string;
  
    @IsOptional()
    @IsString({ message: "Bank ID must be a string" })
    bankId?: string;
  
    @IsOptional()
    @IsString({ message: "Building Currency ID must be a string" })
    buildingCurrencyId?: string;
  
    @IsOptional()
    @IsString({ message: "Building Account ID must be a string" })
    buildingAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Main Cost Center ID must be a string" })
    mainCostCenterId?: string;
  
    @IsOptional()
    @IsString({ message: "Create Into Account ID must be a string" })
    createIntoAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Create Into Cost Center ID must be a string" })
    createIntoCostCenterId?: string;
  
    @IsOptional()
    @IsString({ message: "Building Bank Account ID must be a string" })
    buildingBankAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Building Cash Account ID must be a string" })
    buildingCashAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Building Deposit Account ID must be a string" })
    buildingDepositAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Building Cheque Account ID must be a string" })
    buildingChequeAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "VAT Account ID must be a string" })
    vatAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Deferred VAT Account ID must be a string" })
    deferredVatAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Owner Balance ID must be a string" })
    ownerBalanceId?: string;
  
    @IsOptional()
    @IsString({ message: "Owner Tax Account ID must be a string" })
    ownerTaxAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Commission Expense Account ID must be a string" })
    commissionExpenseAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Real Estate Company Account ID must be a string" })
    realestateCompanyAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Customer's Main Account ID must be a string" })
    customersMainAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Building Insurance Account ID must be a string" })
    buildingInsuranceAccountId?: string;
  
    @IsOptional()
    @IsString({ message: "Building Discount Account ID must be a string" })
    buildingDiscountAccountId?: string;
  }
  