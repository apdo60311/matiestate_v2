import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  Unique,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tenant } from "./Tenant.entity";
import { Contract } from "./Contract.entity";
import { Currency } from "./Currency.entity";
import { Bank } from "./Bank.entity";

@Entity("installment")
export class Installment {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column("real")
  total_amount!: number;

  @Column("smallint", { default: 1 })
  gen_entries_type: number = 1;

  @Column("real")
  first_batch!: number;

  @Column("date", { nullable: true })
  payment_date?: Date;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;

  @Column("real", { nullable: true })
  currency_val?: number;

  @Column("real")
  rest_amount!: number;

  @ManyToOne(() => Bank, { nullable: true })
  @JoinColumn({ name: "bank_id" })
  bank?: Bank;

  @Column("real")
  installments_numbers!: number;

  @Column("int")
  each_number!: number;

  @Column("smallint")
  each_duration!: number;

  @Column("date")
  first_installment_date!: Date;

  @Column("real", { nullable: true })
  begin_number?: number;

  @Column("text", { nullable: true })
  beneficiary_name?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @ManyToOne(() => Contract, { onDelete: "CASCADE" })
  @JoinColumn({ name: "contract_id" })
  contract!: Contract;

  @Column("uuid", { nullable: false })
  contract_id!: string;
}
