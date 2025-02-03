import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Seller } from "./Seller.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("logs")
export class Logs {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "uuid" })
  seller_id!: string;

  @Column({ type: "text" })
  note!: string;

  @Column({ type: "text" })
  operation!: string;

  @Column({ type: "text" })
  table_name!: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @ManyToOne(() => Seller, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seller_id" })
  seller!: Seller;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
