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

@Entity("shop_rental_price")
export class ShopRentalPrice {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column({ type: "timestamptz", default: () => "NOW()" })
  date?: Date;

  @ManyToOne(() => Shop, { onDelete: "CASCADE" })
  @JoinColumn({ name: "shop_id" })
  shop!: Shop;

  @Column("real", { nullable: true })
  price?: number;

  @ManyToOne(() => Currency, { nullable: true })
  @JoinColumn({ name: "currency_id" })
  currency?: Currency;

  @Column("real", { nullable: true })
  cost_price?: number;

  @ManyToOne(() => Currency, { nullable: true })
  @JoinColumn({ name: "cost_currency_id" })
  cost_currency?: Currency;

  @Column("real", { nullable: true })
  rent?: number;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @Column("int", { nullable: true })
  number?: number;
}
