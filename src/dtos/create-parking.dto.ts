// src/dtos/create-parking.dto.ts
import { Type } from 'class-transformer';
import { 
    IsString, 
    IsNumber, 
    IsBoolean, 
    IsOptional, 
    IsUUID,
    Min,
    IsArray,
    ValidateNested
} from 'class-validator';

export class CreateParkingPicturesDto {
    @IsString()
    picture!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsUUID()
    parking_id!: string;
}

export class CreateParkingRentalPriceDto {
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
    parking_id!: string;
}

export class CreateParkingSellingPriceDto {
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
    parking_id!: string;
}

export class CreateParkingAccumulateDto {
    @IsNumber()
    @IsOptional()
    number?: number;

    @IsUUID()
    main_parking_id!: string;

    @IsUUID()
    parking_id!: string;

    @IsUUID()
    tenant_id!: string;
}

export class CreateParkingWalletDto {
    @IsString()
    number!: string;

    @IsUUID()
    contract_id!: string;

    @IsUUID()
    building_id!: string;

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
    parking_id!: string;
}

export class CreateParkingDto {
    @IsUUID()
    building_id!: string;

    @IsString()
    parking_no!: string;

    @IsOptional()
    @IsString()
    floor_no?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    x_index!: number;

    @IsNumber()
    y_index!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    area?: number;

    @IsOptional()
    @IsString()
    area_unit?: string;

    @IsOptional()
    @IsString()
    view?: string;

    @IsOptional()
    @IsNumber()
    parking_kind?: number;

    @IsOptional()
    @IsBoolean()
    has_lawsuit?: boolean;

    @IsOptional()
    @IsNumber()
    property_type?: number;

    @IsOptional()
    @IsString()
    hex?: string;

    @IsOptional()
    @IsNumber()
    row_index?: number;

    @IsOptional()
    @IsString()
    asset_hash?: string;

    @IsOptional()
    @IsNumber()
    code?: number;

    @IsOptional()
    @IsBoolean()
    blocked?: boolean;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    customer_id?: string;

    @IsOptional()
    @IsUUID()
    flat_owner_id?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsUUID()
    main_cost_center_id?: string;

    @IsOptional()
    @IsUUID()
    property_values_id?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateParkingPicturesDto)
    pictures?: CreateParkingPicturesDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateParkingRentalPriceDto)
    rental_price?: CreateParkingRentalPriceDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateParkingSellingPriceDto)
    selling_price?: CreateParkingSellingPriceDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateParkingAccumulateDto)
    accumulates?: CreateParkingAccumulateDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateParkingWalletDto)
    wallet?: CreateParkingWalletDto;
}