import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
  Check,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";
import { User } from "./User.entity";
import { Service } from "./Service.entity";

@Entity("worker_rate")
export class WorkerRate {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date = new Date(new Date().getTime());

  @Column("text", { nullable: true })
  description?: string;

  @Column("int")
  @Check("rating_check", "rating >= 1 AND rating <= 5")
  rating!: number;

  @ManyToOne(() => Service)
  @JoinColumn({ name: "service_id" })
  service!: Service;

  @ManyToOne(() => User)
  @JoinColumn({ name: "customer_user_id" })
  customer!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "worker_user_id" })
  worker!: User;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
