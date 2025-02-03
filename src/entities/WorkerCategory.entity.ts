import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { User } from "./User.entity";
import { Category } from "./Category.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("worker_category")
@Unique(["user_id", "category_id"])
export class WorkerCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
