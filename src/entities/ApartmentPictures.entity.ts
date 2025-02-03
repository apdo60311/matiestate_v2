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


@Entity('apartment_pictures')
export class ApartmentPictures {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @ManyToOne(() => Apartment, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'apartment_id' })
  apartment?: Apartment;

  @Column('bytea', { nullable: true })
  picture?: Buffer;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
