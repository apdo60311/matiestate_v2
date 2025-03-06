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


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateApartmentDto:
 *       type: object
 *       required:
 *         - building_id
 *         - apartment_no
 *         - x_index
 *         - y_index
 *       properties:
 *         building_id:
 *           type: string
 *           format: uuid
 *         apartment_no:
 *           type: string
 *         floor_no:
 *           type: string
 *         area:
 *           type: number
 *           minimum: 0
 *         bathroom_count:
 *           type: integer
 *           minimum: 0
 *         pictures:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateApartmentPicturesDto'
 *         rental_price:
 *           $ref: '#/components/schemas/CreateApartmentRentalPriceDto'
 *         selling_price:
 *           $ref: '#/components/schemas/CreateApartmentSellingPriceDto'
 *         accumulates:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateApartmentAccumulateDto'
 */
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


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateApartmentPicturesDto:
 *       type: object
 *       required:
 *         - apartment_id
 *         - picture
 *       properties:
 *         apartment_id:
 *           type: string
 *           format: uuid
 *         picture:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 */
export class CreateApartmentPicturesDto {
    @IsUUID()
    apartment_id!: string;

    @IsString()
    picture!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateApartmentRentalPriceDto:
 *       type: object
 *       required:
 *         - apartment_id
 *         - date
 *         - price
 *       properties:
 *         apartment_id:
 *           type: string
 *           format: uuid
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
 *         number:
 *           type: integer
 */
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


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateApartmentSellingPriceDto:
 *       type: object
 *       required:
 *         - apartment_id
 *         - date
 *         - price
 *       properties:
 *         apartment_id:
 *           type: string
 *           format: uuid
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
 *         number:
 *           type: integer
 *         apartment_kind:
 *           type: string
 */
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


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateApartmentAccumulateDto:
 *       type: object
 *       required:
 *         - main_apartment_id
 *         - apartment_id
 *         - tenant_id
 *       properties:
 *         number:
 *           type: integer
 *         main_apartment_id:
 *           type: string
 *           format: uuid
 *         apartment_id:
 *           type: string
 *           format: uuid
 *         tenant_id:
 *           type: string
 *           format: uuid
 */
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