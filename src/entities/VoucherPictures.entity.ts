import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { VoucherMainData } from "./VoucherMainData.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("voucher_pictures")
export class VoucherPictures {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @ManyToOne(() => VoucherMainData, { onDelete: "CASCADE" })
  @JoinColumn({ name: "voucher_main_data_id" })
  voucherMainData!: VoucherMainData;

  @Column({ type: "text" })
  picture!: string;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
