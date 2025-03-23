import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAccountDto {
    @IsNumber()
    code?: number;

    @IsString()
    name?: string;

    @IsNumber()
    type?: number;

    @IsString()
    @IsOptional()
    @IsUUID()
    parent_id?: string;

    @IsNumber()
    @IsOptional()
    balance?: number;

    @IsString()
    @IsOptional()
    @IsUUID()
    tenantId?: string;

    @IsOptional()
    isActive?: boolean;
}

export class CreateAccountAssemblyDto {
    @IsString()
    @IsUUID()
    accountId?: string;

    @IsNumber()
    @IsOptional()
    code?: number;

    @IsNumber()
    @IsOptional()
    percentage?: number;

    @IsString()
    @IsOptional()
    note?: string;

    @IsString()
    @IsOptional()
    @IsUUID()
    tenantId?: string;
}

export class CreateAccountDistributiveDto {
    @IsString()
    @IsUUID()
    accountId?: string;

    @IsNumber()
    @IsOptional()
    code?: number;

    @IsNumber()
    @IsOptional()
    percentage?: number;

    @IsString()
    @IsOptional()
    note?: string;

    @IsString()
    @IsOptional()
    @IsUUID()
    tenantId?: string;
}