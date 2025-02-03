import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Service } from "./Service.entity";
import { Tenant } from "./Tenant.entity";
import { LackReason } from "./LackReason.entity";
import { User } from "./User.entity";
import { v4 as uuidv4 } from "uuid";

@Entity('service_lack_reason')
export class ServiceLackReason {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column("date")
  paused_date!: Date;

  @Column("date", { nullable: true })
  continue_date?: Date;

  @Column("int")
  lack_reason_code!: number;

  @ManyToOne(() => Service)
  @JoinColumn({ name: "service_id" })
  service!: Service;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @ManyToOne(() => LackReason, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "lack_reason_id" })
  lack_reason?: LackReason;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "worker_user_id" })
  worker?: User;
}
