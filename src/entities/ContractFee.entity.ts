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


@Entity('contract_fee')
export class ContractFee {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @Column('numeric', { nullable: true })
  number?: number;

  @Column('bigint', { nullable: true })
  entrynumber?: number;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @Column('timestamp', { nullable: true })
  date?: Date;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @Column('float8', { nullable: true })
  value?: number;

  @Column('boolean', { default: true })
  create_entry: boolean = true;

  @Column('text', { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
