import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";

@Entity("maintenance_setting")
export class MaintenanceSetting {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "smallint", nullable: true })
  hours_count?: number;

  @Column({ type: "smallint", nullable: true })
  start_hours?: number;

  @Column({ type: "smallint", nullable: true })
  each_time?: number;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
