import { Type } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsBoolean,
    IsOptional,
    IsUUID,
    IsDate,
    Min,
    ValidateNested
} from 'class-validator';

export class CreateContractDto {
    @IsNumber()
    contract_type!: number;

    @IsNumber()
    flat_type!: number;

    @IsOptional()
    @IsBoolean()
    is_archived?: boolean;

    @IsOptional()
    @IsBoolean()
    is_deleted?: boolean;

    @IsOptional()
    @IsNumber()
    status?: number;

    @IsNumber()
    code!: number;

    @IsOptional()
    @IsNumber()
    contracts_number_prev?: number;

    @IsOptional()
    @IsNumber()
    contracts_number_current?: number;

    @IsOptional()
    @IsBoolean()
    lawsuit?: boolean;

    @IsOptional()
    @IsBoolean()
    feedback?: boolean;

    @IsOptional()
    @IsUUID()
    building_id?: string;

    @IsOptional()
    @IsUUID()
    insurance_account_id?: string;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;

    @IsOptional()
    @IsNumber()
    gov_number?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    previous_securing?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    current_securing_percentage?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    current_securing_value?: number;

    @IsNumber()
    @Min(0)
    final_price!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    discount_rate?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    discount_value?: number;

    @IsUUID()
    revenue_account_id!: string;

    @IsOptional()
    @IsUUID()
    discount_account_id?: string;

    @IsUUID()
    client_id!: string;

    @IsNumber()
    paid_type!: number;

    @IsNumber()
    @Min(0)
    contract_value!: number;

    @IsOptional()
    @IsUUID()
    apartment_id?: string;

    @IsOptional()
    @IsUUID()
    land_id?: string;

    @IsOptional()
    @IsUUID()
    shop_id?: string;

    @IsOptional()
    @IsUUID()
    parking_id?: string;

    @IsOptional()
    @IsUUID()
    lessor_id?: string;

    @IsOptional()
    @Type(() => Date)
    start_duration_date?: Date;

    @IsOptional()
    @Type(() => Date)
    end_duration_date?: Date;

    @IsOptional()
    @IsString()
    contract_duration?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @Type(() => Date)
    issue_date?: Date;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @Type(() => Date)
    property_delivery_date?: Date;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    villa_id?: string;

    @IsUUID()
    contract_pattern_id!: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateContractTermsDto)
    terms?: CreateContractTermsDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateContractPicturesDto)
    pictures?: CreateContractPicturesDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateContractCommissionDto)
    commission?: CreateContractCommissionDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateContractCycleDto)
    cycle?: CreateContractCycleDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateContractFeeDto)
    fees?: CreateContractFeeDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateContractOtherFeesDto)
    other_fees?: CreateContractOtherFeesDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateContractTerminationDto)
    termination?: CreateContractTerminationDto;
}

export class CreateContractTermsDto {
    @IsString()
    contract_terms!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}

export class CreateContractPicturesDto {
    @IsString()
    picture!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}

export class CreateContractCommissionDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    commission_percentage?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    commission_value?: number;

    @IsOptional()
    @IsUUID()
    commission_account_id?: string;

    @IsOptional()
    @IsString()
    commission_note?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    commission_from_owner_percentage?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    commission_from_owner_value?: number;

    @IsOptional()
    @IsUUID()
    commission_from_owner_account_id?: string;

    @IsOptional()
    @IsString()
    commission_from_owner_note?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    commission_from_lessor_percentage?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    commission_from_lessor_value?: number;

    @IsOptional()
    @IsUUID()
    commission_from_lessor_account_id?: string;

    @IsOptional()
    @IsString()
    commission_from_lessor_note?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;
}

export class CreateContractCycleDto {
    @IsOptional()
    @IsBoolean()
    contract_documented?: boolean;

    @IsOptional()
    @IsBoolean()
    contract_certifying?: boolean;

    @IsOptional()
    @IsString()
    contract_certifying_body?: string;

    @IsOptional()
    @IsBoolean()
    contract_received?: boolean;

    @IsOptional()
    @IsBoolean()
    contract_delivered?: boolean;

    @IsOptional()
    @IsBoolean()
    contract_signed?: boolean;

    @IsOptional()
    @IsNumber()
    municipal_license_num?: number;

    @IsOptional()
    @Type(() => Date)
    municipal_license_from?: Date;

    @IsOptional()
    @Type(() => Date)
    municipal_license_to?: Date;

    @IsOptional()
    @IsNumber()
    license_num?: number;

    @IsOptional()
    @Type(() => Date)
    license_from?: Date;

    @IsOptional()
    @Type(() => Date)
    license_to?: Date;

    @IsOptional()
    @IsNumber()
    civil_license_num?: number;

    @IsOptional()
    @Type(() => Date)
    civil_license_from?: Date;

    @IsOptional()
    @Type(() => Date)
    civil_license_to?: Date;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}

export class CreateContractFeeDto {
    @IsOptional()
    @IsNumber()
    number?: number;

    @IsOptional()
    @IsNumber()
    entrynumber?: number;

    @IsOptional()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsUUID()
    account_id?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    value?: number;

    @IsOptional()
    @IsBoolean()
    create_entry?: boolean;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}

export class CreateContractOtherFeesDto {
    @IsOptional()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    fee_amount?: number;

    @IsOptional()
    @IsUUID()
    account_id?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsNumber()
    number?: number;
}

export class CreateContractTerminationDto {
    @IsOptional()
    @Type(() => Date)
    termination_date?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    owner_total_amount?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    owner_rest_amount?: number;

    @IsOptional()
    @IsNumber()
    round_to?: number;

    @IsOptional()
    @IsString()
    revenue_note?: string;

    @IsOptional()
    @IsString()
    fines?: string;

    @IsOptional()
    @IsUUID()
    fines_revenue_account_id?: string;

    @IsOptional()
    @IsString()
    fine_note?: string;

    @IsOptional()
    @IsBoolean()
    evacuation_request?: boolean;

    @IsOptional()
    @Type(() => Date)
    evacuation_date?: Date;

    @IsOptional()
    @IsBoolean()
    clearance_printed?: boolean;

    @IsOptional()
    @Type(() => Date)
    clearance_printed_date?: Date;

    @IsOptional()
    @IsBoolean()
    terminated?: boolean;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;

    @IsUUID()
    revenue_account_id!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}
