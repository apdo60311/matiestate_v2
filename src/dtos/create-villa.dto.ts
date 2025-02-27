import { Type } from 'class-transformer';
import { 
    IsString, 
    IsNumber, 
    IsBoolean, 
    IsOptional, 
    IsUUID,
    Min,
    ValidateNested
} from 'class-validator';

export class CreateVillaRentalPriceDto {
    @Type(() => Date)
    date!: Date;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsNumber()
    number?: number;

    @IsUUID()
    villa_id!: string;
}

export class CreateVillaSellingPriceDto {
    @Type(() => Date)
    date!: Date;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsNumber()
    number?: number;

    @IsUUID()
    villa_id!: string;
}

export class CreateVillaDto {
    @IsString()
    complex_name!: string;

    @IsString()
    villa_no!: string;

    @IsOptional()
    @IsString()
    emirate?: string;

    @IsOptional()
    @IsString()
    area?: string;

    @IsOptional()
    @IsString()
    suburb?: string;

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    doc_type?: string;

    @IsOptional()
    @IsString()
    doc_no?: string;

    @IsOptional()
    @Type(() => Date)
    doc_date?: Date;

    @IsOptional()
    @IsString()
    piece_no?: string;

    @IsOptional()
    @IsString()
    basin_no?: string;

    @IsOptional()
    @IsNumber()
    water_meter?: number;

    @IsOptional()
    @IsNumber()
    electricity_meter?: number;

    @IsOptional()
    @IsUUID()
    owner_account_id?: string;

    @IsOptional()
    @IsUUID()
    villa_account_id?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsUUID()
    account_bank_villa_id?: string;

    @IsOptional()
    @IsUUID()
    cash_account_id?: string;

    @IsOptional()
    @IsUUID()
    insurance_account_id?: string;

    @IsOptional()
    @IsUUID()
    lessor_id?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    assets_id?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    value?: number;

    @IsOptional()
    @IsString()
    statement?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    number?: number;

    @IsOptional()
    @IsString()
    wall?: string;

    @IsOptional()
    @IsString()
    wall_state?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    lighting_count?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    parking_count?: number;

    @IsOptional()
    @IsString()
    parking_area?: string;

    @IsOptional()
    @IsString()
    parking_shaded?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    pool_count?: number;

    @IsOptional()
    @IsString()
    pool_state?: string;

    @IsOptional()
    @IsString()
    pool_system?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    play_ground_count?: number;

    @IsOptional()
    @IsString()
    play_ground_area?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    garden_count?: number;

    @IsOptional()
    @IsString()
    garden_area?: string;

    @IsOptional()
    @IsString()
    garden_state?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    floor_count?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    balcony_count?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    room_count?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    service_room_count?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    other_room_count?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    bath_room_count?: number;

    @IsOptional()
    @IsString()
    stairs_internal?: string;

    @IsOptional()
    @IsString()
    room_state?: string;

    @IsOptional()
    @IsString()
    land_area?: string;

    @IsOptional()
    @IsString()
    land_area_building?: string;

    @IsOptional()
    @IsString()
    area_unit?: string;

    @IsOptional()
    @IsString()
    finishing_state?: string;

    @IsOptional()
    @IsString()
    security_system?: string;

    @IsOptional()
    @IsNumber()
    security_type?: number;

    @IsOptional()
    @IsBoolean()
    ban?: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateVillaRentalPriceDto)
    rental_price?: CreateVillaRentalPriceDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateVillaSellingPriceDto)
    selling_price?: CreateVillaSellingPriceDto;
}