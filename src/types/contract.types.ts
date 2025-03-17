import { ContractCommission } from "../entities/ContractComission.entity";
import { ContractCycle } from "../entities/ContractCycle.entity";
import { ContractFee } from "../entities/ContractFee.entity";
import { ContractOtherFees } from "../entities/ContractOtherFees.entity";
import { ContractPictures } from "../entities/ContractPictures.entity";
import { ContractTermination } from "../entities/ContractTermination.entity";
import { ContractTerms } from "../entities/ContractTerms.entity";

export interface IContractTerms {
    contract_terms: string;
    tenant_id?: string;
}

export interface IContractPictures {
    picture?: string;
    tenant_id?: string;
}

export interface IContractCommission {
    contract_id: string;
    commission_percentage?: number;
    commission_value?: number;
    commission_account_id?: string;
    commission_note?: string;
    commission_from_owner_percentage?: number;
    commission_from_owner_value?: number;
    commission_from_owner_account_id?: string;
    commission_from_owner_note?: string;
    commission_from_lessor_percentage?: number;
    commission_from_lessor_value?: number;
    commission_from_lessor_account_id?: string;
    commission_from_lessor_note?: string;
    tenant_id?: string;
    gen_entries?: boolean;
}

export interface IContractCycle {
    contract_id: string;
    contract_documented?: boolean;
    contract_certifying?: boolean;
    contract_certifying_body?: string;
    contract_received?: boolean;
    contract_delivered?: boolean;
    contract_signed?: boolean;
    municipal_license_num?: number;
    municipal_license_from?: Date;
    municipal_license_to?: Date;
    license_num?: number;
    license_from?: Date;
    license_to?: Date;
    civil_license_num?: number;
    civil_license_from?: Date;
    civil_license_to?: Date;
    tenant_id?: string;
}

export interface IContractFee {
    number?: number;
    entrynumber?: number;
    date?: Date;
    account_id?: string;
    value?: number;
    create_entry?: boolean;
    note?: string;
    tenant_id?: string;
}

export interface IContractOtherFees {
    date?: Date;
    fee_amount?: number;
    account_id?: string;
    notes?: string;
    tenant_id?: string;
    number?: number;
}

export interface IContractTermination {
    contract_id: string;
    termination_date?: Date;
    owner_total_amount?: number;
    owner_rest_amount?: number;
    round_to?: number;
    revenue_note?: string;
    fines?: string;
    fines_revenue_account_id?: string;
    fine_note?: string;
    evacuation_request?: boolean;
    evacuation_date?: Date;
    clearance_printed?: boolean;
    clearance_printed_date?: Date;
    terminated?: boolean;
    gen_entries?: boolean;
    revenue_account_id: string;
    tenant_id?: string;
}

export interface IContractBody {
    id?: string;
    contract_type: number;
    flat_type: number;
    is_archived?: boolean;
    is_deleted?: boolean;
    status?: number;
    code: number;
    number?: number;
    contracts_number_prev?: number;
    contracts_number_current?: number;
    lawsuit?: boolean;
    feedback?: boolean;
    building_id?: string;
    insurance_account_id?: string;
    gen_entries?: boolean;
    gov_number?: number;
    previous_securing?: number;
    current_securing_percentage?: number;
    current_securing_value?: number;
    final_price: number;
    discount_rate?: number;
    discount_value?: number;
    revenue_account_id: string;
    discount_account_id?: string;
    client_id: string;
    paid_type: number;
    contract_value: number;
    apartment_id?: string;
    land_id?: string;
    shop_id?: string;
    parking_id?: string;
    lessor_id?: string;
    start_duration_date?: Date;
    end_duration_date?: Date;
    contract_duration?: string;
    cost_center_id?: string;
    description?: string;
    issue_date?: Date;
    note?: string;
    property_delivery_date?: Date;
    tenant_id?: string;
    villa_id?: string;
    contract_pattern_id: string;
    vat_value?: number;
	vat_account_id?: string;
	price_before_vat?: number;
    terms?: IContractTerms[];
    pictures?: IContractPictures[];
    commission?: IContractCommission;
    cycle?: IContractCycle;
    fees?: IContractFee[];
    other_fees?: IContractOtherFees[];
    termination?: IContractTermination;
}

export interface IInstallmentBody {
    contract_id: string;
    total_amount: number;
    gen_entries_type?: number;
    first_batch: number;
    payment_date?: Date;
    currency_id: string;
    currency_val?: number;
    rest_amount: number;
    bank_id?: string;
    installments_numbers: number;
    each_number: number;
    each_duration: number;
    first_installment_date: Date;
    begin_number?: number;
    beneficiary_name?: string;
    tenant_id?: string;
}


export enum ContractStatus {
    Valid = 1,
    TerminateAndEvacuated = 2,
    ExpiredAndNotRenewed = 3,
    ExpiredAndRenewed = 4,
}