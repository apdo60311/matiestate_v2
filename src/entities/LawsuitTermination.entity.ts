import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
  } from "typeorm";
  import { v4 as uuidv4 } from "uuid";
  import { Tenant } from "./Tenant.entity";
  import { Lawsuit } from "./Lawsuit.entity";


@Entity('lawsuit_termination')
export class LawsuitTermination {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4().toString();
  
    @Column('boolean')
  implementation_suspended!: boolean;

  @Column('date')
  implementation_suspended_date!: Date;

  @Column('text', { nullable: true })
  statement?: string;

  @Column('boolean', { nullable: true })
  lawsuit_terminated?: boolean;

  @Column('date', { nullable: true })
  lawsuit_terminated_date?: Date;

  @ManyToOne(() => Lawsuit, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lawsuit_id' })
  lawsuit!: Lawsuit;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
