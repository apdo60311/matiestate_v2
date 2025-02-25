export interface IApartmentPicture {
    apartment_id: string;
    picture: string;
    tenant_id?: string;
}

export interface IApartmentRentalPrice {
    apartment_id: string;
    date: Date;
    price: number;
    currency_id?: string;
    note?: string;
    tenant_id?: string;
    number?: number;
}

export interface IApartmentSellingPrice {
    apartment_id: string;
    date: Date;
    price: number;
    currency_id?: string;
    note?: string;
    tenant_id?: string;
    number?: number;
    apartment_kind?: string;
}

export interface IApartmentAccumulate {
    number?: number;
    main_apartment_id: string;
    apartment_id: string;
    tenant_id: string;
}

export interface IApartmentBody {
    building_id: string;
    apartment_no: string;
    floor_no?: string;
    description?: string;
    category?: string;
    area?: number;
    area_unit?: string;
    view?: string;
    bathroom_count?: number;
    balcony_count?: number;
    has_lawsuit?: boolean;
    main_cost_center_id?: string;
    cost_center_id?: string;
    property_type?: string;
    water_meter?: string;
    electricity_meter?: string;
    statement?: string;
    x_index: number;
    y_index: number;
    room_count?: number;
    property_values_id?: string;
    hex?: string;
    cost_price?: number;
    amount_paid?: number;
    cost_currency_id?: string;
    note?: string;
    apartment_kind?: number;
    row_index?: number;
    asset_hash?: string;
    code?: number;
    blocked?: boolean;
    kind?: string;
    tenant_id?: string;
    pictures?: IApartmentPicture[];
    rental_price?: IApartmentRentalPrice;
    selling_price?: IApartmentSellingPrice;
    accumulates?: IApartmentAccumulate[];
}