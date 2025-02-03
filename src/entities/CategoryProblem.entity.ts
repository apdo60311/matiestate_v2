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

@Entity("category_problem")
export class CategoryProblem {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "uuid" })
  category_id!: string;

  @Column({ type: "boolean", default: true })
  is_available!: boolean;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "bigint", default: 30 })
  minutes!: number;

  @Column({ type: "text", nullable: true })
  ltndescription?: string;

  @Column({ type: "integer", default: 0 })
  price!: number;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
