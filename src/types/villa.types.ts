export interface IVillaRentalPrice {
    villa_id: string;
    date?: Date;
    price?: number;
    currency_id?: string;
    tenant_id?: string;
    number?: number;
}

export interface IVillaSellingPrice {
    villa_id: string;
    date?: Date;
    price?: number;
    currency_id?: string;
    tenant_id?: string;
    number?: number;
}

export interface IVillaBody {
    complex_name: string;
    villa_no: string;
    emirate?: string;
    area?: string;
    suburb?: string;
    street?: string;
    doc_type?: string;
    doc_no?: string;
    doc_date?: Date;
    piece_no?: string;
    basin_no?: string;
    water_meter?: number;
    electricity_meter?: number;
    owner_account_id?: string;
    villa_account_id?: string;
    cost_center_id?: string;
    account_bank_villa_id?: string;
    cash_account_id?: string;
    insurance_account_id?: string;
    lessor_id?: string;
    tenant_id?: string;
    assets_id?: string;
    value?: number;
    statement?: string;
    note?: string;
    number?: number;
    wall?: string;
    wall_state?: string;
    lighting_count?: number;
    parking_count?: number;
    parking_area?: string;
    parking_shaded?: string;
    pool_count?: number;
    pool_state?: string;
    pool_system?: string;
    play_ground_count?: number;
    play_ground_area?: string;
    garden_count?: number;
    garden_area?: string;
    garden_state?: string;
    floor_count?: number;
    balcony_count?: number;
    room_count?: number;
    service_room_count?: number;
    other_room_count?: number;
    bath_room_count?: number;
    stairs_internal?: string;
    room_state?: string;
    land_area?: string;
    land_area_building?: string;
    area_unit?: string;
    finishing_state?: string;
    security_system?: string;
    security_type?: number;
    ban?: boolean;

    rental_price?: IVillaRentalPrice;
    selling_price?: IVillaSellingPrice;
}