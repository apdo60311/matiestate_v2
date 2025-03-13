import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tenant } from "./Tenant.entity";
import { Account } from "./Account.entity";
import { Currency } from "./Currency.entity";
import { CostCenter } from "./CostCenter.entity";
import { AccountingVoucherMainData } from "./AccountingVoucherMainData.entity";
import { Cheque } from "./Cheque.entity";


@Entity('op_collection')
export class OpCollection {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column('boolean', { default: false })
  feedback: boolean = false;

  @Column('float8')
  amount!: number;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'currency_id' })
  currency!: Currency;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'debit_account_id' })
  debit_account!: Account;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'credit_account_id' })
  credit_account!: Account;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: 'cost_center_id' })
  cost_center?: CostCenter;

  @Column('text', { nullable: true })
  note?: string;

  @Column('real', { default: 0 })
  commission_value: number = 0;

  @Column('real', { default: 0 })
  commission_percentage: number = 0;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'commission_debit_id' })
  commission_debit?: Account;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'commission_credit_id' })
  commission_credit?: Account;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: 'commission_cost_center_id' })
  commission_cost_center?: CostCenter;

  @Column('text', { nullable: true })
  commission_note?: string;

  @ManyToOne(() => AccountingVoucherMainData, { nullable: true })
  @JoinColumn({ name: 'accounting_voucher_main_data_id' })
  voucher?: AccountingVoucherMainData;

  @ManyToOne(() => Cheque)
  @JoinColumn({ name: 'cheque_id' })
  cheque!: Cheque;

  @Column('boolean', { nullable: true })
  gen_entries?: boolean;

  @Column('real', { nullable: true })
  currency_val?: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
