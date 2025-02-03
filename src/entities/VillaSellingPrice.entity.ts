import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Villa } from "./Villa.entity";
import { Currency } from "./Currency.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("villa_selling_price")
export class VillaSellingPrice {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @ManyToOne(() => Villa, { onDelete: "CASCADE" })
  @JoinColumn({ name: "villa_id" })
  villa!: Villa;

  @Column({ type: "date", nullable: true })
  date?: Date;

  @Column({ type: "double precision", nullable: true })
  price?: number;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @Column({ type: "int", nullable: true })
  number?: number;
}
