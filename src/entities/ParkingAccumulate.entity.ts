import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Parking } from "./Parking.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity('parking_accumulate')
export class ParkingAccumulate {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column("int", { nullable: true })
  number?: number;

  @ManyToOne(() => Parking, { onDelete: "CASCADE" })
  @JoinColumn({ name: "main_parking_id" })
  main_parking!: Parking;

  @ManyToOne(() => Parking, { onDelete: "CASCADE" })
  @JoinColumn({ name: "parking_id" })
  parking!: Parking;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
