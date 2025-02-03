import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";
import { MaterialGroup } from "./MaterialGroup.entity";
import { Category } from "./Category.entity";

@Entity("material")
export class Material {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "boolean", default: false })
  defaults1: boolean = false;

  @Column({ type: "varchar", nullable: true })
  unit1?: string;

  @Column({ type: "varchar", nullable: true })
  barcode1?: string;

  @Column({ type: "varchar", nullable: true })
  unit2?: string;

  @Column({ type: "int", nullable: true })
  exchange2?: number;

  @Column({ type: "varchar", nullable: true })
  barcode2?: string;

  @Column({ type: "boolean", default: false })
  defaults2: boolean = false;

  @Column({ type: "varchar", nullable: true })
  unit3?: string;

  @Column({ type: "int", nullable: true })
  exchange3?: number;

  @Column({ type: "varchar", nullable: true })
  barcode3?: string;

  @Column({ type: "boolean", default: false })
  defaults3: boolean = false;

  @Column({ type: "bigint" })
  code!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "uuid" })
  material_group_id!: string;

  @Column({ type: "varchar", nullable: true })
  note?: string;

  @Column({ type: "int" })
  material_type!: number;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @Column({ type: "uuid", nullable: true })
  category_id?: string;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  // Relationships
  @ManyToOne(() => MaterialGroup, { onDelete: "CASCADE" })
  @JoinColumn({ name: "material_group_id" })
  materialGroup!: MaterialGroup;

  @ManyToOne(() => Category, { onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
