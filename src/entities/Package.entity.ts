import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("packages")
export class Package {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "integer", nullable: false })
  total_units_count!: number;

  @Column({ type: "float", nullable: false})
  unit_price!: number;

  @Column({ type: "boolean", default: true })
  available!: boolean;

  @Column({ type: "smallint", nullable: false })
  package!: number;

  @Column({ type: "text", nullable: false })
  package_name!: string;
}
