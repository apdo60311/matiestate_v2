import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Currency } from "./Currency.entity";
import { BillPattern } from "./BillPattern.entity";
import { Account } from "./Account.entity";
import { CostCenter } from "./CostCenter.entity";
import { Store } from "./Store.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("bill")
export class Bill {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "date" })
  issue_date!: Date;

  @Column({ type: "date" })
  bill_date!: Date;

  @Column({ type: "int" })
  bill_kind!: number;

  @Column({ type: "uuid" })
  client_account_id!: string;

  @Column({ type: "uuid" })
  currency_id!: string;

  @Column({ type: "float", default: 1 })
  currency_val: number = 1;

  @Column({ type: "int", default: 1 })
  payment_method: number = 1;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "bigint", nullable: true })
  receipt_number?: number;

  @Column({ type: "uuid", nullable: true })
  cost_center_id?: string;

  @Column({ type: "int", nullable: true })
  connect_with?: number;

  @Column({ type: "uuid", nullable: true })
  connect_with_id?: string;

  @Column({ type: "uuid" })
  store_id!: string;

  @Column({ type: "uuid" })
  customer_account_id!: string;

  @Column({ type: "uuid", nullable: true })
  material_account_id?: string;

  @Column({ type: "text", nullable: true })
  kind?: string;

  @Column({ type: "float" })
  total_quantities!: number;

  @Column({ type: "float" })
  total_quantities_percentage!: number;

  @Column({ type: "float", nullable: true })
  total_quantities_percentage2?: number;

  @Column({ type: "float", nullable: true })
  refunded_taxable_amount?: number;

  @Column({ type: "float", nullable: true })
  non_refunded_taxable_amount?: number;

  @Column({ type: "float" })
  not_taxable!: number;

  @Column({ type: "float", nullable: true })
  taxable?: number;

  @Column({ type: "float" })
  total!: number;

  @Column({ type: "float", nullable: true })
  discounts?: number;

  @Column({ type: "float", nullable: true })
  discounts_extra?: number;

  @Column({ type: "float", nullable: true })
  non_refundable_vat?: number;

  @Column({ type: "float", nullable: true })
  non_refundable_vat2?: number;

  @Column({ type: "float" })
  grand_total!: number;

  @Column({ type: "float" })
  net!: number;

  @Column({ type: "text", nullable: true })
  bill_total_text?: string;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @Column({ type: "uuid" })
  bill_pattern_id!: string;

  @Column({ type: "int" })
  code!: number;

  @Column({ type: "uuid" })
  vat_account_id!: string;

  @Column({ type: "float4", nullable: true })
  extras?: number;

  @Column({ type: "float4", nullable: true })
  vat_amount?: number;

  @Column({ type: "float4" })
  subtotal!: number;

  @Column({ type: "uuid", nullable: true })
  customer_id?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;

  @ManyToOne(() => BillPattern, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bill_pattern_id" })
  billPattern!: BillPattern;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "client_account_id" })
  clientAccount!: Account;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cost_center_id" })
  costCenter?: CostCenter;

  @ManyToOne(() => Store, { onDelete: "CASCADE" })
  @JoinColumn({ name: "store_id" })
  store!: Store;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customer_account_id" })
  customerAccount!: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "material_account_id" })
  materialAccount?: Account;
}
