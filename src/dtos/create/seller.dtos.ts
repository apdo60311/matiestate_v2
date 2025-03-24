import { IsString, IsNumber, IsOptional, IsEmail, IsUUID } from 'class-validator';

export class CreateSellerDto {
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    nationality?: string;

    @IsOptional()
    @IsNumber()
    id_card?: number;

    @IsOptional()
    @IsNumber()
    passport?: number;

    @IsOptional()
    @IsNumber()
    work_card_number?: number;

    @IsOptional()
    @IsString()
    mobile?: string;

    @IsOptional()
    @IsString()
    cellPhone?: string;

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
    address?: string;

    @IsOptional()
    @IsUUID()
    tenant_id?: string;
}