import { Type } from 'class-transformer';
import { 
    IsString, 
    IsNumber, 
    IsBoolean, 
    IsOptional, 
    IsUUID,
    Min,
    IsArray,
    ValidateNested,
    IsDate
} from 'class-validator';

export class CreateLandRentalPriceDto {
    @Type(() => Date)
    date!: Date;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsNumber()
    number?: number;

    @IsUUID()
    land_id!: string;
}

export class CreateLandSellingPriceDto {
    @Type(() => Date)
    date!: Date;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsNumber()
    number?: number;

    @IsUUID()
    land_id!: string;
}

export class CreateLandAccumulateDto {
    @IsNumber()
    @IsOptional()
    number?: number;

    @IsUUID()
    main_land_id!: string;

    @IsUUID()
    land_id!: string;

    @IsUUID()
    tenant_id!: string;
}

export class CreateLandWalletDto {
    @IsString()
    number!: string;

    @IsUUID()
    contract_id!: string;

    @IsNumber()
    @Min(0)
    main_cost!: number;

    @IsOptional()
    @IsNumber()
    expense?: number;

    @IsOptional()
    @Type(() => Date)
    begin_date?: Date;

    @IsOptional()
    @Type(() => Date)
    sale_date?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    sale_value?: number;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsUUID()
    land_id!: string;
}

export class CreateLandDto {
    @IsOptional()
    @IsString()
    land_no?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    last_name?: string;

    @IsNumber()
    type!: number;

    @IsOptional()
    @IsBoolean()
    ban?: boolean;

    @IsOptional()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsNumber()
    number?: number;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    region?: string;

    @IsOptional()
    @IsString()
    space?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    area?: number;

    @IsOptional()
    @IsString()
    area_unit?: string;

    @IsOptional()
    @IsString()
    street_name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    street_count?: number;

    @IsOptional()
    @IsString()
    side?: string;

    @IsOptional()
    @IsString()
    license_no?: string;

    @IsOptional()
    @IsString()
    license?: string;

    @IsOptional()
    @Type(() => Date)
    license_date?: Date;

    @IsOptional()
    @IsString()
    details?: string;

    @IsOptional()
    @IsString()
    land_type?: string;

    @IsOptional()
    @IsBoolean()
    buildble?: boolean;

    @IsOptional()
    @IsNumber()
    landowner?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    begin_land_value?: number;

    @IsOptional()
    @IsNumber()
    currency_val_begin_land?: number;

    @IsOptional()
    @IsNumber()
    currency_val_purchase?: number;

    @IsOptional()
    @IsString()
    purchase_note?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    commission_percent?: number;

    @IsOptional()
    @IsNumber()
    identity_value?: number;

    @IsOptional()
    @IsNumber()
    currency_valid_entity?: number;

    @IsOptional()
    @Type(() => Date)
    identity_begin_date?: Date;

    @IsOptional()
    @Type(() => Date)
    identity_end_date?: Date;

    @IsOptional()
    @IsBoolean()
    create_entry_investment?: boolean;

    @IsOptional()
    @IsString()
    identity_note?: string;

    @IsOptional()
    @IsString()
    ltn_land_type?: string;

    @IsOptional()
    @IsString()
    ltn_city?: string;

    @IsOptional()
    @IsString()
    ltn_region?: string;

    @IsOptional()
    @IsString()
    ltn_space?: string;

    @IsOptional()
    @IsString()
    ltn_license?: string;

    @IsOptional()
    @IsString()
    ltn_side?: string;

    @IsOptional()
    @IsString()
    ltnname?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    rent?: number;

    @IsOptional()
    @IsBoolean()
    used_end_date?: boolean;

    // Relations
    @IsOptional()
    @IsUUID()
    customer_id?: string;

    @IsOptional()
    @IsUUID()
    account_id?: string;

    @IsOptional()
    @IsUUID()
    cuowner_id?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsUUID()
    bank_account_id?: string;

    @IsOptional()
    @IsUUID()
    account_comm_income_id?: string;

    @IsOptional()
    @IsUUID()
    customer_owner_id?: string;

    @IsOptional()
    @IsUUID()
    owner_account_id?: string;

    @IsOptional()
    @IsUUID()
    currency_identity_id?: string;

    @IsOptional()
    @IsUUID()
    currency_begin_land_id?: string;

    @IsOptional()
    @IsUUID()
    begin_land_cost_center_id?: string;

    @IsOptional()
    @IsUUID()
    currency_purchase_id?: string;

    @IsOptional()
    @IsUUID()
    rent_currency_id?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    identity_entry_id?: string;

    // Nested entities
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateLandRentalPriceDto)
    rental_price?: CreateLandRentalPriceDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateLandSellingPriceDto)
    selling_price?: CreateLandSellingPriceDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateLandAccumulateDto)
    accumulates?: CreateLandAccumulateDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateLandWalletDto)
    wallet?: CreateLandWalletDto;
}