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

/**
 * @openapi
 * components:
 *   schemas:
 *     EntryMainDataDto:
 *       type: object
 *       required:
 *         - debit
 *         - credit
 *         - difference
 *       properties:
 *         currencyId:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         debit:
 *           type: number
 *         credit:
 *           type: number
 *         difference:
 *           type: number
 *         currencyVal:
 *           type: number
 *         createdFrom:
 *           type: number
 *         createdFromId:
 *           type: string
 *         tenantId:
 *           type: string
 *           format: uuid
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     EntryGridDataDto:
 *       type: object
 *       required:
 *         - accountId
 *       properties:
 *         accountId:
 *           type: string
 *           format: uuid
 *         debit:
 *           type: number
 *         credit:
 *           type: number
 *         currencyId:
 *           type: string
 *           format: uuid
 *         costCenterId:
 *           type: string
 *           format: uuid
 *         observeAccountId:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         tenantId:
 *           type: string
 *           format: uuid
 *         currencyVal:
 *           type: number
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEntryRequestDto:
 *       type: object
 *       required:
 *         - mainData
 *         - gridData
 *       properties:
 *         mainData:
 *           $ref: '#/components/schemas/EntryMainDataDto'
 *         gridData:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EntryGridDataDto'
 *           minItems: 1
 */
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

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateEntryRequestDto:
 *       type: object
 *       required:
 *         - mainData
 *         - gridData
 *       properties:
 *         mainData:
 *           $ref: '#/components/schemas/EntryMainDataDto'
 *         gridData:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EntryGridDataDto'
 */
export class UpdateEntryRequestDto {
    @ValidateNested()
    @Type(() => EntryMainDataDto)
    mainData!: EntryMainDataDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EntryGridDataDto)
    gridData!: EntryGridDataDto[];
}