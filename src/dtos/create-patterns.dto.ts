import { Type } from 'class-transformer';
import { IsBoolean, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateChequePatternDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_account_id:
 *           type: string
 *           format: uuid
 *         deportable_debit_account_id:
 *           type: string
 *           format: uuid
 *         deportable_credit_account_id:
 *           type: string
 *           format: uuid
 *         move_cost_center_with_deposits:
 *           type: boolean
 */
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


/**
 * @openapi
 * components:
 *   schemas:
 *     CostCenterMoveConfig:
 *       type: object
 *       required:
 *         - debit
 *         - credit
 *       properties:
 *         debit:
 *           type: boolean
 *         credit:
 *           type: boolean
 */
export class CostCenterMoveConfig {
    @IsBoolean()
    debit!: boolean;

    @IsBoolean() 
    credit!: boolean;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateContractPatternDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_revenue_account_id:
 *           type: string
 *           format: uuid
 *         default_commission_from_client_account_id:
 *           type: string
 *           format: uuid
 *         default_commission_from_owner_account_id:
 *           type: string
 *           format: uuid
 *         moveCostCenterWithOtherFee:
 *           $ref: '#/components/schemas/CostCenterMoveConfig'
 *         moveCostCenterWithCommissionClient:
 *           $ref: '#/components/schemas/CostCenterMoveConfig'
 *         moveCostCenterWithCommissionOwner:
 *           $ref: '#/components/schemas/CostCenterMoveConfig'
 *         moveCostCenterWithContractFines:
 *           $ref: '#/components/schemas/CostCenterMoveConfig'
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBillPatternDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_store_id:
 *           type: string
 *           format: uuid
 *         cost_center_id:
 *           type: string
 *           format: uuid
 *         material_account_id:
 *           type: string
 *           format: uuid
 *         currency_id:
 *           type: string
 *           format: uuid
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateVoucherPatternDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_account_id:
 *           type: string
 *           format: uuid
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAccountingVoucherPatternDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         tenant_id:
 *           type: string
 *           format: uuid
 *         default_account_id:
 *           type: string
 *           format: uuid
 */
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