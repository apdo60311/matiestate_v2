import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Land } from "./Land.entity";
import { v4 as uuidv4 } from "uuid";
import { Currency } from "./Currency.entity";
import { Tenant } from "./Tenant.entity";

@Entity('land_rental_price')
export class LandRentalPrice {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @ManyToOne(() => Land, { onDelete: "CASCADE" })
  @JoinColumn({ name: "land_id" })
  land!: Land;

  @Column({ type: "date", nullable: true })
  date!: Date;

  @Column("numeric")
  price!: number;

  @ManyToOne(() => Currency, { onDelete: "SET NULL" })
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;

  @Column("text", { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;

  @Column("int", { nullable: true })
  number?: number;
}
