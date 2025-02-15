import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tenant } from "./Tenant.entity";
import { Building } from "./Building.entity";

@Entity("lessor")
export class Lessor {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ type: "numeric", nullable: false })
  passport!: number;

  @Column({ type: "numeric", nullable: true })
  id_card?: number;

  @Column({ type: "numeric", nullable: true })
  lessor_card?: number;

  @Column({ type: "numeric", nullable: true })
  cell_phone?: number;

  @CreateDateColumn({ type: "timestamptz", nullable: true })
  passport_expiry_date?: Date;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ type: "text", nullable: true })
  nationality?: string;

  @Column({ type: "text", nullable: true })
  fax?: string;

  @Column({ type: "text", nullable: true })
  mailbox?: string;

  @Column({ type: "text", nullable: true })
  email?: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "numeric", nullable: true })
  mobile?: number;

  @Column({ type: "text", nullable: true })
  role?: string;

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "text", nullable: true })
  ltnname?: string;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @OneToOne(() => Tenant)
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;

  @OneToMany(() => Building, (building) => building.lessor)
  buildings?: Building[];
}
