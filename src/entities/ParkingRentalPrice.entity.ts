import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Parking } from './Parking.entity';
import { Currency } from './Currency.entity';
import { Tenant } from './Tenant.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('parking_rental_price')
export class ParkingRentalPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @Column('date', { nullable: true })
  date?: Date;

  @Column('numeric')
  price!: number;

  @Column('text', { nullable: true })
  note?: string;

  @Column('int', { nullable: true })
  number?: number;

  @ManyToOne(() => Parking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parking_id' })
  parking!: Parking;

  @ManyToOne(() => Currency, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'currency_id' })
  currency?: Currency;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}