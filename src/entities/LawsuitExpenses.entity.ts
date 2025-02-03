import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Account } from "./Account.entity";
import { CostCenter } from "./CostCenter.entity";
import { Currency } from "./Currency.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("lawsuit_expenses")
export class LawsuitExpenses {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "date" })
  registration_date!: Date;

  @Column({ type: "boolean", nullable: true })
  recovered_from_client?: boolean;

  @Column({ type: "bigint", nullable: true })
  receipt_number?: number;

  @Column({ type: "date", nullable: true })
  receipt_date?: Date;

  @Column({ type: "float" })
  receipt_value!: number;

  @Column({ type: "text", nullable: true })
  issuing_entity?: string;

  @Column({ type: "text", nullable: true })
  receipt_statement?: string;

  @Column({ type: "boolean", nullable: true })
  statement_unification?: boolean;

  @Column({ type: "uuid", nullable: true })
  currency_id?: string;

  @Column({ type: "float", nullable: true })
  currency_val?: number;

  @Column({ type: "uuid" })
  debit_account_id!: string;

  @Column({ type: "uuid" })
  credit_account_id!: string;

  @Column({ type: "uuid", nullable: true })
  debit_cost_center_id?: string;

  @Column({ type: "uuid", nullable: true })
  credit_cost_center_id?: string;

  @Column({ type: "text", nullable: true })
  debit_statement?: string;

  @Column({ type: "text", nullable: true })
  credit_statement?: string;

  @Column({ type: "boolean", nullable: true })
  gen_entries?: boolean;

  @Column({ type: "text", nullable: true })
  user?: string;

  @Column({ type: "boolean", nullable: true })
  refunded_from_customer?: boolean;

  @Column({ type: "text", nullable: true })
  statement?: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "debit_account_id" })
  debitAccount!: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "credit_account_id" })
  creditAccount!: Account;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "debit_cost_center_id" })
  debitCostCenter?: CostCenter;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "credit_cost_center_id" })
  creditCostCenter?: CostCenter;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
