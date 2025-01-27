export interface ICreateCompanyBody {
    id: string;
    customer_phone: string;
    customer_name: string;
    company_name: string;
    company_email: string;
    company_phone: string;
    status?: number;
  }

  export interface ICompanyRequestParam {
    id: string;
  }  

  export interface IUpdateCompanyBody {
    customer_phone?: string;
    customer_name?: string;
    company_name?: string;
    company_email?: string;
    company_phone?: string;
    status?: number;
  }

  export interface ICreatePackageBody {
    id: string;
    total_units_count: number;
    unit_price: number;
    package: number;
    available: boolean;
    package_name: string;
  }

  export interface IPackageRequestParam {
    id: string;
  }

  export interface IUpdatePackageBody {
    total_units_count?: number;
    unit_price?: number;
    package?: number;
    available?: boolean;
    package_name?: string;
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
  

export interface IAdmin {
  name: string;
  email: string;
  phone: string;
  password: string;
}  

export interface ICreateTenantBody {
  tenant: ITenant;
  admin: IAdmin;
}


export interface ITenantRenewalBody {
  tenant_id: string;
  license_start: string;
  license_expired: string;
  months: number;
  total_price: number;
  package_id: string;
}

export interface ITenantRequestParam {
  id: string;
}

export interface IUpdateTenantBody {
  emirate?: string;
  address?: string;
  license_start?: string;
  license_expired?: string;
  months?: number;
  status?: number;
  total_price?: number;
  company_id?: string;
  package_id?: string;
}

export interface ICreateManagerBody {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: number;
}
export interface IManagerRequestParam {
    id: string;
}
export interface IUpdateManagerBody {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: number;
}
  