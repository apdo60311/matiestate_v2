import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Bill } from "./Bill.entity";
import { Material } from "./Material.entity";
import { Tenant } from "./Tenant.entity";

@Entity({ name: "bill_material_details" })
export class BillMaterialDetail {
  @PrimaryGeneratedColumn("uuid") 
  id: string = uuidv4().toString();

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" }) 
  createdAt?: Date;

  @Column({
    name: "number",
    type: "bigint",
    generated: "increment", 
  })
  number?: number;

  @Column({ type: "uuid" }) 
  billId!: string;

  @ManyToOne(() => Bill,  {
    onDelete: "CASCADE",
  })
  bill!: Bill;

  @Column({ type: "uuid" }) 
  materialId!: string;

  @ManyToOne(() => Material, {
    onDelete: "CASCADE",
  })
  material!: Material;

  @Column({ type: "int", name: "quantity" }) 
  quantity!: number;

  @Column({ type: "float", name: "unit_price" }) 
  unitPrice!: number;

  @Column({ type: "float", name: "total_price" }) 
  totalPrice!: number;

  @Column({ type: "text", name: "note", nullable: true }) 
  note?: string;

  @Column({ type: "uuid", name: "tenant_id" }) 
  tenantId!: string;

  @ManyToOne(() => Tenant, {
    onDelete: "CASCADE",
  })
  tenant!: Tenant;

}
