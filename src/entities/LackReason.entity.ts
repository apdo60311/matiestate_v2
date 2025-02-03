import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tenant } from "./Tenant.entity";

@Entity("lack_reasons")
export class LackReason {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "text", nullable: false })
  reason!: string;

  @Column({ type: "boolean", default: true })
  available?: boolean;

  @Column({ type: "int4", nullable: false })
  code!: number;

  @Column({ type: "uuid", nullable: false })
  tenant_id!: string;

  @Column({ type: "text", nullable: true })
  ltnreason?: string;

  @OneToOne(() => Tenant)
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;
}
