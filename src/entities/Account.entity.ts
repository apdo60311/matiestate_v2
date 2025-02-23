import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Currency } from "./Currency.entity";
import { v4 as uuidv4 } from "uuid";
@Entity("account")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "int", default: 1 })
  type: number = 1;

  @Column({ type: "uuid", nullable: true })
  parent_id?: string;

  @Column({ type: "uuid", nullable: true })
  final_id?: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "bigint", generated: "increment", unique: true })
  number?: number;

  @Column({ type: "varchar", unique: true, nullable: false })
  name!: string;

  @Column({ type: "bigint"})
  code!: number;

  @Column({ type: "int", nullable: true })
  level?: number;

  @Column({ type: "text", nullable: true })
  status?: string;

  @Column({ type: "float", nullable: true })
  currency_val?: number;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @Column({ type: "uuid", nullable: true })
  currency_id?: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @ManyToOne(() => Currency, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_id" })
  parent?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "final_id" })
  final?: Account;
}
