import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("bank")
export class Bank {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
