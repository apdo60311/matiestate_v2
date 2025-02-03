import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Shop } from "./Shop.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("shop_accumulate")
export class ShopAccumulate {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column("int", { nullable: true })
  number?: number;

  @ManyToOne(() => Shop, { onDelete: "CASCADE" })
  @JoinColumn({ name: "main_shop_id" })
  mainShop!: Shop;

  @ManyToOne(() => Shop, { onDelete: "CASCADE" })
  @JoinColumn({ name: "shop_id" })
  shop!: Shop;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
