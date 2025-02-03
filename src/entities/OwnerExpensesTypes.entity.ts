import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";

@Entity("owner_expenses_types")
export class OwnerExpensesTypes {
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

  @Column({ type: "uuid" })
  tenant_id!: string;

  @Column({ type: "varchar", nullable: true })
  code?: string;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
