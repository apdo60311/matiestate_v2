import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Member } from "./Member.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "uuid" })
  member_id!: string;

  @Column({ type: "smallint", default: 1 })
  role?: number;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @ManyToOne(() => Member, (member) => member.admins, { onDelete: "CASCADE" })
  member?: Member;

  @ManyToOne(() => Tenant, (tenant) => tenant.admins, { onDelete: "CASCADE" })
  tenant?: Tenant;
}
