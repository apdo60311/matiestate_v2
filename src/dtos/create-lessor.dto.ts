import { IsString, IsNumber, IsOptional, IsUUID, IsEmail } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLessorDto:
 *       type: object
 *       required:
 *         - name
 *         - passport
 *       properties:
 *         name:
 *           type: string
 *         passport:
 *           type: number
 *         id_card:
 *           type: number
 *         lessor_card:
 *           type: number
 *         cell_phone:
 *           type: number
 *         passport_expiry_date:
 *           type: string
 *         address:
 *           type: string
 *         nationality:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         tenant_id:
 *           type: string
 *           format: uuid
 */
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