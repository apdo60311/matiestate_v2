import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Land } from "./Land.entity";
import { Currency } from "./Currency.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("land_selling_price")
export class LandSellingPrice {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column("date")
  date!: Date;

  @Column("real", { nullable: true })
  price?: number;

  @Column("text", { nullable: true })
  note?: string;

  @Column("int", { nullable: true })
  number?: number;

  @ManyToOne(() => Land, { onDelete: "CASCADE" })
  @JoinColumn({ name: "land_id" })
  land!: Land;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
