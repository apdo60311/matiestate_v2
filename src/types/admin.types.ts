interface ICreateCompanyBody {
    id: string;
    customer_phone: string;
    customer_name: string;
    company_name: string;
    company_email: string;
    company_phone: string;
    status?: number;
  }

  interface ICompanyRequestParam {
    id: string;
  }  

  interface IUpdateCompanyBody {
    customer_phone?: string;
    customer_name?: string;
    company_name?: string;
    company_email?: string;
    company_phone?: string;
    status?: number;
  }

  interface ICreatePackageBody {
    id: string;
    total_units_count: number;
    unit_price: number;
    package: number;
    available: boolean;
    package_name: string;
  }

  interface IPackageRequestParam {
    id: string;
  }

  interface IUpdatePackageBody {
    total_units_count?: number;
    unit_price?: number;
    package?: number;
    available?: boolean;
    package_name?: string;
  }

  
  interface ITenant {
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
  

interface IAdmin {
  name: string;
  email: string;
  phone: string;
  password: string;
}  

interface ICreateTenantBody {
  tenant: ITenant;
  admin: IAdmin;
}


interface ITenantRenewalBody {
  tenant_id: string;
  license_start: string;
  license_expired: string;
  months: number;
  total_price: number;
  package_id: string;
}

interface ITenantRequestParam {
  id: string;
}

interface IUpdateTenantBody {
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

interface ICreateManagerBody {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: number;
}
interface IManagerRequestParam {
    id: string;
}
interface IUpdateManagerBody {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: number;
}
  