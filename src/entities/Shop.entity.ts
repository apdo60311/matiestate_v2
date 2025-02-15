import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Building } from "./Building.entity";
import { CostCenter } from "./CostCenter.entity";
import { Account } from "./Account.entity";
import { PropertyValues } from "./PropertyValues.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("shop")
export class Shop {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column("text")
  shop_no!: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("bigint", { nullable: true })
  x_index?: number;

  @Column("bigint", { nullable: true })
  y_index?: number;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "cost_center_id" })
  cost_center?: CostCenter;

  @Column("text", { nullable: true })
  kind?: string;

  @Column("numeric", { nullable: true })
  area?: number;

  @Column("text", { nullable: true })
  area_unit?: string;

  @Column({type:"varchar", length: 200, name: "view", nullable: true })
  view?: string;

  @Column("text", { nullable: true })
  license1?: string;

  @Column("text", { nullable: true })
  license2?: string;

  @Column("text", { nullable: true })
  unified_num?: string;

  @Column("boolean", { default: false })
  has_lawsuit: boolean = false;

  @Column("text", { nullable: true })
  water_meter?: string;

  @Column("text", { nullable: true })
  electricity_meter?: string;

  @Column("text", { nullable: true })
  bond_type?: string;

  @Column("text", { nullable: true })
  bond_no?: string;

  @Column("date", { nullable: true })
  bond_date?: Date;

  @Column("text", { nullable: true })
  note?: string;

  @Column("varchar", { nullable: true })
  hex?: string;

  @Column("text", { nullable: true })
  floort_no?: string;

  @Column("int", { nullable: true })
  property_type?: number;

  @Column({ type: "bigint", generated: "identity" })
  number?: number;

  @Column("bigint", { nullable: true })
  row_index?: number;

  @Column("varchar", { nullable: true })
  asset_hash?: string;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "main_cost_center_id" })
  main_cost_center?: CostCenter;

  @Column("int", { nullable: true })
  shop_kind?: number;

  @Column("bigint", { nullable: true })
  code?: number;

  @Column("boolean", { nullable: true })
  blocked?: boolean;

  @Column("text", { nullable: true })
  floor_no?: string;

  @ManyToOne(() => Building, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_id" })
  building!: Building;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "customer_id" })
  customer?: Account;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "customer_owner_id" })
  customer_owner?: Account;

  @ManyToOne(() => PropertyValues, { nullable: true })
  @JoinColumn({ name: "property_values_id" })
  property_values?: PropertyValues;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
