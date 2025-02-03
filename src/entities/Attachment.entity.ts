import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("attachments")
export class Attachment {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @Column({ type: "text" })
  entity_type!: string;

  @Column({ type: "text" })
  attachment_type!: string;

  @Column({ type: "text" })
  file_name!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  upload_timestamp: Date = new Date(new Date().getTime());

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @Column({ type: "uuid" })
  entity_id!: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
