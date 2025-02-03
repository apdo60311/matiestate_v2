import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Material } from './Material.entity';
import { Tenant } from './Tenant.entity';
import { v4 as uuidv4 } from 'uuid';


@Entity('material_prices_details')
export class MaterialPricesDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @Column({ type: 'uuid' })
  material_id!: string;

  @Column({ type: 'int' })
  price_type!: number;

  @Column({ type: 'float', nullable: true })
  unit1?: number;

  @Column({ type: 'float', nullable: true })
  unit2?: number;

  @Column({ type: 'float', nullable: true })
  unit3?: number;

  @Column({ type: 'uuid' })
  tenant_id!: string;

  @ManyToOne(() => Material, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;
}
