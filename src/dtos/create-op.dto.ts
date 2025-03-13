import { IsNumber, IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateOpCollectionDto {
    @IsNumber()
    amount!: number;

    @IsUUID()
    currency_id!: string;

    @IsUUID()
    debit_account_id!: string;

    @IsUUID()
    credit_account_id!: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    commission_value?: number;

    @IsOptional()
    @IsNumber()
    commission_percentage?: number;

    @IsOptional()
    @IsUUID()
    commission_debit_id?: string;

    @IsOptional()
    @IsUUID()
    commission_credit_id?: string;

    @IsOptional()
    @IsUUID()
    commission_cost_center_id?: string;

    @IsOptional()
    @IsString()
    commission_note?: string;

    @IsOptional()
    @IsUUID()
    accounting_voucher_main_data_id?: string;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;

    @IsOptional()
    @IsNumber()
    currency_val?: number;
}

export class UpdateOpCollectionDto {
    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsUUID()
    debit_account_id?: string;

    @IsOptional()
    @IsUUID()
    credit_account_id?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    commission_value?: number;

    @IsOptional()
    @IsNumber()
    commission_percentage?: number;

    @IsOptional()
    @IsUUID()
    commission_debit_id?: string;

    @IsOptional()
    @IsUUID()
    commission_credit_id?: string;

    @IsOptional()
    @IsUUID()
    commission_cost_center_id?: string;

    @IsOptional()
    @IsString()
    commission_note?: string;

    @IsOptional()
    @IsUUID()
    accounting_voucher_main_data_id?: string;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;

    @IsOptional()
    @IsNumber()
    currency_val?: number;
}

export class CreateOpDeportationDto {
    @IsNumber()
    amount!: number;

    @IsUUID()
    currency_id!: string;

    @IsUUID()
    debit_account_id!: string;

    @IsUUID()
    credit_account_id!: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    accounting_voucher_main_data_id?: string;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;

    @IsUUID()
    cheque_id!: string;

    @IsOptional()
    @IsNumber()
    currency_val?: number;
}

export class UpdateOpDeportationDto {
    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsUUID()
    debit_account_id?: string;

    @IsOptional()
    @IsUUID()
    credit_account_id?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    accounting_voucher_main_data_id?: string;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;

    @IsOptional()
    @IsUUID()
    cheque_id?: string;

    @IsOptional()
    @IsNumber()
    currency_val?: number;
}

export class CreateOpPartialCollectionDto {
    @IsNumber()
    amount!: number;

    @IsUUID()
    currency_id!: string;

    @IsUUID()
    debit_account_id!: string;

    @IsUUID()
    credit_account_id!: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    commission_value?: number;

    @IsOptional()
    @IsNumber()
    commission_percentage?: number;

    @IsOptional()
    @IsUUID()
    commission_debit_id?: string;

    @IsOptional()
    @IsUUID()
    commission_credit_id?: string;

    @IsOptional()
    @IsUUID()
    commission_cost_center_id?: string;

    @IsOptional()
    @IsString()
    commission_note?: string;

    @IsOptional()
    @IsUUID()
    accounting_voucher_main_data_id?: string;

    @IsOptional()
    @IsNumber()
    total_value?: number;

    @IsOptional()
    @IsNumber()
    total_sum?: number;

    @IsOptional()
    @IsNumber()
    rest?: number;

    @IsOptional()
    @IsNumber()
    total_sum_prev?: number;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;

    @IsUUID()
    cheque_id!: string;

    @IsOptional()
    @IsNumber()
    currency_val?: number;

    @IsNumber()
    number!: number;
}

export class UpdateOpPartialCollectionDto {
    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsUUID()
    debit_account_id?: string;

    @IsOptional()
    @IsUUID()
    credit_account_id?: string;

    @IsOptional()
    @IsUUID()
    cost_center_id?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    commission_value?: number;

    @IsOptional()
    @IsNumber()
    commission_percentage?: number;

    @IsOptional()
    @IsUUID()
    commission_debit_id?: string;

    @IsOptional()
    @IsUUID()
    commission_credit_id?: string;

    @IsOptional()
    @IsUUID()
    commission_cost_center_id?: string;

    @IsOptional()
    @IsString()
    commission_note?: string;

    @IsOptional()
    @IsUUID()
    accounting_voucher_main_data_id?: string;

    @IsOptional()
    @IsNumber()
    total_value?: number;

    @IsOptional()
    @IsNumber()
    total_sum?: number;

    @IsOptional()
    @IsNumber()
    rest?: number;

    @IsOptional()
    @IsNumber()
    total_sum_prev?: number;

    @IsOptional()
    @IsBoolean()
    gen_entries?: boolean;

    @IsOptional()
    @IsUUID()
    cheque_id?: string;

    @IsOptional()
    @IsNumber()
    currency_val?: number;

    @IsOptional()
    @IsNumber()
    number?: number;
}

export class CreateOpReturnDto {
    @IsUUID()
    cheque_id!: string;

    @IsNumber()
    amount!: number;
}

export class UpdateOpReturnDto {
    @IsOptional()
    @IsUUID()
    cheque_id?: string;

    @IsOptional()
    @IsNumber()
    amount?: number;
}
