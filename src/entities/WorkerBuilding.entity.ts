import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";
import { Account } from "./Account.entity";
import { CostCenter } from "./CostCenter.entity";
import { VoucherMainData } from "./VoucherMainData.entity";
import { User } from "./User.entity";
import { Building } from "./Building.entity";

@Entity("worker_building")
export class WorkerBuilding {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Building, { onDelete: "CASCADE" })
  @JoinColumn({ name: "building_id" })
  building!: Building;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant!: Tenant;

  @Unique(["user", "building"])
  @Column()
  user_building_unique!: string;
}
