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
import { Category } from "./Category.entity";

@Entity("default_service")
export class DefaultService {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column({ type: "integer", generated: "identity" })
  number!: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "double precision", default: 0 })
  price!: number;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @Column({ type: "text", nullable: true })
  picture?: string;

  @Column({ type: "boolean", default: true })
  display!: boolean;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "uuid" })
  category_id!: string;

  @Column({ type: "boolean", default: true })
  available!: boolean;

  @Column({ type: "integer", default: 0 })
  service_type!: number;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @Column({ type: "text", nullable: true })
  ltndescription?: string;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
