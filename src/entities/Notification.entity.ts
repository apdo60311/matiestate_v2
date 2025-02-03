import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from './Tenant.entity';
import { User } from './User.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date = new Date(new Date().getTime());

  @Column('text', { nullable: true })
  title?: string;

  @Column('text')
  body!: string;

  @Column('text', { nullable: true })
  url?: string;

  @Column('text', { nullable: true })
  entity?: string;

  @Column('text', { nullable: true })
  target?: string;

  @Column('boolean', { default: false })
  status: boolean = false;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;
}