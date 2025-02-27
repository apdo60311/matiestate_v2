export interface ILandPicture {
    land_id: string;
    picture: string;
    tenant_id?: string;
}

export interface ILandRentalPrice {
    land_id: string;
    date: Date;
    price: number;
    currency_id?: string;
    note?: string;
    tenant_id?: string;
    number?: number;
}

export interface ILandSellingPrice {
    land_id: string;
    date: Date;
    price: number;
    currency_id?: string;
    note?: string;
    tenant_id?: string;
    number?: number;
}

export interface ILandAccumulate {
    number?: number;
    main_land_id: string;
    land_id: string;
    tenant_id: string;
}

export interface ILandWallet {
    land_id: string;
    number: string;
    contract_id: string;
    main_cost: number;
    expense?: number;
    begin_date?: Date;
    sale_date?: Date;
    sale_value?: number;
    tenant_id?: string;
}

export interface ILandBody {
    land_no?: string;
    name?: string;
    last_name?: string;
    type: number;
    ban?: boolean;
    date?: Date;
    number?: number;
    city?: string;
    region?: string;
    space?: string;
    area?: number;
    area_unit?: string;
    street_name?: string;
    street_count?: number;
    side?: string;
    license_no?: string;
    license?: string;
    license_date?: Date;
    details?: string;
    land_type?: string;
    buildble?: boolean;
    landowner?: number;
    begin_land_value?: number;
    currency_val_begin_land?: number;
    currency_val_purchase?: number;
    purchase_note?: string;
    commission_percent?: number;
    identity_value?: number;
    currency_valid_entity?: number;
    identity_begin_date?: Date;
    identity_end_date?: Date;
    create_entry_investment?: boolean;
    identity_note?: string;
    ltn_land_type?: string;
    ltn_city?: string;
    ltn_region?: string;
    ltn_space?: string;
    ltn_license?: string;
    ltn_side?: string;
    ltnname?: string;
    rent?: number;
    used_end_date?: boolean;
    customer_id?: string;
    account_id?: string;
    cuowner_id?: string;
    cost_center_id?: string;
    bank_account_id?: string;
    account_comm_income_id?: string;
    customer_owner_id?: string;
    owner_account_id?: string;
    currency_identity_id?: string;
    currency_begin_land_id?: string;
    begin_land_cost_center_id?: string;
    currency_purchase_id?: string;
    rent_currency_id?: string;
    tenant_id?: string;
    identity_entry_id?: string;

    rental_price?: ILandRentalPrice;
    selling_price?: ILandSellingPrice;
    accumulates?: ILandAccumulate[];
    wallet?: ILandWallet;
}