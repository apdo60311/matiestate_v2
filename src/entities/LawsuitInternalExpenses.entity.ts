import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  Unique,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tenant } from "./Tenant.entity";
import { Contract } from "./Contract.entity";
import { Building } from "./Building.entity";
import { Account } from "./Account.entity";
import { Lawsuit } from "./Lawsuit.entity";
import { Currency } from "./Currency.entity";

@Entity("lawsuit_internal_expenses")
export class LawsuitInternalExpenses {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @ManyToOne(() => Lawsuit, { nullable: true })
  @JoinColumn({ name: "lawsuit_id" })
  lawsuit?: Lawsuit;

  @ManyToOne(() => Currency, { nullable: true })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @Column("real", { nullable: true })
  currency_val?: number;

  @Column("boolean", { nullable: true })
  lawyer_gen_entries?: boolean;

  @Column("real", { nullable: true })
  lawyer_amount?: number;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "lawyer_debit_account_id" })
  lawyer_debit_account?: Account;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "lawyer_credit_account_id" })
  lawyer_credit_account?: Account;

  @Column("text", { nullable: true })
  lawyer_statement?: string;

  @Column("boolean", { nullable: true })
  maintenance_gen_entries?: boolean;

  @Column("real", { nullable: true })
  maintenance_amount?: number;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "maintenance_debit_account_id" })
  maintenance_debit_account?: Account;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "maintenance_credit_account_id" })
  maintenance_credit_account?: Account;

  @Column("text", { nullable: true })
  maintenance_statement?: string;

  @Column("boolean", { nullable: true })
  furniture_gen_entries?: boolean;

  @Column("real", { nullable: true })
  furniture_amount?: number;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "furniture_debit_account_id" })
  furniture_debit_account?: Account;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "furniture_credit_account_id" })
  furniture_credit_account?: Account;

  @Column("text", { nullable: true })
  furniture_statement?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
