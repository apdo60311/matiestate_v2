import { Type } from 'class-transformer';
import { 
    IsString, 
    IsNumber, 
    IsOptional, 
    IsUUID,
    ValidateNested,
    IsArray,
    ArrayMinSize,
    Min,
    IsDate,
    IsDefined,
    IsBoolean
} from 'class-validator';

export class VoucherMainDataDto {
    @IsOptional()
    @IsNumber()
    number?: number;

    @IsNumber()
    voucherType!: number;

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
    totalAmount?: number;

    @IsOptional()
    @IsNumber()
    currencyVal?: number;

    @IsOptional()
    @IsString()
    receiptNumber?: string;

    @IsOptional()
    @IsBoolean()
    feedback?: boolean;

    @IsOptional()
    @IsBoolean()
    genEntries?: boolean;

    @IsOptional()
    @IsUUID()
    costCenterId?: string;

    @IsOptional()
    @IsUUID()
    chequeId?: string;
}

export class VoucherGridDataDto {
    @IsUUID()
    accountId!: string;

    @IsOptional()
    @IsUUID()
    costCenterId?: string;

    @IsOptional()
    @IsUUID()
    tenantId?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    debit?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    credit?: number;

    @IsOptional()
    @IsUUID()
    currencyId?: string;

    @IsOptional()
    @IsNumber()
    currencyVal?: number;

    @IsOptional()
    @IsUUID()
    voucherMainDataId?: string;

    @IsOptional()
    @IsUUID()
    observeAccountId?: string;
}

export class VoucherPicturesDto {
    @IsString()
    picture!: string;

    @IsOptional()
    @IsUUID()
    tenantId?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsUUID()
    voucherMainDataId?: string;

    @IsOptional()
    @IsNumber()
    number?: number;
}

export class CreateVoucherRequestDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => VoucherMainDataDto)
    mainData!: VoucherMainDataDto;

    @IsDefined()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VoucherGridDataDto)
    @ArrayMinSize(1)
    gridData!: VoucherGridDataDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VoucherPicturesDto)
    pictures?: VoucherPicturesDto[];
}

export class UpdateVoucherRequestDto {
    @ValidateNested()
    @Type(() => VoucherMainDataDto)
    mainData!: VoucherMainDataDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VoucherGridDataDto)
    gridData!: VoucherGridDataDto[];
}