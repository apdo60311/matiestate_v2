import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category.entity';
import { CategoryProblem } from './CategoryProblem.entity';
import { Service } from './Service.entity';
import { Tenant } from './Tenant.entity';
import { User } from './User.entity';
import { v4 as uuidv4 } from 'uuid';

export enum WorkerStatus {
  STATUS1 = 1,
  STATUS2 = 2,
  STATUS3 = 3
}

@Entity('service_worker')
export class ServiceWorker {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @Column('text', { nullable: true })
  worker_notes?: string;

  @Column('int', { default: 1 })
  worker_status: WorkerStatus = WorkerStatus.STATUS1;

  @Column('bigint')
  total_minutes!: number;

  @Column('timestamp')
  booking_start_date!: Date;

  @Column('timestamp', { nullable: true })
  booking_end_date?: Date;

  @Column('timestamp', { nullable: true })
  booking_completed_date?: Date;

  @Column('time', { nullable: true })
  booking_start_time?: string;

  @Column('text', { nullable: true })
  description?: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'worker_user_id' })
  worker?: User;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service!: Service;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @ManyToOne(() => CategoryProblem, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_problem_id' })
  category_problem?: CategoryProblem;
}