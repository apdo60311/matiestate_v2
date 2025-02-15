import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Building } from "./Building.entity";
import { Tenant } from "./Tenant.entity";
import { CostCenter } from "./CostCenter.entity";
import { Account } from "./Account.entity";
import { PropertyValues } from "./PropertyValues.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("parking")
export class Parking {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @ManyToOne(() => Building, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_id" })
  building!: Building;

  @Column("text")
  parking_no!: string;

  @Column("text", { nullable: true })
  floor_no?: string;

  @Column("numeric", { nullable: true })
  area?: number;

  @Column("text", { nullable: true })
  area_unit?: string;

  @Column("smallint", { default: 1 })
  parking_kind: number = 1;

  @Column("text", { nullable: true })
  description?: string;

  @Column({type:'varchar', length:200, name: "view", nullable: true })
  view?: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "customer_id" })
  customer?: Account;

  @Column("boolean", { default: false })
  has_lawsuit: boolean = false;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: "cost_center_id" })
  cost_center?: CostCenter;

  @Column("date", { nullable: true })
  purchase_date?: Date;

  @Column("text", { nullable: true })
  note?: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "flat_owner_id" })
  flat_owner?: Account;

  @Column("bigint", { nullable: true })
  y_index?: number;

  @Column("bigint", { nullable: true })
  x_index?: number;

  @Column("varchar", { nullable: true })
  hex?: string;

  @ManyToOne(() => PropertyValues, { nullable: true })
  @JoinColumn({ name: "property_values_id" })
  property_values?: PropertyValues;

  @Column("int", { nullable: true })
  property_type?: number;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column("bigint", { nullable: true })
  row_index?: number;

  @Column("varchar", { nullable: true })
  asset_hash?: string;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: "main_cost_center_id" })
  main_cost_center?: CostCenter;

  @Column("bigint", { nullable: true })
  code?: number;

  @Column("boolean", { nullable: true })
  blocked?: boolean;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
