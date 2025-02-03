import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Store } from "./Store.entity";
import { CostCenter } from "./CostCenter.entity";
import { Account } from "./Account.entity";
import { Currency } from "./Currency.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("bill_pattern")
export class BillPattern {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "bigint" })
  number!: number;

  @Column({ type: "bigint", generated: "identity" })
  code!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "int" })
  bill_type!: number;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "boolean", nullable: true })
  barcode_bill?: boolean;

  @Column({ type: "varchar", nullable: true })
  list_name?: string;

  @Column({ type: "uuid", nullable: true })
  default_store_id?: string;

  @Column({ type: "uuid", nullable: true })
  cost_center_id?: string;

  @Column({ type: "uuid", nullable: true })
  material_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  cash_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  discount_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  extra_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  vat_account_id?: string;

  @Column({ type: "uuid" })
  currency_id!: string;

  @Column({ type: "boolean", default: false })
  use_vat_account_from_customer_card: boolean = false;

  @Column({ type: "int", default: 1 })
  payment_method: number = 1;

  @Column({ type: "boolean", default: false })
  bill_affected_the_pricing_of_materials: boolean = false;

  @Column({ type: "int", default: 1 })
  pricing_of_materials: number = 1;

  @Column({ type: "boolean", default: false })
  active_perpetual_inventory: boolean = false;

  @Column({ type: "uuid", nullable: true })
  stock_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  calculate_sale_cost_center_id?: string;

  @Column({ type: "varchar", nullable: true })
  table_color1?: string;

  @Column({ type: "varchar", nullable: true })
  table_color2?: string;

  @Column({ type: "boolean", default: false })
  post_to_store: boolean = false;

  @Column({ type: "boolean", default: false })
  post_to_store_auto: boolean = false;

  @Column({ type: "boolean", default: false })
  generate_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  auto_generate_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  post_generate_entries_auto: boolean = false;

  @Column({ type: "boolean", default: false })
  deleting_entry_depending_on_materials: boolean = false;

  @Column({ type: "boolean", default: false })
  possibility_of_changing_materials_account: boolean = false;

  @Column({ type: "boolean", default: false })
  calculate_vat_after_discount_and_extra_value_to_the_invoice: boolean = false;

  @Column({ type: "boolean", default: false })
  merge_repeated_materials: boolean = false;

  @Column({ type: "boolean", default: false })
  required_customer_entry: boolean = false;

  @Column({ type: "boolean", default: false })
  required_cost_center_entry: boolean = false;

  @Column({ type: "boolean", default: false })
  required_category_entry: boolean = false;

  @Column({ type: "boolean", default: false })
  show_alert_on_navigate_output: boolean = false;

  @Column({ type: "boolean", default: false })
  dont_save_when_navigate_output: boolean = false;

  @Column({ type: "boolean", default: false })
  show_average_price_check_message_after_adding_modifying: boolean = false;

  @Column({ type: "boolean", default: false })
  show_references_field: boolean = false;

  @Column({ type: "boolean", default: false })
  required_reference_field: boolean = false;

  @Column({ type: "boolean", default: false })
  dont_show_expired_field: boolean = false;

  @Column({ type: "boolean", default: false })
  lock_bill_when_loading_references: boolean = false;

  @Column({ type: "boolean", default: false })
  allow_partial_load: boolean = false;

  @Column({ type: "jsonb", nullable: true })
  references?: any;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @Column({ type: "jsonb", nullable: true })
  linked_material_group?: any;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @Column({ type: "text", nullable: true })
  list_ltnname?: string;

  @ManyToOne(() => Store, { onDelete: "CASCADE" })
  @JoinColumn({ name: "default_store_id" })
  defaultStore?: Store;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cost_center_id" })
  costCenter?: CostCenter;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "material_account_id" })
  materialAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cash_account_id" })
  cashAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "discount_account_id" })
  discountAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "extra_account_id" })
  extraAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "vat_account_id" })
  vatAccount?: Account;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "stock_account_id" })
  stockAccount?: Account;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "calculate_sale_cost_center_id" })
  calculateSaleCostCenter?: CostCenter;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
