import { Type } from 'class-transformer';
import { 
    IsString, 
    IsNumber, 
    IsOptional, 
    IsUUID,
    ValidateNested,
    IsArray,
    ArrayMinSize,
    IsDefined
} from 'class-validator';

export class EntryMainDataDto {
    @IsOptional()
    @IsUUID()
    currencyId?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsNumber()
    debit!: number;

    @IsNumber()
    credit!: number;

    @IsNumber()
    difference!: number;

    @IsOptional()
    @IsNumber()
    currencyVal?: number;

    @IsOptional()
    @IsNumber()
    createdFrom?: number;

    @IsOptional()
    @IsString()
    createdFromId?: string;

    @IsOptional()
    @IsUUID()
    tenantId?: string;
}

export class EntryGridDataDto {
    @IsUUID()
    accountId!: string;

    @IsOptional()
    @IsNumber()
    debit?: number;

    @IsOptional() 
    @IsNumber()
    credit?: number;

    @IsOptional()
    @IsUUID()
    currencyId?: string;

    @IsOptional()
    @IsUUID()
    costCenterId?: string;

    @IsOptional()
    @IsUUID()
    observeAccountId?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    tenantId?: string;

    @IsOptional()
    @IsNumber()
    currencyVal?: number;
}

export class CreateEntryRequestDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => EntryMainDataDto)
    mainData!: EntryMainDataDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EntryGridDataDto)
    @ArrayMinSize(1)
    gridData!: EntryGridDataDto[];
}

export class UpdateEntryRequestDto {
    @ValidateNested()
    @Type(() => EntryMainDataDto)
    mainData!: EntryMainDataDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EntryGridDataDto)
    gridData!: EntryGridDataDto[];
}