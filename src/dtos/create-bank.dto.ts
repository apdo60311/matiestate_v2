import { IsString, IsOptional, IsUUID, Length } from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBankDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         code:
 *           type: number
 *       required:
 *         - name
 */
export class CreateBankDto {
    @IsString({ message: "Name must be a string" })
    @Length(1, 255, { message: "Name must be between 1 and 255 characters" })
    name!: string;

    @IsOptional()
    @IsString({ message: "Address must be a string" })
    address?: string;

    @IsOptional()
    @IsUUID(undefined, { message: "Tenant ID must be a valid UUID" })
    tenant_id?: string;

    @IsOptional()
    @IsString({ message: "Ltnname must be a string" })
    ltnname?: string;
}
