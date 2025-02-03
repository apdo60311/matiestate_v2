import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Member } from "./Member.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("managers")
export class Manager {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: "uuid", nullable: false })
  member_id!: string;

  @Column({ type: "smallint", default: 1 })
  role: number = 1;

  @ManyToOne(() => Member, (member) => member.managers, { onDelete: "CASCADE" })
  member!: Member;
}
