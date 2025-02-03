import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Package } from "./Package.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("tenants_details")
export class TenantDetail {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "date", nullable: false })
  license_start!: Date;

  @Column({ type: "date", nullable: false })
  license_expired!: Date;

  @Column({ type: "smallint", nullable: true })
  months?: number;

  @Column({ type: "float", default: 0 })
  total_price?: number = 0;

  @Column({ type: "boolean", default: false })
  is_active?: boolean = false;

  @Column({ type: "uuid" })
  package_id!: string;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @ManyToOne(() => Package, (pkg) => pkg.id, { onDelete: "CASCADE" })
  package?: Package;

  @ManyToOne(() => Tenant, (tenant) => tenant.details, { onDelete: "CASCADE" })
  tenant?: Tenant;
}
