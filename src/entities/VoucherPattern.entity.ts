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
import { v4 as uuidv4 } from "uuid";

@Entity("voucher_pattern")
export class VoucherPattern {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "bigint", generated: "identity", unique: true })
  code!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  list_name?: string;

  @Column({ type: "uuid", nullable: true })
  default_account_id?: string;

  @Column({ type: "text", nullable: true })
  shortcut_key?: string;

  @Column({ type: "boolean", default: false })
  auto_transfer_entry: boolean = false;

  @Column({ type: "boolean", default: false })
  move_account_cost_center: boolean = false;

  @Column({ type: "boolean", default: false })
  required_cost_center: boolean = false;

  @Column({ type: "boolean", default: false })
  required_statement: boolean = false;

  @Column({ type: "text", nullable: true })
  default_print_folder_path?: string;

  @Column({ type: "boolean", default: false })
  show_debit_field: boolean = false;

  @Column({ type: "boolean", default: false })
  show_credit_field: boolean = false;

  @Column({ type: "text", default: "debit" })
  debit_field_label: string = "debit";

  @Column({ type: "text", default: "credit" })
  credit_field_label: string = "credit";

  @Column({ type: "boolean", default: false })
  show_currency: boolean = false;

  @Column({ type: "boolean", default: false })
  show_cost_center: boolean = false;

  @Column({ type: "boolean", default: false })
  show_note: boolean = false;

  @Column({ type: "text", nullable: true })
  odd_table_color?: string;

  @Column({ type: "text", nullable: true })
  even_table_color?: string;

  @Column({ type: "text", nullable: true })
  sms?: string;

  @Column({ type: "boolean", default: false })
  gen_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  auto_gen_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  show_contract_field: boolean = false;

  @Column({ type: "boolean", default: false })
  show_contract_cost_center: boolean = false;

  @Column({ type: "boolean", default: false })
  generate_records: boolean = false;

  @Column({ type: "bigint", generated: "identity", unique: true })
  number!: number;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @Column({ type: "text", nullable: true })
  list_ltnname?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "default_account_id" })
  defaultAccount?: Account;
}
