import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { v4 as uuidv4 } from "uuid";
  import { Tenant } from "./Tenant.entity";
import { Apartment } from "./Apartment.entity";
import { Currency } from "./Currency.entity";


@Entity('apartment_rental_price')
export class ApartmentRentalPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @ManyToOne(() => Apartment, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'apartment_id' })
  apartment?: Apartment;

  @Column('date', { nullable: true })
  date?: Date;

  @Column('numeric', { nullable: true })
  price?: number;

  @ManyToOne(() => Currency, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'currency_id' })
  currency?: Currency;

  @Column('text', { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;

  @Column('int', { nullable: true })
  number?: number;
}
