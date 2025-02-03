import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Currency } from "./Currency.entity";
import { Villa } from "./Villa.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("villa_rental_price")
export class VillaRentalPrice {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "uuid" })
  villa_id!: string;

  @Column({ type: "date", nullable: true })
  date?: Date;

  @Column({ type: "double precision", nullable: true })
  price?: number;

  @Column({ type: "uuid", nullable: true })
  currency_id?: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "int", nullable: true })
  number?: number;

  @ManyToOne(() => Villa, { onDelete: "CASCADE" })
  @JoinColumn({ name: "villa_id" })
  villa!: Villa;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
