import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tenant } from "./Tenant.entity";
import { Lawsuit } from "./Lawsuit.entity";

@Entity("lawsuit_status")
export class LawsuitStatus {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column("date")
  date?: Date;

  @ManyToOne(() => Lawsuit, { onDelete: "CASCADE" })
  @JoinColumn({ name: "lawsuit_id" })
  lawsuit!: Lawsuit;

  @Column("text")
  status!: string;

  @Column("text", { nullable: true })
  statement?: string;

  @Column("boolean", { nullable: true })
  printed?: boolean;

  @Column("text", { nullable: true })
  user?: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE", nullable: true })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
