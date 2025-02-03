import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";

@Entity("property_values")
export class PropertyValues {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "numeric", nullable: true })
  area?: number;

  @Column({ type: "varchar", default: "" })
  area_unit!: string;

  @Column({ type: "text", nullable: true })
  view?: string;

  @Column({ type: "smallint", nullable: true })
  property_type?: number;

  @Column({ type: "numeric" })
  room_count!: number;

  @Column({ type: "varchar" })
  hex!: string;

  @Column({ type: "bigint" })
  row_index!: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "uuid" })
  building_id!: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
