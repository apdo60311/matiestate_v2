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
import { Contract } from "./Contract.entity";
import { ContractTermination } from "./ContractTermination.entity";
import { Account } from "./Account.entity";

@Entity('termination_fines_grid')
export class TerminationFinesGrid {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @ManyToOne(() => ContractTermination, { nullable: true })
  @JoinColumn({ name: 'contract_termination_fines_id' })
  termination?: ContractTermination;

  @ManyToOne(() => Contract, { nullable: true })
  @JoinColumn({ name: 'contract_id' })
  contract?: Contract;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @Column('real', { nullable: true })
  fee_amount?: number;

  @Column('text', { nullable: true })
  notes?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
