import { Building } from "../entities/Building.entity";
import { CostCenter } from "../entities/CostCenter.entity";
import { PropertyValues } from "../entities/PropertyValues.entity";
import { Tenant } from "../entities/Tenant.entity";

export interface IShopPicture {
    shop_id: string;
    picture: string;
    tenant_id?: string;
}

export interface IShopRentalPrice {
    shop_id: string;
    date: Date;
    price?: number;
    currency_id?: string;
    cost_price?: number;
    cost_currency_id?: string;
    rent?: number;
    tenant_id?: string;
    number?: number;
}

export interface IShopSellingPrice {
    shop_id: string;
    date: Date;
    price?: number;
    currency_id?: string;
    note?: string;
    tenant_id?: string;
    number?: number;
}

export interface IShopAccumulate {
    number?: number;
    main_shop_id: string;
    shop_id: string;
    tenant_id: string;
}

export interface IShopFixedAssets {
    assets_id?: string;
    value?: number;
    note?: string;
    shop_id: string;
    tenant_id?: string;
}

export interface IShopBody {
    shop_no: string;
    floor_no?: string;
    description?: string;
    x_index?: number;
    y_index?: number;
    cost_center_id?: string;
    kind?: string;
    area?: number;
    area_unit?: string;
    view?: string;
    license1?: string;
    license2?: string;
    unified_num?: string;
    has_lawsuit?: boolean;
    water_meter?: string;
    electricity_meter?: string;
    bond_type?: string;
    bond_no?: string;
    bond_date?: Date;
    note?: string;
    hex?: string;
    property_type?: number;
    number?: number;
    row_index?: number;
    asset_hash?: string;
    main_cost_center_id?: string;
    shop_kind?: number;
    code?: number;
    blocked?: boolean;
    building_id: string;
    customer_id?: string;
    customer_owner_id?: string;
    property_values_id?: string;
    tenant_id?: string;
    building?: Building;
    cost_center?: CostCenter;
    property_values?: PropertyValues;
    tenant?: Tenant;
    pictures?: IShopPicture[];
    rental_price?: IShopRentalPrice;
    selling_price?: IShopSellingPrice;
    accumulates?: IShopAccumulate[];
    fixed_assets?: IShopFixedAssets[];
}