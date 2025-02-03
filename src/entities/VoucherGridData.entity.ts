import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";
import { Account } from "./Account.entity";
import { CostCenter } from "./CostCenter.entity";
import { VoucherMainData } from "./VoucherMainData.entity";

@Entity("voucher_grid_data")
export class VoucherGridData {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "account_id" })
  account?: Account;

  @Column("real", { default: 0 })
  debit: number = 0;

  @Column("real", { default: 0 })
  credit: number = 0;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: "cost_center_id" })
  cost_center?: CostCenter;

  @ManyToOne(() => VoucherMainData, { onDelete: "CASCADE" })
  @JoinColumn({ name: "voucher_main_data_id" })
  voucher_main_data!: VoucherMainData;

  @Column("text", { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
