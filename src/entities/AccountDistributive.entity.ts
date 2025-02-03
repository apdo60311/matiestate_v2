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

@Entity("account_distributive")
export class AccountDistributive {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column({ type: "float" })
  percentage!: number;

  @Column({ type: "uuid" })
  main_account_id!: string;

  @Column({ type: "uuid" })
  account_id!: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "int", nullable: true })
  number?: number;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "main_account_id" })
  mainAccount!: Account;
}
