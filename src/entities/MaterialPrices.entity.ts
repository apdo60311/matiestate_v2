import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Material } from './Material.entity';
import { Tenant } from './Tenant.entity';
import { Currency } from './Currency.entity';
import { v4 as uuidv4 } from 'uuid';


@Entity('material_prices')
export class MaterialPrices {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @Column({ type: 'uuid' })
  material_id!: string;

  @Column({ type: 'uuid', nullable: true })
  currency_id?: string;

  @Column({ type: 'float', nullable: true })
  currency_val?: number;

  @Column({ type: 'float' })
  vat_rate!: number;

  @Column({ type: 'float', nullable: true })
  average_purchase?: number;

  @Column({ type: 'float', nullable: true })
  biggest_purchase?: number;

  @Column({ type: 'float', nullable: true })
  pricing_policy?: number;

  @Column({ type: 'date', nullable: true })
  purchase_date?: Date;

  @Column({ type: 'float', nullable: true })
  average_sales?: number;

  @Column({ type: 'float', nullable: true })
  largest_sales?: number;

  @Column({ type: 'float', nullable: true })
  last_price?: number;

  @Column({ type: 'date', nullable: true })
  sales_date?: Date;

  @Column({ type: 'uuid' })
  tenant_id!: string;

  @ManyToOne(() => Material, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Currency, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'currency_id' })
  currency?: Currency;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;
}
