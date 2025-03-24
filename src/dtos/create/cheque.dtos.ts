import { Type } from 'class-transformer';
import { 
    IsString, 
    IsNumber, 
    IsOptional, 
    IsUUID,
    ValidateNested,
    Min,
    IsDate,
    IsDefined,
} from 'class-validator';


export class ChequeMainDataDto {
    @IsOptional()
    @IsNumber()
    number?: number;

    @IsNumber()
    type!: number;

    @IsOptional()
    @IsUUID()
    currencyId?: string;

    @IsOptional()
    @IsUUID()
    sellerId?: string;

    @IsOptional()
    @IsUUID()
    accountId?: string;

    @IsOptional()
    @IsUUID()
    patternId?: string;

    @IsOptional()
    @IsUUID()
    tenantId?: string;
    
    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsNumber()
    code?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    amount?: number;

    @IsOptional()
    @IsNumber()
    currencyVal?: number;

    @IsOptional()
    @IsString()
    beneficiaryName?: string;

    @IsOptional()
    @IsUUID()
    costCenterId?: string;

    @IsOptional()
    @IsUUID()
    bankId?: string;

    @IsOptional()
    @IsUUID()
    installmentId?: string;

    @IsOptional()
    @IsUUID()
    apartmentId?: string;

    @IsOptional()
    @IsUUID()
    shopId?: string;

    @IsOptional()
    @IsUUID()
    parkingId?: string;
}


export class CreateChequeRequestDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => ChequeMainDataDto)
    mainData!: ChequeMainDataDto;
}

export class UpdateChequeRequestDto {
    @ValidateNested()
    @Type(() => ChequeMainDataDto)
    mainData!: ChequeMainDataDto;
}