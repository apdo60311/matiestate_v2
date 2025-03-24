import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsUUID, IsArray, IsDate, ValidateNested, IsBoolean } from 'class-validator';

export class CreateShopDto {
    @IsString()
    shop_no!: string;

    @IsString()
    @IsOptional()
    floor_no?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    x_index?: number;

    @IsNumber()
    y_index?: number;

    @IsString()
    @IsOptional()
    kind?: string;

    @IsNumber()
    @IsOptional()
    area?: number;

    @IsString()
    @IsOptional()
    area_unit?: string;

    @IsString()
    @IsOptional()
    view?: string;

    @IsString()
    @IsOptional()
    license1?: string;

    @IsString()
    @IsOptional()
    license2?: string;

    @IsString()
    @IsOptional()
    unified_num?: string;

    @IsBoolean()
    @IsOptional()
    has_lawsuit?: boolean;

    @IsString()
    @IsOptional()
    water_meter?: string;

    @IsString()
    @IsOptional()
    electricity_meter?: string;

    @IsString()
    @IsOptional()
    bond_type?: string;

    @IsString()
    @IsOptional()
    bond_no?: string;

    @Type(() => Date)
    @IsOptional()
    bond_date?: Date;

    @IsString()
    @IsOptional()
    note?: string;

    @IsString()
    @IsOptional()
    hex?: string;

    @IsNumber()
    @IsOptional()
    property_type?: number;

    @IsNumber()
    @IsOptional()
    number?: number;

    @IsNumber()
    @IsOptional()
    row_index?: number;

    @IsString()
    @IsOptional()
    asset_hash?: string;

    @IsString()
    @IsOptional()
    main_cost_center_id?: string;

    @IsNumber()
    @IsOptional()
    shop_kind?: number;

    @IsNumber()
    @IsOptional()
    code?: number;

    @IsBoolean()
    @IsOptional()
    blocked?: boolean;

    @IsUUID()
    building_id!: string;

    @IsUUID()
    @IsOptional()
    customer_id?: string;

    @IsUUID()
    @IsOptional()
    customer_owner_id?: string;

    @IsUUID()
    @IsOptional()
    cost_center_id?: string;

    @IsUUID()
    @IsOptional()
    property_values_id?: string;

    @IsUUID()
    @IsOptional()
    tenant_id?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateShopPicturesDto)
    pictures?: CreateShopPicturesDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateShopRentalPriceDto)
    rental_price?: CreateShopRentalPriceDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateShopSellingPriceDto)
    selling_price?: CreateShopSellingPriceDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateShopAccumulateDto)
    accumulates?: CreateShopAccumulateDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateShopFixedAssetsDto)
    fixed_assets?: CreateShopFixedAssetsDto[];
}

export class CreateShopPicturesDto {
    @IsString()
    picture!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsUUID()
    shop_id!: string;
}

export class CreateShopRentalPriceDto {
    @Type(() => Date)
    date!: Date;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsUUID()
    @IsOptional()
    currency_id?: string;

    @IsNumber()
    @IsOptional()
    cost_price?: number;

    @IsUUID()
    @IsOptional()
    cost_currency_id?: string;

    @IsNumber()
    @IsOptional()
    rent?: number;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsNumber()
    number?: number;

    @IsUUID()
    shop_id!: string;
}

export class CreateShopSellingPriceDto {
    @Type(() => Date)
    date!: Date;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsUUID()
    @IsOptional()
    currency_id?: string;

    @IsString()
    @IsOptional()
    note?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsNumber()
    number?: number;

    @IsUUID()
    shop_id!: string;
}

export class CreateShopAccumulateDto {
    @IsNumber()
    @IsOptional()
    number?: number;

    @IsUUID()
    main_shop_id!: string;

    @IsUUID()
    shop_id!: string;

    @IsUUID()
    tenant_id!: string;
}

export class CreateShopFixedAssetsDto {
    @IsUUID()
    @IsOptional()
    assets_id?: string;

    @IsNumber()
    @IsOptional()
    value?: number;

    @IsString()
    @IsOptional()
    note?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsUUID()
    shop_id!: string;
}