import { Type } from 'class-transformer';
import { IsBoolean, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateChequePatternDto {
    @IsString()
    name!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    default_account_id?: string;

    @IsOptional()
    @IsUUID()
    deportable_debit_account_id?: string;

    @IsOptional()
    @IsUUID()
    deportable_credit_account_id?: string;

    @IsOptional()
    @IsBoolean()
    move_cost_center_with_deposits?: boolean;
}

export class CostCenterMoveConfig {
    @IsBoolean()
    debit!: boolean;

    @IsBoolean() 
    credit!: boolean;
}

export class CreateContractPatternDto {
    @IsString()
    name!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    default_revenue_account_id?: string;

    @IsOptional()
    @IsUUID()
    default_commission_from_client_account_id?: string;

    @IsOptional()
    @IsUUID()
    default_commission_from_owner_account_id?: string;

    @IsOptional()
    @IsObject()
    @Type(() => CostCenterMoveConfig)
    moveCostCenterWithOtherFee?: CostCenterMoveConfig;

    @IsOptional()
    @IsObject()
    @Type(() => CostCenterMoveConfig)
    moveCostCenterWithCommissionClient?: CostCenterMoveConfig;

    @IsOptional()
    @IsObject()
    @Type(() => CostCenterMoveConfig)
    moveCostCenterWithCommissionOwner?: CostCenterMoveConfig;

    @IsOptional()
    @IsObject()
    @Type(() => CostCenterMoveConfig)
    moveCostCenterWithContractFines?: CostCenterMoveConfig;
}

export class CreateBillPatternDto {
    @IsString()
    name!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    default_store_id?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsUUID()
    material_account_id?: string;

    @IsOptional()
    @IsUUID()
    currency_id?: string;
}
export class CreateVoucherPatternDto {
    @IsString()
    name!: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    default_account_id?: string;
}

export class CreateAccountingVoucherPatternDto {
    @IsString()
    name!: string;
    
    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    default_account_id?: string;
}