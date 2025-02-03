import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "uuid", nullable: true })
  parent_id?: string;

  @Column({ type: "text", nullable: true })
  image?: string;

  @Column({ type: "text", nullable: true })
  hex?: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @ManyToOne(() => Category, (category) => category.children, {
    onDelete: "CASCADE",
  })
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children?: Category[];

  @Column({ type: "uuid", nullable: true })
  tenant_id!: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.id, { onDelete: "CASCADE" })
  tenant!: Tenant;
}
