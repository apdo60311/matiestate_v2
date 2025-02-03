import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './Account.entity';
import { Tenant } from './Tenant.entity';
import { v4 as uuidv4 } from 'uuid';


@Entity('owner')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @Column({ type: 'text', nullable: true })
  id_card?: string;

  @Column({ type: 'text', nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  cell_phone?: string;

  @Column({ type: 'text', nullable: true })
  fax?: string;

  @Column({ type: 'text', nullable: true })
  mailbox?: string;

  @Column({ type: 'text', nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'text', nullable: true })
  nationality?: string;

  @Column({ type: 'bigint', generated: 'identity' })
  number!: number;

  @Column({ type: 'uuid', nullable: true })
  account_id?: string;

  @Column({ type: 'text', unique: true })
  name!: string;

  @Column({ type: 'uuid', nullable: true })
  tenant_id?: string;

  @Column({ type: 'text', nullable: true })
  ltnname?: string;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
