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


@Entity('contract_cycle')
export class ContractCycle {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @Column('boolean', { nullable: true })
  contract_documented?: boolean;

  @Column('boolean', { nullable: true })
  contract_certifying?: boolean;

  @Column('text', { nullable: true })
  contract_certifying_body?: string;

  @Column('boolean', { nullable: true })
  contract_received?: boolean;

  @Column('boolean', { nullable: true })
  contract_delivered?: boolean;

  @Column('boolean', { nullable: true })
  contract_signed?: boolean;

  @Column('int', { nullable: true })
  municipal_license_num?: number;

  @Column('date', { nullable: true })
  municipal_license_from?: Date;

  @Column('date', { nullable: true })
  municipal_license_to?: Date;

  @Column('int', { nullable: true })
  license_num?: number;

  @Column('date', { nullable: true })
  license_from?: Date;

  @Column('date', { nullable: true })
  license_to?: Date;

  @Column('int', { nullable: true })
  civil_license_num?: number;

  @Column('date', { nullable: true })
  civil_license_from?: Date;

  @Column('date', { nullable: true })
  civil_license_to?: Date;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
