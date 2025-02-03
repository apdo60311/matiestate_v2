import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Building } from "./Building.entity";
import { Account } from "./Account.entity";
import { User } from "./User.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

export enum ServiceCode {
  CODE1 = 1,
  CODE2 = 2,
  CODE3 = 3,
}

export enum ServiceStatus {
  STATUS1 = 1,
  STATUS2 = 2,
  STATUS3 = 3,
  STATUS4 = 4,
  STATUS5 = 5,
  STATUS6 = 6,
  STATUS7 = 7,
  STATUS8 = 8,
}

export enum UnitType {
  TYPE1 = 1,
  TYPE2 = 2,
  TYPE3 = 3,
  TYPE4 = 4,
  TYPE5 = 5,
}

@Entity("service")
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column("serial")
  number!: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date = new Date(new Date().getTime());

  @Column("timestamp", { nullable: true })
  start_date?: Date;

  @Column("timestamp", { nullable: true })
  end_date?: Date;

  @Column("uuid", { nullable: true })
  unit_id?: string;

  @Column("int", { nullable: true })
  unit_type?: UnitType;

  @Column("float8", { default: 0 })
  total: number = 0;

  @Column("int", { default: 1 })
  code: ServiceCode = ServiceCode.CODE1;

  @Column("int", { default: 1 })
  status: ServiceStatus = ServiceStatus.STATUS1;

  @Column("smallint", { nullable: true })
  payment_method?: number;

  @ManyToOne(() => Building, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "building_id" })
  building?: Building;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "supervisor_user_id" })
  supervisor?: User;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: "owner_account_id" })
  owner?: Account;
}
