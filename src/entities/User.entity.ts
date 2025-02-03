import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Bank } from "./Bank.entity";
import { Category } from "./Category.entity";
import { Member } from "./Member.entity";
import { v4 as uuidv4 } from "uuid";
import { Account } from "./Account.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "int", default: 1 })
  card_type!: number;

  @Column({ type: "date", nullable: true })
  date_of_birth?: Date;

  @Column({ type: "text", nullable: true })
  passport_number?: string;

  @Column({ type: "date", nullable: true })
  passport_expiry?: Date;

  @Column({ type: "text", nullable: true })
  national_id?: string;

  @Column({ type: "date", nullable: true })
  national_id_expiry?: Date;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ type: "int", nullable: true })
  user_type?: number;

  @Column({ type: "text", nullable: true })
  commercial_register?: string;

  @Column({ type: "numeric", nullable: true })
  barcode?: number;

  @Column({ type: "numeric", nullable: true })
  profession?: number;

  @Column({ type: "varchar", nullable: true })
  work_phone?: string;

  @Column({ type: "varchar" })
  phone!: string;

  @Column({ type: "text", nullable: true })
  fax?: string;

  @Column({ type: "text", nullable: true })
  mailbox?: string;

  @Column({ type: "text", nullable: true })
  email?: string;

  @Column({ type: "int", nullable: true })
  sponsor?: number;

  @Column({ type: "text", nullable: true })
  sponsor_data?: string;

  @Column({ type: "text", nullable: true })
  statement?: string;

  @Column({ type: "uuid", nullable: true })
  account_id?: string;

  @Column({ type: "uuid", nullable: true })
  insurance_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  bank_id?: string;

  @Column({ type: "text", nullable: true })
  bank_account?: string;

  @Column({ type: "json", nullable: true })
  files?: any;

  @Column({ type: "text", nullable: true })
  nationality?: string;

  @Column({ type: "text", unique: true })
  name!: string;

  @Column({ type: "int", nullable: true })
  trn_number?: number;

  @Column({ type: "text", nullable: true })
  password?: string;

  @Column({ type: "text", nullable: true })
  avatar?: string;

  @Column({ type: "text", nullable: true })
  token?: string;

  @Column({ type: "text", nullable: true })
  fcm_token?: string;

  @Column({ type: "boolean", nullable: true })
  is_verified?: boolean;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @Column({ type: "uuid", nullable: true })
  category_id?: string;

  @Column({ type: "varchar", default: "+971" })
  phone_code!: string;

  @Column({ type: "text", nullable: true })
  ltnName?: string;

  @Column({ type: "uuid" })
  member_id!: string;

  // Relationships
  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account?: Account;

  @ManyToOne(() => Account, { onDelete: "SET NULL" })
  @JoinColumn({ name: "insurance_account_id" })
  insuranceAccount?: Account;

  @ManyToOne(() => Bank)
  @JoinColumn({ name: "bank_id" })
  bank?: Bank;

  @ManyToOne(() => Category, { onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
