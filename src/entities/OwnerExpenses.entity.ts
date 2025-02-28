import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Building } from './Building.entity';
import { Owner } from './Owner.entity';
import { Tenant } from './Tenant.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('owner_expenses')
export class OwnerExpenses {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuidv4().toString();

  @Column('date', { nullable: true })
  date?: Date;

  @Column({ type: 'bigint', generated: 'identity' })
  number!: number;

  @Column('text', { nullable: true })
  receipt_number?: string;

  @ManyToOne(() => Building, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'building_id' })
  building!: Building;

  @ManyToOne(() => Owner, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner!: Owner;

  @Column('uuid', {nullable: false})
  owner_id!: string;

  @Column('text', { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;
}