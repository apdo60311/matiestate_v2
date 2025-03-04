import { Type } from 'class-transformer';
import { 
    IsString, 
    IsNumber, 
    IsBoolean, 
    IsOptional, 
    IsUUID,
    Min,
    ValidateNested,
    IsArray,
    IsDefined
} from 'class-validator';

// Base Material DTO with required fields
export class MaterialDto {
    @IsString()
    name!: string;

    @IsNumber()
    code!: number;

    @IsUUID()
    material_group_id!: string;

    @IsNumber()
    material_type!: number;

    @IsUUID()
    tenant_id!: string;

    // Optional fields
    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    category_id?: string;

    @IsOptional()
    @IsString()
    ltnname?: string;

    // Units
    @IsOptional()
    @IsString()
    unit1?: string;

    @IsOptional()
    @IsString()
    barcode1?: string;

    @IsOptional()
    @IsBoolean()
    defaults1?: boolean;

    @IsOptional()
    @IsString()
    unit2?: string;

    @IsOptional()
    @IsNumber()
    exchange2?: number;

    @IsOptional()
    @IsString()
    barcode2?: string;

    @IsOptional()
    @IsBoolean()
    defaults2?: boolean;

    @IsOptional()
    @IsString()
    unit3?: string;

    @IsOptional()
    @IsNumber()
    exchange3?: number;

    @IsOptional()
    @IsString()
    barcode3?: string;

    @IsOptional()
    @IsBoolean()
    defaults3?: boolean;
}

export class MaterialPricesDto {
    @IsUUID()
    tenant_id!: string;

    @IsNumber()
    vat_rate!: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsNumber()
    currency_val?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    average_purchase?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    biggest_purchase?: number;

    @IsOptional()
    @IsNumber()
    pricing_policy?: number;

    @IsOptional()
    @Type(() => Date)
    purchase_date?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    average_sales?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    largest_sales?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    last_price?: number;

    @IsOptional()
    @Type(() => Date)
    sales_date?: Date;
}

export class MaterialPriceDetailsDto {
    @IsNumber()
    price_type!: number;

    @IsUUID()
    tenant_id!: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    unit1_price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    unit2_price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    unit3_price?: number;
}

export class MaterialBalanceDto {
    @IsUUID()
    store_id!: string;

    @IsUUID()
    tenant_id!: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity1?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity2?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity3?: number;
}

export class MaterialMinimumDto {
    @IsUUID()
    store_id!: string;

    @IsUUID()
    tenant_id!: string;

    @IsNumber()
    @Min(0)
    minimum!: number;

    @IsNumber()
    @Min(0)
    maximum!: number;

    @IsOptional()
    @IsString()
    note?: string;
}

export class MaterialSpecificationsDto {
    @IsString()
    specification!: string;

    @IsNumber()
    value!: number;

    @IsUUID()
    tenant_id!: string;

    @IsOptional()
    @IsString()
    note?: string;
}

export class MaterialRequestDto {
    @IsDefined()
    @ValidateNested({
        each: true,
        message: 'Material is required'
    })
    @Type(() => MaterialDto)
    material!: MaterialDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => MaterialPricesDto)
    prices?: MaterialPricesDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => MaterialPriceDetailsDto)
    priceDetails?: MaterialPriceDetailsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => MaterialBalanceDto)
    balance?: MaterialBalanceDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => MaterialMinimumDto)
    minimum?: MaterialMinimumDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MaterialSpecificationsDto)
    specifications?: MaterialSpecificationsDto[];
}