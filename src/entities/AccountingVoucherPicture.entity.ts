import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { AccountingVoucherMainData } from "./AccountingVoucherMainData.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("accounting_voucher_pictures")
export class AccountingVoucherPicture {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "text" })
  picture!: string;

  @Column({ type: "uuid" })
  accounting_voucher_main_id!: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @ManyToOne(() => AccountingVoucherMainData, { onDelete: "CASCADE" })
  @JoinColumn({ name: "accounting_voucher_main_id" })
  accountingVoucherMain!: AccountingVoucherMainData;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
