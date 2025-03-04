export interface IMaterialBody {
    code: number;
    name: string;
    material_group_id: string;
    note?: string;
    material_type: number;
    tenant_id: string;
    category_id?: string;
    ltnname?: string;
    
    unit1?: string;
    barcode1?: string;
    defaults1?: boolean;
    
    unit2?: string;
    exchange2?: number; 
    barcode2?: string;
    defaults2?: boolean;
    
    unit3?: string;
    exchange3?: number;
    barcode3?: string;
    defaults3?: boolean;
}

export interface IMaterialPricesBody {
    currency_id?: string;
    currency_val?: number;
    vat_rate: number;
    average_purchase?: number;
    biggest_purchase?: number;
    pricing_policy?: number;
    purchase_date?: Date;
    average_sales?: number;
    largest_sales?: number;
    last_price?: number;
    sales_date?: Date;
}


export interface IMaterialPricesDetailsBody {
    price_type: number;
    unit1?: number;
    unit2?: number;
    unit3?: number;
}

export interface IMaterialBalanceBody {
    store_id: string;
    quality1?: number;
    quality2?: number; 
    quality3?: number;
}

export interface IMaterialMinimumBody {
    store_id: string;
    minimum: number;
    maximum: number;
    note?: string;
}

export interface IMaterialSpecification {
    specification: string;
    value: number;
    note?: string;
}

export interface IMaterialRequestBody {
    material: IMaterialBody;
    prices?: IMaterialPricesBody;
    priceDetails?: IMaterialPricesDetailsBody;
    balance?: IMaterialBalanceBody;
    minimum?: IMaterialMinimumBody;
    specifications?: IMaterialSpecification[];
}

export interface IMaterialResponseBody {
    material: any;
    prices?: any;
    priceDetails?: any;
    balance?: any;
    minimum?: any;
    specifications?: any[];
}