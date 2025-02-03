import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Material } from './Material.entity';
import { Tenant } from './Tenant.entity';
import { v4 as uuidv4 } from 'uuid';


@Entity('material_specifications')
export class MaterialSpecifications {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @Column({ type: 'uuid' })
  material_id!: string;

  @Column({ type: 'text' })
  specification!: string;

  @Column({ type: 'float' })
  value!: number;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'uuid' })
  tenant_id!: string;

  @ManyToOne(() => Material, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;
}
