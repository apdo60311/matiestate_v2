import { IsString, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateCurrencyDto {
    @IsString({ message: "Name must be a string" })
    name!: string;

    @IsString({ message: "Code must be a string" })
    code!: string;

    @IsNumber({}, { message: "Rate must be a number" })
    rate!: number;

    @IsOptional()
    @IsUUID(undefined, { message: "Tenant ID must be a valid UUID" })
    tenant_id?: string;

    @IsOptional()
    @IsString({ message: "Ltnname must be a string" })
    ltnname?: string;
}

