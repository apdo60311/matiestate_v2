import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "text", nullable: false })
  customer_phone!: string;

  @Column({ type: "text", nullable: false })
  customer_name!: string;

  @Column({ type: "text", nullable: false })
  company_name!: string;

  @Column({ type: "text", nullable: false })
  company_email!: string;

  @Column({ type: "text", nullable: false })
  company_phone!: string;

  @Column({ type: "smallint", default: 1 })
  status!: number;

  @OneToMany(() => Tenant, (tenant) => tenant.company)
  tenants!: Tenant[];
}
