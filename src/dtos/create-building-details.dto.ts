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

class ShopDetailDto extends BaseAssetDto {
  @IsString()
  shop_no!: string;

  @IsNumber()
  shop_kind!: number;
}

class ParkingDetailDto extends BaseAssetDto {
  @IsString()
  parking_no!: string;

  @IsNumber()
  parking_kind!: number;
}

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