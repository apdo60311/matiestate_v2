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


export class CreateApartmentDto {
    @IsUUID()
    building_id!: string;

    @IsString()
    apartment_no!: string;

    @IsOptional()
    @IsString()
    floor_no?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    category?: string;

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
    @Min(0)
    bathroom_count?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    balcony_count?: number;

    @IsOptional()
    @IsBoolean()
    has_lawsuit?: boolean = false;

    @IsOptional()
    @IsUUID()
    main_cost_center_id?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsString()
    property_type?: string;

    @IsOptional()
    @IsString()
    water_meter?: string;

    @IsOptional()
    @IsString()
    electricity_meter?: string;

    @IsOptional()
    @IsString()
    statement?: string;

    @IsNumber()
    x_index!: number;

    @IsNumber()
    y_index!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    room_count?: number;

    @IsOptional()
    @IsUUID()
    property_values_id?: string;

    @IsOptional()
    @IsString()
    hex?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    cost_price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    amount_paid?: number;

    @IsOptional()
    @IsUUID()
    cost_currency_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    apartment_kind?: number = 1;

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
    kind?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateApartmentPicturesDto)
    pictures?: CreateApartmentPicturesDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateApartmentRentalPriceDto)
    rental_price?: CreateApartmentRentalPriceDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateApartmentSellingPriceDto)
    selling_price?: CreateApartmentSellingPriceDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateApartmentAccumulateDto)
    accumulates?: CreateApartmentAccumulateDto[];
}


export class CreateApartmentPicturesDto {
    @IsUUID()
    apartment_id!: string;

    @IsString()
    picture!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}


export class CreateApartmentRentalPriceDto {
    @IsUUID()
    apartment_id!: string;

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
}


export class CreateApartmentSellingPriceDto {
    @IsUUID()
    apartment_id!: string;

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

    @IsOptional()
    @IsString()
    apartment_kind?: string;
}


export class CreateApartmentAccumulateDto {
    @IsNumber()
    @IsOptional()
    number?: number;

    @IsUUID()
    main_apartment_id!: string;

    @IsUUID()
    apartment_id!: string;

    @IsUUID()
    tenant_id!: string;
}