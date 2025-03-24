import { Type } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsOptional,
    IsUUID,
    IsDate
} from 'class-validator';

export class CreateInstallmentDto {
    @IsUUID()
    contract_id!: string;

    @IsNumber()
    total_amount!: number;

    @IsOptional()
    @IsNumber()
    gen_entries_type?: number = 1;

    @IsNumber()
    first_batch!: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    payment_date?: Date;

    @IsUUID()
    currency_id!: string;

    @IsOptional()
    @IsNumber()
    currency_val?: number;

    @IsNumber()
    rest_amount!: number;

    @IsOptional()
    @IsUUID()
    bank_id?: string;

    @IsNumber()
    installments_numbers!: number;

    @IsNumber()
    each_number!: number;

    @IsNumber()
    each_duration!: number;

    @Type(() => Date)
    @IsDate()
    first_installment_date!: Date;

    @IsOptional()
    @IsNumber()
    begin_number?: number;

    @IsOptional()
    @IsString()
    beneficiary_name?: string;

    @IsOptional()
    @IsString()
    contract_unique?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}
