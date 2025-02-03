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
import { Account } from "./Account.entity";
import { Contract } from "./Contract.entity";


@Entity('contract_commission')
export class ContractCommission {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @Column('real', { nullable: true })
  commission_percentage?: number;

  @Column('real', { nullable: true })
  commission_value?: number;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'commission_account_id' })
  commission_account?: Account;

  @Column('text', { nullable: true })
  commission_note?: string;

  @Column('real', { nullable: true })
  commission_from_owner_percentage?: number;

  @Column('real', { nullable: true })
  commission_from_owner_value?: number;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'commission_from_owner_account_id' })
  commission_from_owner_account?: Account;

  @Column('text', { nullable: true })
  commission_from_owner_note?: string;

  @Column('real', { nullable: true })
  commission_from_lessor_percentage?: number;

  @Column('real', { nullable: true })
  commission_from_lessor_value?: number;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'commission_from_lessor_account_id' })
  commission_from_lessor_account?: Account;

  @Column('text', { nullable: true })
  commission_from_lessor_note?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @Column('boolean', { nullable: true })
  gen_entries?: boolean;
}
