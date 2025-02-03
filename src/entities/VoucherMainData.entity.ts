import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Currency } from "./Currency.entity";
import { Account } from "./Account.entity";
import { Tenant } from "./Tenant.entity";
import { VoucherPattern } from "./VoucherPattern.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("voucher_main_data")
export class VoucherMainData {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "boolean", default: false })
  feedback: boolean = false;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seller_id" })
  seller?: Account;

  @Column({ type: "int", nullable: true })
  connect_with?: number;

  @Column({ type: "float", default: 0 })
  debit_amount: number = 0;

  @Column({ type: "double precision", default: 0 })
  debit_total: number = 0;

  @Column({ type: "double precision", default: 0 })
  credit_total: number = 0;

  @Column({ type: "double precision", default: 0 })
  credit_amount: number = 0;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @Column({ type: "uuid", nullable: true })
  connect_with_id?: string;

  @Column({ type: "float", nullable: true })
  currency_val?: number;

  @Column({ type: "bigint", generated: "identity", unique: true })
  number!: number;

  @Column({ type: "int" })
  voucher_type!: number;

  @Column({ type: "boolean", default: false })
  gen_entires: boolean = false;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean = false;

  @Column({ type: "boolean", nullable: true })
  is_first_batch?: boolean;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @ManyToOne(() => VoucherPattern, { onDelete: "CASCADE" })
  @JoinColumn({ name: "voucher_pattern_id" })
  voucherPattern?: VoucherPattern;
}
