import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Account } from "./Account.entity";
import { CostCenter } from "./CostCenter.entity";
import { Lessor } from "./Lessor.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("villa")
export class Villa {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "text" })
  complex_name!: string;

  @Column({ type: "text" })
  villa_no!: string;

  @Column({ type: "text", nullable: true })
  emirate?: string;

  @Column({ type: "text", nullable: true })
  area?: string;

  @Column({ type: "text", nullable: true })
  suburb?: string;

  @Column({ type: "text", nullable: true })
  street?: string;

  @Column({ type: "text", nullable: true })
  doc_type?: string;

  @Column({ type: "text", nullable: true })
  doc_no?: string;

  @Column({ type: "date", nullable: true })
  doc_date?: Date;

  @Column({ type: "text", nullable: true })
  piece_no?: string;

  @Column({ type: "text", nullable: true })
  basin_no?: string;

  @Column({ type: "int", nullable: true })
  water_meter?: number;

  @Column({ type: "int", nullable: true })
  electricity_meter?: number;

  @Column({ type: "uuid", nullable: true })
  owner_account_id?: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "uuid", nullable: true })
  villa_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  cost_center_id?: string;

  @Column({ type: "uuid", nullable: true })
  account_bank_villa_id?: string;

  @Column({ type: "uuid", nullable: true })
  cash_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  insurance_account_id?: string;

  @Column({ type: "uuid", nullable: true })
  lessor_id?: string;

  @Column({ type: "uuid", nullable: true })
  assets_id?: string;

  @Column({ type: "double precision", nullable: true })
  value?: number;

  @Column({ type: "text", nullable: true })
  statement?: string;

  @Column({ type: "text", nullable: true })
  wall?: string;

  @Column({ type: "text", nullable: true })
  wall_state?: string;

  @Column({ type: "int", nullable: true })
  lighting_count?: number;

  @Column({ type: "int", nullable: true })
  parking_count?: number;

  @Column({ type: "text", nullable: true })
  parking_area?: string;

  @Column({ type: "text", nullable: true })
  parking_shaded?: string;

  @Column({ type: "int", nullable: true })
  pool_count?: number;

  @Column({ type: "text", nullable: true })
  pool_state?: string;

  @Column({ type: "text", nullable: true })
  pool_system?: string;

  @Column({ type: "int", nullable: true })
  play_ground_count?: number;

  @Column({ type: "text", nullable: true })
  play_ground_area?: string;

  @Column({ type: "int", nullable: true })
  garden_count?: number;

  @Column({ type: "text", nullable: true })
  garden_area?: string;

  @Column({ type: "text", nullable: true })
  garden_state?: string;

  @Column({ type: "int", nullable: true })
  floor_count?: number;

  @Column({ type: "int", nullable: true })
  balcony_count?: number;

  @Column({ type: "int", nullable: true })
  room_count?: number;

  @Column({ type: "int", nullable: true })
  service_room_count?: number;

  @Column({ type: "int", nullable: true })
  other_room_count?: number;

  @Column({ type: "int", nullable: true })
  bath_room_count?: number;

  @Column({ type: "text", nullable: true })
  stairs_internal?: string;

  @Column({ type: "text", nullable: true })
  room_state?: string;

  @Column({ type: "text", nullable: true })
  land_area?: string;

  @Column({ type: "text", nullable: true })
  land_area_building?: string;

  @Column({ type: "text", nullable: true })
  area_unit?: string;

  @Column({ type: "text", nullable: true })
  finishing_state?: string;

  @Column({ type: "text", nullable: true })
  security_system?: string;

  @Column({ type: "int2", nullable: true })
  security_type?: number;

  @Column({ type: "boolean", nullable: true })
  ban?: boolean;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "owner_account_id" })
  ownerAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "villa_account_id" })
  villaAccount?: Account;

  @ManyToOne(() => CostCenter, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cost_center_id" })
  costCenter?: CostCenter;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "account_bank_villa_id" })
  bankAccount?: Account;

  @ManyToOne(() => Account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cash_account_id" })
  cashAccount?: Account;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "insurance_account_id" })
  insuranceAccount?: Account;

  @ManyToOne(() => Lessor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "lessor_id" })
  lessor?: Lessor;
}
