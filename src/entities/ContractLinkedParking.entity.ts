import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from "typeorm";
  import { v4 as uuidv4 } from "uuid";
  import { Tenant } from "./Tenant.entity";
import { Account } from "./Account.entity";
import { Contract } from "./Contract.entity";
import { Building } from "./Building.entity";


@Entity('contract_linked_parking')
export class ContractLinkedParking {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4().toString();
  
    @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @ManyToOne(() => Building, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'building_id' })
  building?: Building;

  @ManyToOne(() => Account, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'main_contract_id' })
  main_contract?: Contract;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
