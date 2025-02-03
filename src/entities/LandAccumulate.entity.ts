import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Land } from "./Land.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("land_accumulate")
export class LandAccumulate {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column({ type: "int", nullable: true })
  number?: number;

  @Column({ type: "uuid" })
  main_land_id!: string;

  @Column({ type: "uuid" })
  land_id!: string;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @ManyToOne(() => Land, { onDelete: "CASCADE" })
  @JoinColumn({ name: "main_land_id" })
  mainLand!: Land;

  @ManyToOne(() => Land, { onDelete: "CASCADE" })
  @JoinColumn({ name: "land_id" })
  land!: Land;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
