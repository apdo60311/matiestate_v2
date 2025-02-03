import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Account } from "./Account.entity";
import { Currency } from "./Currency.entity";
import { Seller } from "./Seller.entity";
import { AccountingVoucherPattern } from "./AccountVoucherPattern.entity";
import { AccountingVoucherPicture } from "./AccountingVoucherPicture.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("accounting_voucher_main_data")
export class AccountingVoucherMainData {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "uuid" })
  currency_id!: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "float", default: 0 })
  debit: number = 0;

  @Column({ type: "float", default: 0 })
  credit: number = 0;

  @Column({ type: "boolean" })
  feedback!: boolean;

  @Column({ type: "uuid" })
  seller_id!: string;

  @Column({ type: "int" })
  connect_with!: number;

  @Column({ type: "float", default: 0 })
  debit_amount: number = 0;

  @Column({ type: "double precision", default: 0 })
  debit_total: number = 0;

  @Column({ type: "double precision", default: 0 })
  credit_total: number = 0;

  @Column({ type: "double precision", default: 0 })
  credit_amount: number = 0;

  @Column({ type: "uuid" })
  account_id!: string;

  @Column({ type: "text", nullable: true })
  sms?: string;

  @Column({ type: "float" })
  currency_val!: number;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "boolean", default: false })
  gen_entires: boolean = false;

  @Column({ type: "uuid", nullable: true })
  connect_with_id?: string;

  @Column({ type: "boolean", nullable: true })
  is_archived?: boolean;

  @Column({ type: "boolean", nullable: true })
  is_deleted?: boolean;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "uuid", nullable: true })
  accounting_voucher_pattern_id?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;

  @ManyToOne(() => Seller)
  @JoinColumn({ name: "seller_id" })
  seller!: Seller;

  @ManyToOne(() => AccountingVoucherPattern, { onDelete: "CASCADE" })
  @JoinColumn({ name: "accounting_voucher_pattern_id" })
  accountingVoucherPattern?: AccountingVoucherPattern;

  @OneToMany(
    () => AccountingVoucherPicture,
    (picture) => picture.accountingVoucherMain
  )
  pictures!: AccountingVoucherPicture[];
}
