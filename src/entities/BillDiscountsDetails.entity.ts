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
import { Account } from "./Account.entity";
import { CostCenter } from "./CostCenter.entity";
import { Bill } from "./Bill.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("bill_discounts_details")
export class BillDiscountsDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "bigint" })
  number!: number;

  @Column({ type: "uuid" })
  bill_id!: string;

  @Column({ type: "uuid" })
  account_id!: string;

  @Column({ type: "float", nullable: true })
  discount?: number;

  @Column({ type: "float", nullable: true })
  extra?: number;

  @Column({ type: "uuid", nullable: true })
  currency_id?: string;

  @Column({ type: "float", nullable: true })
  currency_val?: number;

  @Column({ type: "uuid", nullable: true })
  cost_center_id?: string;

  @Column({ type: "uuid", nullable: true })
  obverse_account_id?: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @ManyToOne(() => Bill, { onDelete: "CASCADE" })
  @JoinColumn({ name: "bill_id" })
  bill!: Bill;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cost_center_id" })
  costCenter?: CostCenter;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "obverse_account_id" })
  obverseAccount?: Account;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
