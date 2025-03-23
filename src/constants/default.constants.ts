// SERVICES CODE
export const SERVICE_CUSTOMER_CODE = 1;
export const SERVICE_PROPERTY_PREPARING_CODE = 2;

export const USER_CUSTOMER_CODE = 1;
export const USER_SUPPLIER_CODE = 2;
export const USER_SUPERVISOR_CODE = 3;
export const USER_WORKER_CODE = 4;

export const MAIN_USERS_CODE = {
    USER_CUSTOMER_CODE: 121,
    USER_SUPPLIER_CODE: 221,
};

// Lack reasons
export const LACK_REASON_TENANT_NOT_EXIST_CODE = 1;
export const LACK_REASON_WE_NEED_MATERIAL_CODE = 2;

export const ACCOUNT_NORMAL_TYPE_CODE = 1;
export const ACCOUNT_CLOSING_TYPE_CODE = 2;
export const ACCOUNT_ASSEMBLY_TYPE_CODE = 3;
export const ACCOUNT_DISTRIBUTIVE_TYPE_CODE = 4;
export const ACCOUNT_NORMAL_TYPE_NAME = "account_normal";
export const ACCOUNT_CLOSING_TYPE_NAME = "account_closing";
export const ACCOUNT_ASSEMBLY_TYPE_NAME = "account_assembly";
export const ACCOUNT_DISTRIBUTIVE_TYPE_NAME = "account_distributive";

// Connect With DEFAULT
export const CONNECT_WITH_NOTHING_CODE = 0;
export const CONNECT_WITH_CONTRACT_CODE = 1;
export const CONNECT_WITH_LAWSUIT_CODE = 2;
export const CONNECT_WITH_BILL_CODE = 3;
export const CONNECT_WITH_NOTHING_NAME = "Nothing";
export const CONNECT_WITH_CONTRACT_NAME = "Contract";
export const CONNECT_WITH_LAWSUIT_NAME = "Lawsuit";
export const CONNECT_WITH_BILL_NAME = "Bill";

export const BILL_CONNECT_WITH_MAINTENANCES_CODE = 1;
export const BILL_CONNECT_WITH_MAINTENANCES_NAME = "Service";

// Created From DEFAULT
export const CREATED_FROM_CONTRACT = "CONTRACT";
export const CREATED_FROM_BILL = "BILL";
export const CREATED_FROM_CHQ = "CHQ";
export const CREATED_FROM_VOUCHER = "VOUCHER";
export const CREATED_FROM_CONTRACT_TERMINATION = "CONTRACT_TERMINATION";
export const CREATED_FROM_CONTRACT_FINES = "CONTRACT_FINES";
export const CREATED_FROM_CONTRACT_FEES = "CONTRACT_FEES";
export const CREATED_FROM_CONTRACT_RESERVATION = "RESERVATION";
export const CREATED_FROM_CONTRACT_LAWSUIT = "LAWSUIT";

export const CREATED_FROM_CHQ_OPERATION = {
    op_collection: 'OP_COLLECTION',
    op_partial_collection: 'OP_PARTIAL_COLLECTION',
    op_return: 'OP_RETURN',
}

// Currency DEFAULT
export const DEFAULT_CURRENCY_NAME = "United Arab Emirates Dirham";
export const DEFAULT_CURRENCY_CODE = "AED";
export const DEFAULT_CURRENCY_RATE = 1;

// BILL PATTERN DEFAULT NAME
export const BILL_TYPE_PAID_CODE = 1;
export const BILL_TYPE_RECEIVED_CODE = 2;

export const BILL_PAID_CODE = 1;
export const BILL_PAID_NAME = "Purchase Invoice";
export const BILL_RECEIVED_CODE = 2;
export const BILL_RECEIVED_NAME = "VAT Invoice";

// CHQ PATTERN DEFAULT NAME
export const CHQ_PAID_CODE = 1;
export const CHQ_PAID_NAME = "Paid Check";
export const CHQ_RECEIVED_CODE = 2;
export const CHQ_RECEIVED_NAME = "Received Check";

// Vouchers PATTERN DEFAULT NAME
export const VOUCHER_PAYMENT_CODE = 1;
export const VOUCHER_RECEIPTS_CODE = 2;
export const VOUCHER_PAYMENT_NAME = "Payment Voucher";
export const VOUCHER_RECEIPTS_NAME = "Receipt Voucher";
export const VOUCHER_LIST_NAME = "Vouchers";

// CONTRACT PATTERN DEFAULT CONSTANTS
export const CONTRACT_RENT_LIST_NAME = "Contract Rent";
export const CONTRACT_SALE_LIST_NAME = "Contract Sale";

export const APARTMENT_ASSET_TYPE_CODE = 1;
export const PARKING_ASSET_TYPE_CODE = 2;
export const SHOP_ASSET_TYPE_CODE = 3;
export const LAND_ASSET_TYPE_CODE = 4;
export const VILLA_ASSET_TYPE_CODE = 5;

export const APARTMENT_ASSET_TYPE_DEFAULT_NAME = "Apartment";
export const PARKING_ASSET_TYPE_DEFAULT_NAME = "Parking";
export const SHOP_ASSET_TYPE_DEFAULT_NAME = "Shop";
export const LAND_ASSET_TYPE_DEFAULT_NAME = "Land";
export const VILLA_ASSET_TYPE_DEFAULT_NAME = "Villa";

// CONTRACT PATTERN DEFAULT CONSTANTS
export const CONTRACT_SALE_CODE = 1;
export const CONTRACT_RENT_CODE = 2;
export const CONTRACT_SALE_APARTMENT_NAME = "Apartment Sale Contract";
export const CONTRACT_SALE_PARKING_NAME = "Parking Sale Contract";
export const CONTRACT_SALE_SHOP_NAME = "Shop Sale Contract";
export const CONTRACT_SALE_LAND_NAME = "Apartment Sale Contract";
export const CONTRACT_RENT_APARTMENT_NAME = "Apartment Rent Contract";
export const CONTRACT_RENT_PARKING_NAME = "Parking Rent Contract";
export const CONTRACT_RENT_SHOP_NAME = "Shop Rent Contract";
