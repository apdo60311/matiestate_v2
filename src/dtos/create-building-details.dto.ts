import { Type } from 'class-transformer';
import { 
  IsArray, 
  IsBoolean, 
  IsNumber, 
  IsObject, 
  IsOptional, 
  IsString, 
  ValidateNested 
} from 'class-validator';


/**
 * @openapi
 * components:
 *   schemas:
 *     PropertyValuesDto:
 *       type: object
 *       properties:
 *         value:
 *           type: number
 *         note:
 *           type: string
 *         tenant_id:
 *           type: string
 *         number:
 *           type: number
 */
class PropertyValuesDto {
  @IsNumber()
  @IsOptional()
  value?: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsOptional()
  tenant_id?: string;

  @IsNumber()
  @IsOptional()
  number?: number;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     BaseAssetDto:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *         area:
 *           type: number
 *         area_unit:
 *           type: string
 *         view:
 *           type: string
 *         has_lawsuit:
 *           type: boolean
 *         main_cost_center_id:
 *           type: string
 *           format: uuid
 *         cost_center_id:
 *           type: string
 *           format: uuid
 *         water_meter:
 *           type: string
 *         electricity_meter:
 *           type: string
 *         statement:
 *           type: string
 *         note:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         x_index:
 *           type: number
 *         y_index:
 *           type: number
 *         floor_no:
 *           type: number
 *         asset_hash:
 *           type: string
 *         row_index:
 *           type: number
 *         hex:
 *           type: string
 */
class BaseAssetDto {
    @IsString()
    @IsOptional() 
    description?: string;
  
    @IsNumber()
    @IsOptional()
    area?: number;
  
    @IsString()
    @IsOptional()
    area_unit?: string;
  
    @IsString()
    @IsOptional()
    view?: string;
  
    @IsBoolean()
    @IsOptional()
    has_lawsuit?: boolean;
  
    @IsString()
    @IsOptional()
    main_cost_center_id?: string;
  
    @IsString()
    @IsOptional()
    cost_center_id?: string;
  
    @IsString()
    @IsOptional()
    water_meter?: string;
  
    @IsString()
    @IsOptional()
    electricity_meter?: string;
  
    @IsString()
    @IsOptional()
    statement?: string;
  
    @IsString()
    @IsOptional()
    note?: string;
  
    @IsString()
    @IsOptional()
    tenant_id?: string;
  
    @IsNumber()
    @IsOptional()
    x_index?: number;
  
    @IsNumber()
    @IsOptional()
    y_index?: number;
  
    @IsNumber()
    @IsOptional()
    floor_no?: number;
  
    @IsString()
    @IsOptional()
    asset_hash?: string;
  
    @IsNumber()
    @IsOptional()
    row_index?: number;
  
    @IsString()
    @IsOptional()
    hex?: string;
  }
  

/**
 * @openapi
 * components:
 *   schemas:
 *     ApartmentDetailDto:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAssetDto'
 *         - type: object
 *           required:
 *             - apartment_no
 *             - apartment_kind
 *           properties:
 *             apartment_no:
 *               type: string
 *             category:
 *               type: string
 *             bathroom_count:
 *               type: number
 *             balcony_count:
 *               type: number
 *             room_count:
 *               type: number
 *             property_values_id:
 *               type: string
 *               format: uuid
 *             apartment_kind:
 *               type: number
 */
class ApartmentDetailDto extends BaseAssetDto {
  @IsString()
  apartment_no!: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  bathroom_count?: number;

  @IsNumber()
  @IsOptional()
  balcony_count?: number;

  @IsNumber()
  @IsOptional()
  room_count?: number;

  @IsString()
  @IsOptional()
  property_values_id?: string;

  @IsNumber()
  apartment_kind!: number;
}


/**
 * @openapi
 * components:
 *   schemas:
 *     ShopDetailDto:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAssetDto'
 *         - type: object
 *           required:
 *             - shop_no
 *             - shop_kind
 *           properties:
 *             shop_no:
 *               type: string
 *             shop_kind:
 *               type: number
 */
class ShopDetailDto extends BaseAssetDto {
  @IsString()
  shop_no!: string;

  @IsNumber()
  shop_kind!: number;
}


/**
 * @openapi
 * components:
 *   schemas:
 *     ParkingDetailDto:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseAssetDto'
 *         - type: object
 *           required:
 *             - parking_no
 *             - parking_kind
 *           properties:
 *             parking_no:
 *               type: string
 *             parking_kind:
 *               type: number
 */
class ParkingDetailDto extends BaseAssetDto {
  @IsString()
  parking_no!: string;

  @IsNumber()
  parking_kind!: number;
}


/**
 * @openapi
 * components:
 *   schemas:
 *     BuildingDetailsDataDto:
 *       type: object
 *       required:
 *         - apartment
 *         - mezzanine
 *         - office
 *         - store
 *         - shop
 *         - parking
 *         - penthouse
 *         - underground parking
 *       properties:
 *         apartment:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ApartmentDetailDto'
 *         mezzanine:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ApartmentDetailDto'
 *         office:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ApartmentDetailDto'
 *         store:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ShopDetailDto'
 *         shop:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ShopDetailDto'
 *         parking:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ParkingDetailDto'
 *         penthouse:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ApartmentDetailDto'
 *         'underground parking':
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/ParkingDetailDto'
 */
class BuildingDetailsDataDto {
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ApartmentDetailDto)
    apartment!: Record<string, ApartmentDetailDto>;
  
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ApartmentDetailDto)
    mezzanine!: Record<string, ApartmentDetailDto>;
  
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ApartmentDetailDto)
    office!: Record<string, ApartmentDetailDto>;
  
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ShopDetailDto)
    store!: Record<string, ShopDetailDto>;
  
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ShopDetailDto)
    shop!: Record<string, ShopDetailDto>;
  
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ParkingDetailDto)
    parking!: Record<string, ParkingDetailDto>;
  
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ApartmentDetailDto)
    penthouse!: Record<string, ApartmentDetailDto>;
  
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ParkingDetailDto)
    'underground parking'!: Record<string, ParkingDetailDto>;
  }
  

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBuildingDetailsDto:
 *       type: object
 *       required:
 *         - property_values
 *         - building_details
 *       properties:
 *         property_values:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PropertyValuesDto'
 *         building_details:
 *           $ref: '#/components/schemas/BuildingDetailsDataDto'
 */
export class CreateBuildingDetailsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyValuesDto)
  property_values!: PropertyValuesDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => BuildingDetailsDataDto)
  building_details!: BuildingDetailsDataDto;
}