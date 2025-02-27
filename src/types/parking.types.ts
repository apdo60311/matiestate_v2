export interface IParkingPicture {
    parking_id: string;
    picture: string;
    tenant_id?: string;
}

export interface IParkingRentalPrice {
    parking_id: string;
    date: Date;
    price: number;
    currency_id?: string;
    note?: string;
    tenant_id?: string;
    number?: number;
}

export interface IParkingSellingPrice {
    parking_id: string;
    date: Date;
    price: number;
    currency_id?: string;
    note?: string;
    tenant_id?: string;
    number?: number;
}

export interface IParkingAccumulate {
    number?: number;
    main_parking_id: string;
    parking_id: string;
    tenant_id: string;
}

export interface IParkingWallet {
    parking_id: string;
    number: string;
    contract_id: string;
    building_id: string;
    main_cost: number;
    expense?: number;
    begin_date?: Date;
    sale_date?: Date;
    sale_value?: number;
    tenant_id?: string;
}

export interface IParkingBody {
    parking_no: string;
    floor_no?: string;
    description?: string;
    x_index?: number;
    y_index?: number;
    area?: number;
    area_unit?: string;
    view?: string;
    parking_kind?: number;
    has_lawsuit?: boolean;
    property_type?: number;
    hex?: string;
    row_index?: number;
    asset_hash?: string;
    code?: number;
    blocked?: boolean;
    note?: string;
    building_id: string;
    customer_id?: string;
    flat_owner_id?: string;
    cost_center_id?: string;
    main_cost_center_id?: string;
    property_values_id?: string;
    tenant_id?: string;
    pictures?: IParkingPicture[];
    rental_price?: IParkingRentalPrice;
    selling_price?: IParkingSellingPrice;
    accumulates?: IParkingAccumulate[];
    wallet?: IParkingWallet;
}