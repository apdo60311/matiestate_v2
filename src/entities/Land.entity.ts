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
import { Owner } from "./Owner.entity";
import { AccountingVoucherPattern } from "./AccountVoucherPattern.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("land")
export class Land {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "int2" })
  type!: number;

  @Column({ type: "boolean", default: false })
  ban!: boolean;

  @Column({ type: "text", nullable: true })
  land_no?: string;

  @Column({ type: "varchar", nullable: true })
  name?: string;

  @Column({ type: "varchar", nullable: true })
  last_name?: string;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customer_id" })
  customer?: Account;

  @Column({ type: "date", nullable: true })
  date?: Date;

  @Column({ type: "varchar", nullable: true })
  city?: string;

  @Column({ type: "varchar", nullable: true })
  region?: string;

  @Column({ type: "varchar", nullable: true })
  space?: string;

  @Column({ type: "float", nullable: true })
  area?: number;

  @Column({ type: "varchar", nullable: true })
  area_unit?: string;

  @Column({ type: "float", nullable: true })
  price?: number;

  @Column({ type: "varchar", nullable: true })
  license_no?: string;

  @Column({ type: "varchar", nullable: true })
  license?: string;

  @Column({ type: "date", nullable: true })
  license_date?: Date;

  @Column({ type: "text", nullable: true })
  details?: string;

  @Column({ type: "text", nullable: true })
  land_type?: string;

  @Column({ type: "varchar", nullable: true })
  side?: string;

  @Column({ type: "varchar", nullable: true })
  street_name?: string;

  @Column({ type: "int", nullable: true })
  street_count?: number;

  @Column({ type: "boolean", nullable: true })
  buildble?: boolean;

  @Column({ type: "int", nullable: true })
  landowner?: number;

  @Column({ type: "float", nullable: true })
  begin_land_value?: number;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_begin_land_id" })
  currencyBeginLand?: Currency;

  @Column({ type: "float", nullable: true })
  currency_val_begin_land?: number;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "begin_land_cost_center_id" })
  beginLandCostCenter?: CostCenter;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_purchase_id" })
  currencyPurchase?: Currency;

  @Column({ type: "float", nullable: true })
  currency_val_purchase?: number;

  @Column({ type: "text", nullable: true })
  purchase_note?: string;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account?: Account;

  @ManyToOne(() => Owner)
  @JoinColumn({ name: "cuowner_id" })
  cuowner?: Owner;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cost_center_id" })
  costCenter?: CostCenter;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bank_account_id" })
  bankAccount?: Account;

  @Column({ type: "float", nullable: true })
  commission_percent?: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_comm_income_id" })
  commissionIncomeAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customer_owner_id" })
  customerOwner?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "owner_account_id" })
  ownerAccount?: Account;

  @Column({ type: "float", nullable: true })
  identity_value?: number;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_identity_id" })
  currencyIdentity?: Currency;

  @Column({ type: "float", nullable: true })
  currency_valid_entity?: number;

  @Column({ type: "date", nullable: true })
  identity_begin_date?: Date;

  @Column({ type: "date", nullable: true })
  identity_end_date?: Date;

  @Column({ type: "boolean", nullable: true })
  create_entry_investment?: boolean;

  @ManyToOne(() => AccountingVoucherPattern)
  @JoinColumn({ name: "identity_entry_id" })
  identityEntry?: AccountingVoucherPattern;

  @Column({ type: "text", nullable: true })
  identity_note?: string;

  @Column({ type: "text", nullable: true })
  ltn_land_type?: string;

  @Column({ type: "varchar", nullable: true })
  ltn_city?: string;

  @Column({ type: "varchar", nullable: true })
  ltn_region?: string;

  @Column({ type: "varchar", nullable: true })
  ltn_space?: string;

  @Column({ type: "varchar", nullable: true })
  ltn_license?: string;

  @Column({ type: "varchar", nullable: true })
  ltn_side?: string;

  @Column({ type: "float", nullable: true })
  rent?: number;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "rent_currency_id" })
  rentCurrency?: Currency;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @Column({ type: "boolean", nullable: true })
  used_end_date?: boolean;

  @Column({ type: "text", nullable: true })
  ltnname?: string;
}
