import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity("user_work_times")
export class UserWorkTimes {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "timestamptz" })
  work_time_start!: Date;

  @Column({ type: "timestamptz" })
  work_time_end!: Date;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "uuid" })
  tenant_id!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
