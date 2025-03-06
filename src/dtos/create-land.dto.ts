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


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLandRentalPriceDto:
 *       type: object
 *       required:
 *         - date
 *         - price
 *         - land_id
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *         price:
 *           type: number
 *           minimum: 0
 *         currency_id:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         number:
 *           type: number
 *         land_id:
 *           type: string
 *           format: uuid
 */
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


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLandSellingPriceDto:
 *       type: object
 *       required:
 *         - date
 *         - price
 *         - land_id
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *         price:
 *           type: number
 *           minimum: 0
 *         currency_id:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         number:
 *           type: number
 *         land_id:
 *           type: string
 *           format: uuid
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLandAccumulateDto:
 *       type: object
 *       required:
 *         - main_land_id
 *         - land_id
 *         - tenant_id
 *       properties:
 *         number:
 *           type: number
 *         main_land_id:
 *           type: string
 *           format: uuid
 *         land_id:
 *           type: string
 *           format: uuid
 *         tenant_id:
 *           type: string
 *           format: uuid
 */
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


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLandWalletDto:
 *       type: object
 *       required:
 *         - number
 *         - contract_id
 *         - main_cost
 *         - land_id
 *       properties:
 *         number:
 *           type: string
 *         contract_id:
 *           type: string
 *           format: uuid
 *         main_cost:
 *           type: number
 *           minimum: 0
 *         expense:
 *           type: number
 *         begin_date:
 *           type: string
 *           format: date-time
 *         sale_date:
 *           type: string
 *           format: date-time
 *         sale_value:
 *           type: number
 *           minimum: 0
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         land_id:
 *           type: string
 *           format: uuid
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLandDto:
 *       type: object
 *       required:
 *         - type
 *       properties:
 *         land_no:
 *           type: string
 *         name:
 *           type: string
 *         last_name:
 *           type: string
 *         type:
 *           type: number
 *         ban:
 *           type: boolean
 *         date:
 *           type: string
 *           format: date-time
 *         number:
 *           type: number
 *         city:
 *           type: string
 *         region:
 *           type: string
 *         space:
 *           type: string
 *         area:
 *           type: number
 *           minimum: 0
 *         area_unit:
 *           type: string
 *         street_name:
 *           type: string
 *         street_count:
 *           type: number
 *           minimum: 0
 *         side:
 *           type: string
 *         license_no:
 *           type: string
 *         license:
 *           type: string
 *         license_date:
 *           type: string
 *           format: date-time
 *         details:
 *           type: string
 *         land_type:
 *           type: string
 *         buildble:
 *           type: boolean
 *         landowner:
 *           type: number
 *         begin_land_value:
 *           type: number
 *           minimum: 0
 *         currency_val_begin_land:
 *           type: number
 *         currency_val_purchase:
 *           type: number
 *         purchase_note:
 *           type: string
 *         commission_percent:
 *           type: number
 *           minimum: 0
 *         identity_value:
 *           type: number
 *         currency_valid_entity:
 *           type: number
 *         identity_begin_date:
 *           type: string
 *           format: date-time
 *         identity_end_date:
 *           type: string
 *           format: date-time
 *         create_entry_investment:
 *           type: boolean
 *         identity_note:
 *           type: string
 *         ltn_land_type:
 *           type: string
 *         ltn_city:
 *           type: string
 *         ltn_region:
 *           type: string
 *         ltn_space:
 *           type: string
 *         ltn_license:
 *           type: string
 *         ltn_side:
 *           type: string
 *         ltnname:
 *           type: string
 *         rent:
 *           type: number
 *           minimum: 0
 *         used_end_date:
 *           type: boolean
 *         customer_id:
 *           type: string
 *           format: uuid
 *         account_id:
 *           type: string
 *           format: uuid
 *         cuowner_id:
 *           type: string
 *           format: uuid
 *         cost_center_id:
 *           type: string
 *           format: uuid
 *         bank_account_id:
 *           type: string
 *           format: uuid
 *         account_comm_income_id:
 *           type: string
 *           format: uuid
 *         customer_owner_id:
 *           type: string
 *           format: uuid
 *         owner_account_id:
 *           type: string
 *           format: uuid
 *         currency_identity_id:
 *           type: string
 *           format: uuid
 *         currency_begin_land_id:
 *           type: string
 *           format: uuid
 *         begin_land_cost_center_id:
 *           type: string
 *           format: uuid
 *         currency_purchase_id:
 *           type: string
 *           format: uuid
 *         rent_currency_id:
 *           type: string
 *           format: uuid
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         identity_entry_id:
 *           type: string
 *           format: uuid
 *         rental_price:
 *           $ref: '#/components/schemas/CreateLandRentalPriceDto'
 *         selling_price:
 *           $ref: '#/components/schemas/CreateLandSellingPriceDto'
 *         accumulates:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateLandAccumulateDto'
 *         wallet:
 *           $ref: '#/components/schemas/CreateLandWalletDto'
 */
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