import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from 'typeorm';
import { Manager } from './Manager.entity';
import { Admin } from './Admin.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @Column({ type: 'bigint', generated: 'identity' })
  number!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column({ type: 'integer', nullable: true })
  user_type?: number;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  email?: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @Column({ type: 'text', nullable: true })
  token?: string;

  @Column({ type: 'boolean', nullable: true })
  is_verified?: boolean;

  @OneToMany(() => Manager, (manager) => manager.member)
  managers!: Manager[];

  @OneToMany(() => Admin, (admin) => admin.member)
  admins!: Admin[];
}
