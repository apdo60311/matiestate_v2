import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";

@Entity("store")
export class Store {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "integer" })
  type!: number;

  @Column({ type: "bigint", generated: "identity" })
  code!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ type: "text", nullable: true })
  warehouseman?: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "uuid", nullable: true })
  parent_id?: string;

  @Column({ type: "uuid", nullable: true })
  final_id?: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @ManyToOne(() => Store, { onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_id" })
  parent?: Store;

  @ManyToOne(() => Store, { onDelete: "CASCADE" })
  @JoinColumn({ name: "final_id" })
  final?: Store;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
