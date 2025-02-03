import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";

@Entity("material_group")
export class MaterialGroup {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "uuid", nullable: true })
  parent_id?: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @ManyToOne(() => MaterialGroup, { onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_id" })
  parent?: MaterialGroup;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
