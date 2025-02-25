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

@Entity("shop_fixed_assets")
export class ShopFixedAssets {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column("uuid", { nullable: true })
  assets_id?: string;

  @Column("real", { nullable: true })
  value?: number;

  @Column("text", { nullable: true })
  note?: string;

  @ManyToOne(() => Shop, { onDelete: "CASCADE" })
  @JoinColumn({ name: "shop_id" })
  shop!: Shop;

  @Column("uuid", { nullable: true })
  shop_id?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
