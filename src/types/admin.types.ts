export interface ICompany {
    id: string;
    customer_phone: string;
    customer_name: string;
    company_name: string;
    company_email: string;
    company_phone: string;
    status?: number;
  }
  
  export interface IPackage {
    id: string;
    total_units_count: number;
    unit_price: number;
    package: number;
    available: boolean;
    package_name: string;
  }
  
  export interface ITenant {
    id: string;
    emirate: string;
    address: string;
    license_start: string;
    license_expired: string;
    months: number;
    status: number;
    total_price: number;
    company_id: string;
    package_id: string;
  }
  
  export interface IManager {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: number;
  }
  