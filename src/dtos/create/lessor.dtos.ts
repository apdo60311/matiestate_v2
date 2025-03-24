import { IsString, IsNumber, IsOptional, IsUUID, IsEmail } from 'class-validator';

export class CreateLessorDto {
    @IsString()
    name!: string;

    @IsNumber()
    passport!: number;

    @IsOptional()
    @IsNumber()
    id_card?: number;

    @IsOptional()
    @IsNumber()
    lessor_card?: number;

    @IsOptional()
    @IsNumber()
    cell_phone?: number;

    @IsOptional()
    @IsString()
    passport_expiry_date?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    nationality?: string;

    @IsOptional()
    @IsString()
    fax?: string;

    @IsOptional()
    @IsString()
    mailbox?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    mobile?: number;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    ltnname?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}