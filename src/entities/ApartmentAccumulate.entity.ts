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
  

@Entity('apartment_accumulate')
export class ApartmentAccumulate {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @Column('int', { nullable: true })
  number?: number;

  @ManyToOne(() => Apartment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'main_apartment_id' })
  main_apartment!: Apartment;

  @ManyToOne(() => Apartment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'apartment_id' })
  apartment!: Apartment;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;
}
