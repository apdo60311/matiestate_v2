import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tenant } from "./Tenant.entity";
import { v4 as uuidv4 } from "uuid";
import { LawsuitExpenses } from "./LawsuitExpenses.entity";

@Entity("lawsuit_expenses_pictures")
export class LawsuitExpensesPictures {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Column({ type: "text" })
  picture!: string;

  @Column({ type: "bigint" })
  lawsuit_expenses_id!: number;

  @Column({ type: "uuid", nullable: true })
  tenant_id?: string;

  @ManyToOne(() => LawsuitExpenses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "lawsuit_expenses_id" })
  lawsuitExpense!: LawsuitExpenses;

  @ManyToOne(() => Tenant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tenant_id" })
  tenant?: Tenant;
}
