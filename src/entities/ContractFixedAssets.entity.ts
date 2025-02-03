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
import { Contract } from "./Contract.entity";


@Entity('contract_fixed_assets')
export class ContractFixedAssets {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @Column('real', { nullable: true })
  value?: number;

  @Column('text', { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
