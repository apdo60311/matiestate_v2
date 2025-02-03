import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { CostCenter } from "./CostCenter.entity";
import { AccountingVoucherMainData } from "./AccountingVoucherMainData.entity";
import { Account } from "./Account.entity";
import { Currency } from "./Currency.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("accounting_voucher_grid_data")
export class AccountingVoucherGridData {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account?: Account;

  @Column({ type: "float", default: 0 })
  debit: number = 0;

  @Column({ type: "float", default: 0 })
  credit: number = 0;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cost_center_id" })
  costCenter?: CostCenter;

  @ManyToOne(() => AccountingVoucherMainData, { onDelete: "CASCADE" })
  @JoinColumn({ name: "voucher_main_data_id" })
  voucherMainData!: AccountingVoucherMainData;

  @Column({ type: "text", nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
