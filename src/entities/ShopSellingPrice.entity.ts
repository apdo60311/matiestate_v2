import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Shop } from "./Shop.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";
import { Currency } from "./Currency.entity";

@Entity("shop_selling_price")
export class ShopSellingPrice {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column("date")
  date!: Date;

  @ManyToOne(() => Shop, { onDelete: "CASCADE" })
  @JoinColumn({ name: "shop_id" })
  shop!: Shop;

  @Column("real", { nullable: true })
  price?: number;

  @ManyToOne(() => Currency, { onDelete: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @Column("text", { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @Column("int", { nullable: true })
  number?: number;
}
