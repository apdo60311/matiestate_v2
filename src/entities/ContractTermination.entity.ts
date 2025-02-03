import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
  } from "typeorm";
  import { v4 as uuidv4 } from "uuid";
  import { Tenant } from "./Tenant.entity";
import { Contract } from "./Contract.entity";
import { Account } from "./Account.entity";


@Entity('contract_termination')
export class ContractTermination {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @Column('date', { nullable: true })
  termination_date?: Date;

  @Column('real', { default: 0 })
  owner_total_amount: number = 0;

  @Column('real', { nullable: true })
  owner_rest_amount?: number;

  @Column('int', { nullable: true })
  round_to?: number;

  @Column('text', { nullable: true })
  revenue_note?: string;

  @Column('text', { nullable: true })
  fines?: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'fines_revenue_account_id' })
  fines_revenue_account?: Account;

  @Column('text', { nullable: true })
  fine_note?: string;

  @Column('boolean', { nullable: true })
  evacuation_request?: boolean;

  @Column('date', { nullable: true })
  evacuation_date?: Date;

  @Column('boolean', { nullable: true })
  clearance_printed?: boolean;

  @Column('date', { nullable: true })
  clearance_printed_date?: Date;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @Column('boolean', { default: false })
  terminated: boolean = false;

  @Column('boolean', { nullable: true })
  gen_entries?: boolean;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'revenue_account_id' })
  revenue_account!: Account;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
