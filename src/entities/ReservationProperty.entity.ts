import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './Account.entity';
import { Building } from './Building.entity';
import { Currency } from './Currency.entity';
import { CostCenter } from './CostCenter.entity';
import { Tenant } from './Tenant.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('reservation_property')
export class ReservationProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column('int')
  property_type!: number;

  @Column('uuid')
  property_id!: string;

  @Column('date')
  book_date?: Date = new Date(new Date().getTime());

  @Column('date', { nullable: true })
  end_book_date?: Date;

  @Column('text', { nullable: true })
  note?: string;

  @Column('boolean', { nullable: true })
  has_payment?: boolean;

  @Column('boolean', { nullable: true })
  reservation_expired?: boolean;

  @Column('real', { nullable: true })
  payment_amount?: number;

  @Column('real', { nullable: true })
  currency_val?: number;

  @Column({ type: 'bigint', generated: 'identity', unique: true })
  number?: number;

  @Column('int', { nullable: true })
  payment_method?: number;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @ManyToOne(() => Building, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'building_id' })
  building!: Building;

  @ManyToOne(() => Currency, { nullable: true })
  @JoinColumn({ name: 'currency_id' })
  currency?: Currency;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'credit_account_id' })
  credit_account?: Account;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'debit_account_id' })
  debit_account?: Account;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: 'credit_cost_center_id' })
  credit_cost_center?: CostCenter;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: 'debit_cost_center_id' })
  debit_cost_center?: CostCenter;
}