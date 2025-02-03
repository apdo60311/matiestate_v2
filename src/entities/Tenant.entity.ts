import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Company } from "./Company.entity";
import { TenantDetail } from "./TenantDetail.entity";
import { Admin } from "./Admin.entity";
import { v4 as uuidv4 } from "uuid";
import { AccountingVoucherPicture } from "./AccountingVoucherPicture.entity";

@Entity("tenants")
export class Tenant {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "bigint", generated: "identity" })
  number!: number;

  @Column({ type: "text", nullable: false })
  emirate!: string;

  @Column({ type: "text", nullable: false })
  address!: string;

  @Column({ type: "smallint", default: 1 })
  status: number = 1;

  @Column({ type: "uuid", nullable: false })
  company_id!: string;

  @ManyToOne(() => Company, (company) => company.tenants, {
    onDelete: "CASCADE",
  })
  company?: Company;

  @OneToMany(() => TenantDetail, (detail) => detail.tenant)
  details?: TenantDetail[];

  @OneToMany(() => Admin, (admin) => admin.tenant)
  admins?: Admin[];

  @OneToMany(() => AccountingVoucherPicture, (picture) => picture.tenant)
  accountingVoucherPictures?: AccountingVoucherPicture[];
}
