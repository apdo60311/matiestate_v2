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
import { Building } from "./Building.entity";
import { Parking } from "./Parking.entity";


@Entity('parking_wallet')
export class ParkingWallet {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column('text')
  number!: string;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @ManyToOne(() => Building, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'building_id' })
  building!: Building;

  @ManyToOne(() => Parking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parking_id' })
  parking!: Parking;

  @Column('float8')
  main_cost!: number;

  @Column('real', { nullable: true })
  expense?: number;

  @Column('date', { nullable: true })
  begin_date?: Date;

  @Column('date', { nullable: true })
  sale_date?: Date;

  @Column('float8', { nullable: true })
  sale_value?: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}

