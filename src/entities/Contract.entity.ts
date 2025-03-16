import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tenant } from "./Tenant.entity";
import { Apartment } from "./Apartment.entity";
import { Currency } from "./Currency.entity";
import { Building } from "./Building.entity";
import { Account } from "./Account.entity";
import { Land } from "./Land.entity";
import { Shop } from "./Shop.entity";
import { Parking } from "./Parking.entity";
import { Lessor } from "./Lessor.entity";
import { CostCenter } from "./CostCenter.entity";
import { Villa } from "./Villa.entity";
import { ContractPattern } from "./ContractPattern.entity";



@Entity('contract')
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column('int')
  contract_type!: number;

  @Column({ type: 'bigint', generated: 'identity' })
  number?: number;

  @Column('int')
  flat_type!: number;

  @Column('boolean', { default: false })
  is_archived: boolean = false;

  @Column('boolean', { default: false })
  is_deleted: boolean = false;

  @Column('int', { default: 1 })
  status: number = 1;

  @Column('int')
  code!: number;

  @Column('int', { nullable: true })
  contracts_number_prev?: number;

  @Column('int', { nullable: true })
  contracts_number_current?: number;

  @Column('boolean', { default: false })
  lawsuit: boolean = false;

  @Column('boolean', { default: false })
  feedback: boolean = false;

  @ManyToOne(() => Building, { nullable: true })
  @JoinColumn({ name: 'building_id' })
  building?: Building;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'insurance_account_id' })
  insurance_account?: Account;

  @Column('uuid', { nullable: true })
  insurance_account_id?: string;

  @Column('boolean', { nullable: true })
  gen_entries?: boolean;

  @Column('bigint', { nullable: true })
  gov_number?: number;

  @Column('real', { nullable: true })
  previous_securing?: number;

  @Column('real', { nullable: true })
  current_securing_percentage?: number;

  @Column('real', { nullable: true })
  current_securing_value?: number;

  @Column('real')
  final_price!: number;

  @Column('real', { nullable: true })
  discount_rate?: number;

  @Column('real', { nullable: true })
  discount_value?: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'revenue_account_id' })
  revenue_account!: Account;

  @Column('uuid', { nullable: false })
  revenue_account_id!: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'discount_account_id' })
  discount_account?: Account;

  @Column('uuid', { nullable: true })
  discount_account_id?: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'client_id' })
  client!: Account;

  @Column('uuid', { nullable: false })
  client_id!: string;

  @Column('int')
  paid_type!: number;

  @Column('real')
  contract_value!: number;

  @ManyToOne(() => Apartment, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'apartment_id' })
  apartment?: Apartment;


  @Column('uuid', { nullable: true })
  apartment_id?: string;

  @ManyToOne(() => Land, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'land_id' })
  land?: Land;

  @Column('uuid', { nullable: true })
  land_id?: string;

  @ManyToOne(() => Shop, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'shop_id' })
  shop?: Shop;

  @Column('uuid', { nullable: true })
  shop_id?: string;

  @ManyToOne(() => Parking, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'parking_id' })
  parking?: Parking;


  @Column('uuid', { nullable: true })
  parking_id?: string;

  @ManyToOne(() => Lessor, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'lessor_id' })
  lessor?: Lessor;

  @Column('uuid', { nullable: true })
  lessor_id?: string;

  @Column('date', { nullable: true })
  start_duration_date?: Date;

  @Column('date', { nullable: true })
  end_duration_date?: Date;

  @Column('varchar', { nullable: true })
  contract_duration?: string;

  @ManyToOne(() => CostCenter, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'cost_center_id' })
  cost_center?: CostCenter;

  @Column('uuid', { nullable: true })
  cost_center_id?: string;


  @Column('text', { nullable: true })
  description?: string;

  @Column('date', { nullable: true })
  issue_date?: Date;

  @Column('text', { nullable: true })
  note?: string;

  @Column('date', { nullable: true })
  property_delivery_date?: Date;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @Column('uuid', { nullable: true })
  tenant_id?: string;

  @ManyToOne(() => Villa, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'villa_id' })
  villa?: Villa;

  @Column('uuid', { nullable: true })
  villa_id?: string;

  @ManyToOne(() => ContractPattern, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_pattern_id' })
  contract_pattern!: ContractPattern;

  @Column('uuid', { nullable: false })
  contract_pattern_id!: string;
}