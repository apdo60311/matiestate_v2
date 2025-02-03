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
import { Building } from "./Building.entity";
import { Account } from "./Account.entity";
  

@Entity('lawsuit')
export class Lawsuit {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: 'bigint', generated: 'identity', unique: true })
  number?: number;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @Column('text', { nullable: true })
  lawsuit_no?: string;

  @Column('date', { nullable: true })
  opened_lawsuit_date?: Date;

  @ManyToOne(() => Building, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'building_id' })
  building?: Building;

  @Column('uuid', { default: () => 'gen_random_uuid()' })
  unit_id?: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client?: Account;

  @Column('boolean', { nullable: true })
  status?: boolean;

  @Column('date', { nullable: true })
  legal_department_date?: Date;

  @Column('date', { nullable: true })
  refrain_date?: Date;

  @Column('date', { nullable: true })
  municipality_clearance_date?: Date;

  @Column('date', { nullable: true })
  electricity_clearance_date?: Date;

  @Column('real', { nullable: true })
  latest_rent_certified_contract?: number;

  @Column('bigint', { nullable: true })
  implementation_number?: number;

  @Column('date', { nullable: true })
  implementation_date?: Date;

  @Column('text', { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
