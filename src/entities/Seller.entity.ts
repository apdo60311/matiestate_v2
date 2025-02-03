import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";

@Entity("seller")
export class Seller {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  nationality?: string;

  @Column({ type: "numeric", nullable: true })
  id_card?: number;

  @Column({ type: "numeric", nullable: true })
  passport?: number;

  @Column({ type: "numeric", nullable: true })
  work_card_number?: number;

  @Column({ type: "varchar", nullable: true })
  mobile?: string;

  @Column({ type: "varchar", nullable: true })
  cellPhone?: string;

  @Column({ type: "text", nullable: true })
  fax?: string;

  @Column({ type: "text", nullable: true })
  mailbox?: string;

  @Column({ type: "text", nullable: true })
  email?: string;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ type: "float" })
  minimum_commission!: number;

  @Column({ type: "float" })
  maximum_discount!: number;

  @Column({ type: "text", nullable: true })
  statement?: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
