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


/**
 * @openapi
 * components:
 *   schemas:
 *     ChequeMainDataDto:
 *       type: object
 *       required:
 *         - type
 *       properties:
 *         number:
 *           type: number
 *         type:
 *           type: number
 *         currencyId:
 *           type: string
 *           format: uuid
 *         sellerId:
 *           type: string
 *           format: uuid
 *         accountId:
 *           type: string
 *           format: uuid
 *         patternId:
 *           type: string
 *           format: uuid
 *         tenantId:
 *           type: string
 *           format: uuid
 *         note:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         code:
 *           type: number
 *         amount:
 *           type: number
 *           minimum: 0
 *         currencyVal:
 *           type: number
 *         beneficiaryName:
 *           type: string
 *         costCenterId:
 *           type: string
 *           format: uuid
 *         bankId:
 *           type: string
 *           format: uuid
 *         installmentId:
 *           type: string
 *           format: uuid
 *         apartmentId:
 *           type: string
 *           format: uuid
 *         shopId:
 *           type: string
 *           format: uuid
 *         parkingId:
 *           type: string
 *           format: uuid
 **/
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


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateChequeRequestDto:
 *       type: object
 *       required:
 *         - mainData
 *       properties:
 *         mainData:
 *           $ref: '#/components/schemas/ChequeMainDataDto'
*/
export class CreateChequeRequestDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => ChequeMainDataDto)
    mainData!: ChequeMainDataDto;
}

/** 
 * @openapi
 * components:
 *  schemas:
 *    UpdateChequeRequestDto:
 *      type: object
 *      required:
 *      - mainData
 *      properties:
 *        mainData:
 *          ref: '#/components/schemas/ChequeMainDataDto'
*/
export class UpdateChequeRequestDto {
    @ValidateNested()
    @Type(() => ChequeMainDataDto)
    mainData!: ChequeMainDataDto;
}