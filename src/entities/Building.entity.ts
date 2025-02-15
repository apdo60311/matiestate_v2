import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Bank } from "./Bank.entity";
import { Currency } from "./Currency.entity";
import { Account } from "./Account.entity";
import { Lessor } from "./Lessor.entity";
import { Owner } from "./Owner.entity";
import { Tenant } from "./Tenant.entity";
import { CostCenter } from "./CostCenter.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("building")
export class Building {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "double precision", nullable: true })
  purchase_amount?: number;

  @Column({ type: "boolean", default: false })
  purchase_gen_entries!: boolean;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "purchase_currency_id" })
  purchaseCurrency?: Currency;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "supplier_account_id" })
  supplierAccount?: Account;

  @Column({ type: "text", nullable: true })
  purchase_statement?: string;

  @Column({ type: "double precision", nullable: true })
  building_cost?: number;

  @Column({ type: "date", nullable: true })
  purchase_date?: Date;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "investment_owner_account_id" })
  investmentOwnerAccount?: Account;

  @Column({ type: "date", nullable: true })
  investment_start_date?: Date;

  @Column({ type: "date", nullable: true })
  investment_end_date?: Date;

  @Column({ type: "boolean", nullable: true })
  terminating_tenancies?: boolean;

  @Column({ type: "float", nullable: true })
  investment_value?: number;

  @Column({ type: "boolean", default: false })
  investment_gen_entries!: boolean;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: "investment_currency_id" })
  investmentCurrency?: Currency;

  @Column({ type: "float", nullable: true })
  investment_currency_val?: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "renters_insurance" })
  rentersInsurance?: Account;

  @Column({ type: "text", nullable: true })
  building_receipt?: string;

  @Column({ type: "date", nullable: true })
  received_date?: Date;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "received_account_id" })
  receivedAccount?: Account;

  @Column({ type: "float", nullable: true })
  received_amount?: number;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: "received_currency_id" })
  receivedCurrency?: Currency;

  @Column({ type: "float", nullable: true })
  received_currency_val?: number;

  @Column({ type: "text", nullable: true })
  received_note?: string;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "owner_account_id" })
  ownerAccount?: Account;

  @Column({ type: "float", nullable: true })
  commission_rate?: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "revenue_id" })
  revenue?: Account;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @Column({ type: "float", nullable: true })
  entry_commission_rate?: number;

  @Column({ type: "float", nullable: true })
  entry_vat_rate?: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "entry_vat_account_id" })
  entryVatAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "entry_landlord_account_id" })
  entryLandlordAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "entry_commission_from_owner_account_id" })
  entryCommissionFromOwnerAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "entry_revenue_account_id" })
  entryRevenueAccount?: Account;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  emirate?: string;

  @Column({ type: "text", nullable: true })
  suburb?: string;

  @Column({ type: "text", nullable: true })
  area?: string;

  @Column({ type: "text", nullable: true })
  street?: string;

  @Column({ type: "bigint", generated: "identity" })
  building_number!: number;

  @Column({ type: "text", nullable: true })
  part_number?: string;

  @Column({ type: "text", nullable: true })
  basin_number?: string;

  @Column({ type: "text", nullable: true })
  bond_number?: string;

  @Column({ type: "text", nullable: true })
  bond_type?: string;

  @Column({ type: "date", nullable: true })
  bond_date?: Date;

  @ManyToOne(() => Owner)
  @JoinColumn({ name: "owner_id" })
  owner?: Owner;

  @Column({ type: "boolean", nullable: true })
  display?: boolean;

  @Column({ type: "text", nullable: true })
  statement?: string;

  @ManyToOne(() => Lessor, (lessor: Lessor) => lessor.buildings)
  @JoinColumn({ name: "lessor_id" })
  lessor?: Lessor;

  @ManyToOne(() => Bank)
  @JoinColumn({ name: "bank_id" })
  bank?: Bank;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "date", nullable: true })
  building_purchase_date?: Date;

  @Column({ type: "double precision", nullable: true })
  building_amount?: number;

  @Column({ type: "boolean", nullable: true })
  building_gen_entries?: boolean;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: "building_currency_id" })
  buildingCurrency?: Currency;

  @Column({ type: "float", nullable: true })
  building_currency_val?: number;

  @Column({ type: "int", nullable: true })
  apartment_count?: number;

  @Column({ type: "int", nullable: true })
  penthouse_count?: number;

  @Column({ type: "int", nullable: true })
  parking_count?: number;

  @Column({ type: "int", nullable: true })
  mezzanine_count?: number;

  @Column({ type: "int", nullable: true })
  office_count?: number;

  @Column({ type: "int", nullable: true })
  warehouse_count?: number;

  @Column({ type: "int", nullable: true })
  service_apartments?: number;

  @Column({ type: "int", nullable: true })
  drivers_apartments?: number;

  @Column({ type: "int", nullable: true })
  store_count?: number;

  @Column({ type: "int", nullable: true })
  apartment_floor?: number;

  @Column({ type: "int", nullable: true })
  penthouse_floor?: number;

  @Column({ type: "int", nullable: true })
  parking_floor?: number;

  @Column({ type: "int", nullable: true })
  mezzanine_floor?: number;

  @Column({ type: "int", nullable: true })
  office_floor?: number;

  @Column({ type: "int", nullable: true })
  underground_parking?: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_account_id" })
  buildingAccount?: Account;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "main_cost_center_id" })
  mainCostCenter?: CostCenter;

  @Column({ type: "boolean", default: true })
  create_into_account!: boolean;

  @Column({ type: "boolean", default: true })
  create_into_cost_center!: boolean;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "create_into_account_id" })
  createIntoAccount?: Account;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "create_into_cost_center_id" })
  createIntoCostCenter?: CostCenter;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_bank_account_id" })
  buildingBankAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_cash_account_id" })
  buildingCashAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_deposit_account_id" })
  buildingDepositAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_cheque_account_id" })
  buildingChequeAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "vat_account_id" })
  vatAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "deferred_vat_account_id" })
  deferredVatAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "owner_balance" })
  ownerBalance?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "owner_tax_account_id" })
  ownerTaxAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "commission_expense_account_id" })
  commissionExpenseAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "realestate_company_account_id" })
  realestateCompanyAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customers_main_account_id" })
  customersMainAccount?: Account;

  @Column({ type: "int", nullable: true })
  shop_count?: number;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_insurance_account_id" })
  buildingInsuranceAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_discount_account_id" })
  buildingDiscountAccount?: Account;

  @Column({ type: "text", nullable: true })
  city?: string;

  @Column({ type: "text", nullable: true })
  ltnname?: string;
}
