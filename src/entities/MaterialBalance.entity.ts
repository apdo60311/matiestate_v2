import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { Store } from "./Store.entity";
import { v4 as uuidv4 } from "uuid";
import { Material } from "./Material.entity";

@Entity("material_balance")
export class MaterialBalance {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "uuid" })
  material_id!: string;

  @Column({ type: "uuid" })
  store_id!: string;

  @Column({ type: "varchar", nullable: true })
  unit1?: string;

  @Column({ type: "bigint", nullable: true })
  quality1?: number;

  @Column({ type: "varchar", nullable: true })
  unit2?: string;

  @Column({ type: "bigint", nullable: true })
  quality2?: number;

  @Column({ type: "varchar", nullable: true })
  unit3?: string;

  @Column({ type: "bigint", nullable: true })
  quality3?: number;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @ManyToOne(() => Material, { onDelete: "CASCADE" })
  @JoinColumn({ name: "material_id" })
  material!: Material;

  @ManyToOne(() => Store, { onDelete: "CASCADE" })
  @JoinColumn({ name: "store_id" })
  store!: Store;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
