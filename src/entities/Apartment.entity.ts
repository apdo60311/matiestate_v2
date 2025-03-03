import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Building } from "./Building.entity";
import { CostCenter } from "./CostCenter.entity";
import { PropertyValues } from "./PropertyValues.entity";
import { Currency } from "./Currency.entity";
import { Tenant } from "./Tenant.entity";

@Entity("apartment")
export class Apartment {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @ManyToOne(() => Building, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_id" })
  building!: Building;

  @Column({ type:'uuid', nullable:false})
  building_id!: string;

  @Column("varchar", { nullable: true })
  apartment_no?: string;

  @Column("text", { nullable: true })
  floor_no?: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("text", { nullable: true })
  category?: string;

  @Column("numeric", { nullable: true })
  area?: number;

  @Column("varchar", { default: "" })
  area_unit?: string;

  @Column({ type:'varchar', length:255, name: "view", nullable: true })
  view?: string;

  @Column("bigint", { nullable: true })
  bathroom_count?: number;

  @Column("bigint", { nullable: true })
  balcony_count?: number;

  @Column("boolean", { default: false })
  has_lawsuit: boolean = false;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: "main_cost_center_id" })
  main_cost_center?: CostCenter;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: "cost_center_id" })
  cost_center?: CostCenter;

  @Column("text", { nullable: true })
  property_type?: string;

  @Column("text", { nullable: true })
  water_meter?: string;

  @Column("text", { nullable: true })
  electricity_meter?: string;

  @Column("text", { nullable: true })
  statement?: string;

  @Column("bigint", { nullable: true })
  x_index?: number;

  @Column("bigint", { nullable: true })
  y_index?: number;

  @Column("numeric", { nullable: true })
  room_count?: number;

  @ManyToOne(() => PropertyValues, { nullable: true })
  @JoinColumn({ name: "property_values_id" })
  property_values?: PropertyValues;

  @Column("uuid", { nullable: true })
  property_values_id?: string;

  @Column("varchar", { nullable: true })
  hex?: string;

  @Column("float8", { nullable: true })
  cost_price?: number;

  @Column("float8", { nullable: true })
  amount_paid?: number;

  @ManyToOne(() => Currency, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "cost_currency_id" })
  cost_currency?: Currency;

  @Column("text", { nullable: true })
  note?: string;

  @Column("bigint", { default: 1 })
  apartment_kind: number = 1;

  @Column("bigint", { nullable: true })
  row_index?: number;

  @Column("varchar", { nullable: true })
  asset_hash?: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column("bigint", { nullable: true })
  code?: number;

  @Column("boolean", { nullable: true })
  blocked?: boolean;

  @Column("text", { nullable: true })
  kind?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
