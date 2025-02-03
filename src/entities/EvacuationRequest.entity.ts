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
import { Account } from "./Account.entity";


@Entity('evacuation_request')
export class EvacuationRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column('int', { generated: 'identity' })
  request_id?: number;

  @Column('text')
  description!: string;

  @Column('date')
  evacuation_date!: Date;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'user_account_id' })
  user_account!: Account;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @Column('int', { default: 1 })
  request_status: number = 1;

  @Column('text', { nullable: true })
  note?: string;
}

