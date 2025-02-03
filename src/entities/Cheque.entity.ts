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
import { Seller } from "./Seller.entity";
import { CostCenter } from "./CostCenter.entity";
import { Bank } from "./Bank.entity";
import { Installment } from "./Installment.entity";
import { Apartment } from "./Apartment.entity";
import { Shop } from "./Shop.entity";
import { Parking } from "./Parking.entity";
import { ChequePattern } from "./ChequePattern.entity";


@Entity('cheque')
export class Cheque {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4().toString();
  
    @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: 'bigint', generated: 'identity' })
  number?: number;

  @Column('int')
  type!: number;

  @Column('float8')
  amount!: number;

  @ManyToOne(() => Currency)
  @JoinColumn({ name: 'currency_id' })
  currency!: Currency;

  @ManyToOne(() => Seller, { nullable: true })
  @JoinColumn({ name: 'seller_id' })
  seller?: Seller;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @Column('text', { nullable: true })
  beneficiary_name?: string;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: 'cost_center_id' })
  cost_center?: CostCenter;

  @Column('text', { nullable: true })
  note?: string;

  @Column('date', { nullable: true })
  due_date?: Date;

  @Column('date', { nullable: true })
  end_due_date?: Date;

  @Column('boolean', { default: false })
  without_due_date: boolean = false;

  @ManyToOne(() => Bank, { nullable: true })
  @JoinColumn({ name: 'bank_id' })
  bank?: Bank;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'observe_account_id' })
  observe_account?: Account;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: 'observe_cost_center_id' })
  observe_cost_center?: CostCenter;

  @Column('text', { nullable: true })
  note1?: string;

  @Column('text', { nullable: true })
  note2?: string;

  @Column('boolean', { default: false })
  deport_status: boolean = false;

  @Column('boolean', { default: false })
  collection_status: boolean = false;

  @Column('boolean', { default: false })
  partial_collection_status: boolean = false;

  @Column('boolean', { default: false })
  return_status: boolean = false;

  @Column('boolean', { default: false })
  deposit_status: boolean = false;

  @Column('int', { default: 1 })
  connect_with: number = 1;

  @Column('uuid', { nullable: true })
  connect_with_id?: string;

  @Column('boolean', { default: false })
  feedback: boolean = false;

  @Column('boolean', { nullable: true })
  gen_entries?: boolean;

  @Column('real', { default: 0 })
  currency_val: number = 0;

  @Column('text', { nullable: true })
  obverse_account_note?: string;

  @ManyToOne(() => Installment, { nullable: true })
  @JoinColumn({ name: 'installment_id' })
  installment?: Installment;

  @Column('boolean', { default: false })
  is_deleted: boolean = false;

  @Column('boolean', { default: false })
  is_archived: boolean = false;

  @ManyToOne(() => Apartment, { nullable: true })
  @JoinColumn({ name: 'apartment_id' })
  apartment?: Apartment;

  @ManyToOne(() => Shop, { nullable: true })
  @JoinColumn({ name: 'shop_id' })
  shop?: Shop;

  @ManyToOne(() => Parking, { nullable: true })
  @JoinColumn({ name: 'parking_id' })
  parking?: Parking;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @ManyToOne(() => ChequePattern)
  @JoinColumn({ name: 'cheque_pattern_id' })
  pattern!: ChequePattern;
}

