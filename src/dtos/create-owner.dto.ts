import { 
    IsString, 
    IsNumber, 
    IsOptional, 
    IsUUID,
    IsEmail,
    Length,
    IsDate,
    IsArray,
    ValidateNested,
    ArrayMinSize,
    Matches
} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateOwnerDto {
    @IsString({ message: "Name must be a string" })
    @Length(1, 255, { message: "Name must be between 1 and 255 characters" })
    name!: string;

    @IsOptional()
    @IsString({ message: "ID card must be a string" })
    id_card?: string;

    @IsOptional()
    @IsString({ message: "Phone must be a string" })
    @Matches(/^[0-9+\-\s()]*$/, { message: "Invalid phone number format" })
    phone?: string;

    @IsOptional()
    @IsString({ message: "Cell phone must be a string" })
    @Matches(/^[0-9+\-\s()]*$/, { message: "Invalid cell phone number format" })
    cell_phone?: string;

    @IsOptional()
    @IsString({ message: "Fax must be a string" })
    @Matches(/^[0-9+\-\s()]*$/, { message: "Invalid fax number format" })
    fax?: string;

    @IsOptional()
    @IsString({ message: "Mailbox must be a string" })
    mailbox?: string;

    @IsOptional()
    @IsEmail({}, { message: "Invalid email format" })
    email?: string;

    @IsOptional()
    @IsString({ message: "Address must be a string" })
    @Length(0, 1000, { message: "Address must not exceed 1000 characters" })
    address?: string;

    @IsOptional()
    @IsString({ message: "Nationality must be a string" })
    nationality?: string;

    @IsOptional()
    @IsNumber({}, { message: "Number must be a number" })
    number?: number;

    @IsOptional()
    @IsUUID(undefined, { message: "Account ID must be a valid UUID" })
    account_id?: string;

    @IsOptional()
    @IsUUID(undefined, { message: "Tenant ID must be a valid UUID" })
    tenant_id?: string;

    @IsOptional()
    @IsString({ message: "Ltnname must be a string" })
    ltnname?: string;
}


export class CreateOwnerExpenseDetailDto {
    @IsNumber({}, { message: "Amount must be a number" })
    amount!: number;

    @IsOptional()
    @IsString({ message: "Description must be a string" })
    description?: string;

    @IsOptional()
    @IsUUID(undefined, { message: "Tenant ID must be a valid UUID" })
    tenant_id?: string;

    @IsOptional()
    @IsString({ message: "Note must be a string" })
    note?: string;

    @IsOptional()
    @IsNumber({}, { message: "Number must be a number" })
    number?: number;
}

export class CreateOwnerExpenseDto {
    @IsUUID('4', { message: "Owner ID must be a valid UUID" })
    owner_id!: string;

    @IsNumber({}, { message: "Amount must be a number" })
    amount!: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: "Date must be a valid date" })
    date?: Date;

    @IsOptional()
    @IsString({ message: "Description must be a string" })
    description?: string;

    @IsUUID(undefined, { message: "Type ID must be a valid UUID" })
    type_id!: string;

    @IsOptional()
    @IsUUID(undefined, { message: "Tenant ID must be a valid UUID" })
    tenant_id?: string;

    @IsOptional()
    @IsString({ message: "Note must be a string" })
    note?: string;

    @IsOptional()
    @IsNumber({}, { message: "Number must be a number" })
    number?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOwnerExpenseDetailDto)
    @ArrayMinSize(1, { message: "At least one expense detail is required" })
    details?: CreateOwnerExpenseDetailDto[];
}