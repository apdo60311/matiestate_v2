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
import { Land } from "./Land.entity";
  


@Entity('land_wallet')
export class LandWallet {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column('text')
  number!: string;

  @ManyToOne(() => Land, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'land_id' })
  land!: Land;

  @Column('float8', { nullable: true })
  main_cost?: number;

  @Column('float8', { nullable: true })
  expense?: number;

  @Column('date', { nullable: true })
  begin_date?: Date;

  @Column('date', { nullable: true })
  sale_date?: Date;

  @Column('float8', { nullable: true })
  sale_value?: number;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
