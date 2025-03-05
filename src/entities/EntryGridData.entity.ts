import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  import { Account } from './Account.entity';
  import { Tenant } from './Tenant.entity';
  import { CostCenter } from './CostCenter.entity';
  import { Currency } from './Currency.entity';
  import { EntryMainData } from './EntryMainData.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('entry_grid_data')
export class EntryGridData  {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date = new Date(new Date().getTime());

  @Column({ type: 'uuid', name: 'account_id' })
  accountId!: string;

  @Column({ type: 'real', name: 'debit', nullable: true, default: 0 })
  debit?: number = 0;

  @Column({ type: 'real', name: 'credit', nullable: true, default: 0 })
  credit?: number = 0;

  @Column({ type: 'uuid', name: 'currency_id', nullable: true })
  currencyId?: string;

  @Column({ type: 'uuid', name: 'cost_center_id', nullable: true })
  costCenterId?: string;

  @Column({ type: 'uuid', name: 'observe_account_id', nullable: true })
  observeAccountId?: string;

  @Column({ type: 'text', name: 'note', nullable: true })
  note?: string;

  @Column({ type: 'uuid', name: 'entry_main_data_id' })
  entryMainDataId!: string;

  @Column({ type: 'uuid', name: 'tenant_id', nullable: true })
  tenantId?: string;

  @Column({ type: 'real', name: 'currency_val', nullable: true })
  currencyVal?: number;


  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @ManyToOne(() => Currency, { nullable: true })
  @JoinColumn({ name: 'currency_id' })
  currency?: Currency;

  @ManyToOne(() => CostCenter, { nullable: true })
  @JoinColumn({ name: 'cost_center_id' })
  costCenter?: CostCenter;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'observe_account_id' })
  observeAccount?: Account;

  @ManyToOne(() => EntryMainData)
  @JoinColumn({ name: 'entry_main_data_id' })
  entryMainData!: EntryMainData;

  @ManyToOne(() => Tenant, { nullable: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Tenant;
}
