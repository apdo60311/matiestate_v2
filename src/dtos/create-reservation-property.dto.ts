// src/dtos/create-reservation-property.dto.ts
import { IsString, IsNumber, IsDate, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationPropertyDto {
    @IsNumber()
    property_type!: number;

    @IsUUID()
    property_id!: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    book_date?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    end_book_date?: Date;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsBoolean()
    has_payment?: boolean;

    @IsOptional()
    @IsBoolean()
    reservation_expired?: boolean;

    @IsOptional()
    @IsNumber()
    payment_amount?: number;

    @IsOptional()
    @IsNumber()
    currency_val?: number;

    @IsOptional()
    @IsNumber()
    payment_method?: number;

    @IsUUID()
    account_id!: string;

    @IsUUID()
    building_id!: string;

    @IsOptional()
    @IsUUID()
    currency_id?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;

    @IsOptional()
    @IsUUID()
    credit_account_id?: string;

    @IsOptional()
    @IsUUID()
    debit_account_id?: string;

    @IsOptional()
    @IsUUID()
    credit_cost_center_id?: string;

    @IsOptional()
    @IsUUID()
    debit_cost_center_id?: string;
}