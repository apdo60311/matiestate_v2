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
import { Currency } from "./Currency.entity";

@Entity("entry_main_data")
export class EntryMainData {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "uuid", name:'currency_id', nullable: true })
  currencyId?: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "float", default: 0 })
  debit!: number;

  @Column({ type: "float", default: 0 })
  credit!: number;

  @Column({ type: "smallint", default: 0 })
  difference!: number;

  @Column({ type: "float", name:'currency_val', nullable: true })
  currencyVal?: number;

  @Column({ type: "integer", name:'created_from', nullable: true })
  createdFrom?: number;

  @Column({ type: "uuid", name:'created_from_id', nullable: true })
  createdFromId?: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "boolean", nullable: true })
  is_deleted?: boolean;

  @Column({ type: "boolean", nullable: true })
  is_first_batch?: boolean;

  @Column({ type: "integer", nullable: true })
  created_from_code?: number;

  @Column({ type: "uuid", name:'tenant_id', nullable: true })
  tenantId?: string;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
