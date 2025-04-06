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
import { Contract } from "./Contract.entity";

@Entity("voucher_main_data")
export class VoucherMainData {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

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

  @Column({ name: "connect_with", type: "int", nullable: true })
  connectWith?: number;

  @Column({ name: "debit_amount", type: "float", default: 0 })
  debitAmount: number = 0;

  @Column({ name: "debit_total", type: "double precision", default: 0 })
  debitTotal: number = 0;

  @Column({ name: "credit_total", type: "double precision", default: 0 })
  creditTotal: number = 0;

  @Column({ name: "credit_amount", type: "double precision", default: 0 })
  creditAmount: number = 0;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @Column({ type: 'uuid', name: 'account_id', nullable: true })
  accountId!: string;

  @Column({ type: "uuid", name: 'connect_with_id', nullable: true })
  connectWithId?: string;

  @Column({ type: "float", name: 'currency_val', nullable: true })
  currencyVal?: number;

  @Column({ type: "bigint", generated: "identity", unique: true })
  number!: number;

  @Column({ type: "int", name: 'voucher_type' })
  voucherType!: number;

  @Column({ name: "gen_entires", type: "boolean", default: false })
  genEntires: boolean = false;

  @Column({ name: "is_deleted", type: "boolean", default: false })
  isDeleted: boolean = false;

  @Column({ name: "is_first_batch", type: "boolean", nullable: true })
  isFirstBatch?: boolean;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @Column({ type: "uuid", name: 'tenant_id', nullable: true })
  tenantId?: string;

  @ManyToOne(() => VoucherPattern, { onDelete: "CASCADE" })
  @JoinColumn({ name: "voucher_pattern_id" })
  voucherPattern?: VoucherPattern;

  @Column({ type: "uuid", name: 'voucher_pattern_id', nullable: true })
  voucherPatternId?: string;

  @Column({ type: "uuid", name: 'contract_id', nullable: true })
  contract_id?: string;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'contract_id' })
  contract?: Contract;
}
