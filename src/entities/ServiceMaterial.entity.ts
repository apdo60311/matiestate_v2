import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from './Service.entity';
import { Material } from './Material.entity';
import { Tenant } from './Tenant.entity';
import { User } from './User.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('service_material')
export class ServiceMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date(new Date().getTime());

  @Column('real', { default: 0 })
  price: number = 0;

  @Column('int', { default: 1 })
  quantity: number = 1;

  @Column('int', { default: 1, nullable: true })
  status?: number = 1;

  @Column('text', { nullable: true })
  name?: string;

  @Column('text', { nullable: true })
  ltnname?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'worker_user_id' })
  worker?: User;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service!: Service;

  @ManyToOne(() => Material, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'material_id' })
  material?: Material;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'supervisor_user_id' })
  supervisor?: User;
}