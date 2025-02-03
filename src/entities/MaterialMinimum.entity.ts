import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Material } from './Material.entity';
import { Store } from './Store.entity';
import { Tenant } from './Tenant.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('material_minimum')
export class MaterialMinimum {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @Column({ type: 'uuid' })
  material_id!: string;

  @Column({ type: 'uuid' })
  store_id!: string;

  @Column({ type: 'float' })
  minimum!: number;

  @Column({ type: 'float' })
  maximum!: number;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'uuid' })
  tenant_id!: string;

  @ManyToOne(() => Material, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store!: Store;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;
}
