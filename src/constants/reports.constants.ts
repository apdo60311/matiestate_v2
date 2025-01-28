export const ALL = 0;
export const EXISIT = 1;
export const NOT_EXISIT = 2;

export const APARTMENT_SALE_CONTRACT = 4;
export const APARTMENT_RENT_CONTRACT = 1;
export const SHOP_SALE_CONTRACT = 5;
export const SHOP_RENT_CONTRACT = 2;
export const PARKING_SALE_CONTRACT = 6;
export const PARKING_RENT_CONTRACT = 3;

export const TERMINATION_NO_FINISHED = 1;
export const TERMINATION_COMPLETE = 2;
export const TERMINATION_CONTRACTS = 3;

export const CONTAINSWORD = 1;
export const NOTCONTAINSWORD = 2;

export const WITH_LAWSUIT = 1;
export const WITHOUT_LAWSUIT = 2;

export const BLOCKED_UNIT = 1;
export const NON_BLOCKED_UNIT = 2;

export const NOTE_CONTAIN = 1;
export const NOTE_NOT_CONTAIN = 2;

export const LEASING_STATUS = 1;
export const NOT_LESAING_STATUS = 2;

export const APARTMENT = 1;
export const PARKING = 2;
export const SHOP = 3;
export const LAND = 4;
export const VILLA = 5;

export const CLOSE_TO_COMPLETION = 1;
export const FINISHED = 2;
export const MAST = 3;

export const OCCUOPIED = "occupied";
export const EMPTY = "empty";

export enum UserType {
  Customer = 1,
  Owner = 2,
  Supervisor = 3,
  Worker = 4,
}

export const SELECTED_MEMBER_FIELDS = [
  "id",
  "name",
  "email",
  "phone",
  "user_type",
  "is_verified",
] as const;

export const SELECTED_USER_FIELDS = [
  "name",
  "account_id",
  "card_type",
  "tenant_id",
  "fcm_token",
] as const;

export const SELECTED_MANAGER_FIELDS = ["role"] as const;

export const SELECTED_TENANT_DETAILS_FIELDS = [
  "license_start",
  "license_expired",
  "months",
  "package_id",
  "is_active",
  "total_price",
] as const;

export const SELECTED_ADMIN_FIELDS = [
  "id",
  "name",
  "email",
  "phone",
] as const;

export enum UploadType {
  SERVICE_CUSTOMER_ATTACHMENT = "SERVICE_CUSTOMER_ATTACHMENT",
  SERVICE_WORKER_ATTACHMENT = "SERVICE_WORKER_ATTACHMENT",
  SERVICE_SUPERVISOR_ATTACHMENT = "SERVICE_SUPERVISOR_ATTACHMENT",
}

export enum ServiceStatus {
  Pending = 1,
  Return = 2,
  Reject = 3,
  Approval = 4,
  Underway = 5,
  Done = 6,
  Postponed = 7,
}

export enum ServiceType {
  Maintenances = 1,
  PropertyPreparing = 2,
}

export enum TenantStatus {
  Waiting = 1,
  Active = 2,
  Expired = 3,
  Renewal = 4,
}
