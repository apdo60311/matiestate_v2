import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Account } from "./Account.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("cheque_pattern")
export class ChequePattern {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "int2", default: 1 })
  paper_type: number = 1;

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
  gen_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  auto_gen_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  auto_transfer_entry: boolean = false;

  @Column({ type: "text", nullable: true })
  default_print_folder?: string;

  @Column({ type: "boolean", default: false })
  deportable: boolean = false;

  @Column({ type: "boolean", default: false })
  deportable_gen_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  deportable_auto_gen_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  deportable_auto_transfer_entry: boolean = false;

  @Column({ type: "int2", nullable: true })
  deportable_default_date?: number;

  @Column({ type: "boolean", default: false })
  deportable_default_account_is_owner: boolean = false;

  @Column({ type: "boolean", default: false })
  deportable_default_observe_account_is_client: boolean = false;

  @Column({ type: "boolean", default: false })
  deportable_move_cost_center_debit: boolean = false;

  @Column({ type: "boolean", default: false })
  deportable_move_cost_center_credit: boolean = false;

  @Column({ type: "uuid", nullable: true })
  deportable_debit_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  deportable_credit_account_id?: string;

  @Column({ type: "boolean", default: false })
  collection: boolean = false;

  @Column({ type: "boolean", default: false })
  collection_gen_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  collection_auto_gen_entries: boolean = false;

  @Column({ type: "boolean", default: false })
  collection_auto_transfer_entry: boolean = false;

  @Column({ type: "int2", nullable: true })
  collection_default_date?: number;

  @Column({ type: "boolean", nullable: true })
  collection_default_account_is_building_bank?: boolean;

  @Column({ type: "boolean", nullable: true })
  collection_default_observe_account_is_client?: boolean;

  @Column({ type: "boolean", nullable: true })
  collection_move_cost_center_debit?: boolean;

  @Column({ type: "boolean", nullable: true })
  collection_move_cost_center_credit?: boolean;

  @Column({ type: "uuid", nullable: true })
  collection_credit_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  collection_debit_account_id?: string;

  @Column({ type: "int2", nullable: true })
  commission_type?: number;

  @Column({ type: "boolean", default: false })
  commission_amount_from_buildingss: boolean = false;

  @Column({ type: "boolean", default: false })
  commission_default_account_is_building_ownerss: boolean = false;

  @Column({ type: "boolean", default: false })
  commission_default_observe_is_revenue_accountss: boolean = false;

  @Column({ type: "boolean", default: false })
  commission_move_cost_center_debitss: boolean = false;

  @Column({ type: "boolean", default: false })
  commission_move_cost_center_creditss: boolean = false;

  @Column({ type: "uuid", nullable: true })
  commission_debit_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  commission_credit_account_id?: string;

  @Column({ type: "boolean", default: false })
  partial_collectionss: boolean = false;

  @Column({ type: "boolean", default: false })
  partial_gen_entriesss: boolean = false;

  @Column({ type: "boolean", default: false })
  partial_auto_gen_entriesss: boolean = false;

  @Column({ type: "boolean", default: false })
  partial_auto_transfer_entryss: boolean = false;

  @Column({ type: "boolean", default: false })
  partial_default_account_is_building_bankss: boolean = false;

  @Column({ type: "boolean", default: false })
  partial_default_observe_account_is_clientss: boolean = false;

  @Column({ type: "boolean", default: false })
  partial_move_cost_center_debitss: boolean = false;

  @Column({ type: "boolean", default: false })
  partial_move_cost_center_creditss: boolean = false;

  @Column({ type: "uuid", nullable: true })
  partial_debit_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  partial_credit_account_id?: string;

  @Column({ type: "boolean", default: false })
  endorsabless: boolean = false;

  @Column({ type: "boolean", default: false })
  endorsement_gen_entriesss: boolean = false;

  @Column({ type: "boolean", default: false })
  endorsement_auto_gen_entriesss: boolean = false;

  @Column({ type: "boolean", default: false })
  endorsement_auto_transfer_entryss: boolean = false;

  @Column({ type: "int2", nullable: true })
  endorsement_default_date?: number;

  @Column({ type: "boolean", default: false })
  endorsement_move_cost_center_debitss: boolean = false;

  @Column({ type: "boolean", default: false })
  endorsement_move_cost_center_creditss: boolean = false;

  @Column({ type: "uuid", nullable: true })
  endorsement_debit_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  endorsement_credit_account_id?: string;

  @Column({ type: "boolean", default: false })
  returnabless: boolean = false;

  @Column({ type: "boolean", default: false })
  returnable_gen_entriesss: boolean = false;

  @Column({ type: "boolean", default: false })
  returnable_auto_gen_entriesss: boolean = false;

  @Column({ type: "boolean", default: false })
  returnable_auto_transfer_entryss: boolean = false;

  @Column({ type: "int2", nullable: true })
  returnable_default_date?: number;

  @Column({ type: "boolean", default: false })
  returnable_default_account_is_clientss: boolean = false;

  @Column({ type: "boolean", default: false })
  returnable_default_observe_account_is_building_bankss: boolean = false;

  @Column({ type: "boolean", default: false })
  returnable_active_operationsss: boolean = false;

  @Column({ type: "boolean", default: false })
  returnable_move_cost_center_debitss: boolean = false;

  @Column({ type: "boolean", default: false })
  returnable_move_cost_center_creditss: boolean = false;

  @Column({ type: "uuid", nullable: true })
  returnable_debit_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  returnable_credit_account_id?: string;

  @Column({ type: "boolean", default: false })
  return_fee_default_account_is_clientss: boolean = false;

  @Column({ type: "uuid", nullable: true })
  return_fee_debit_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  return_fee_credit_account_id?: string;

  @Column({ type: "text", nullable: true })
  statement_account?: string;

  @Column({ type: "text", nullable: true })
  statement_observe_account?: string;

  @Column({ type: "text", nullable: true })
  statement_leaving?: string;

  @Column({ type: "text", nullable: true })
  statement_endorsement?: string;

  @Column({ type: "text", nullable: true })
  statement_collection?: string;

  @Column({ type: "text", nullable: true })
  statement_return?: string;

  @Column({ type: "text", nullable: true })
  statement_partial?: string;

  @Column({ type: "text", nullable: true })
  sms?: string;

  @Column({ type: "bigint", generated: "identity", unique: true })
  number!: number;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @Column({ type: "text", nullable: true })
  list_ltnname?: string;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "default_account_id" })
  defaultAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "deportable_debit_account_id" })
  deportableDebitAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "deportable_credit_account_id" })
  deportableCreditAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "collection_debit_account_id" })
  collectionDebitAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "collection_credit_account_id" })
  collectionCreditAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "commission_debit_account_id" })
  commissionDebitAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "commission_credit_account_id" })
  commissionCreditAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "partial_debit_account_id" })
  partialDebitAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "partial_credit_account_id" })
  partialCreditAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "endorsement_debit_account_id" })
  endorsementDebitAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "endorsement_credit_account_id" })
  endorsementCreditAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "returnable_debit_account_id" })
  returnableDebitAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "returnable_credit_account_id" })
  returnableCreditAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "return_fee_debit_account_id" })
  returnFeeDebitAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "return_fee_credit_account_id" })
  returnFeeCreditAccount?: Account;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
