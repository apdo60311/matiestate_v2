import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Generated,
    Unique,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  import { Account } from './Account.entity';
  import { Tenant } from './Tenant.entity';
  import { v4 as uuidv4 } from 'uuid';
  @Entity('contract_pattern')
  export class ContractPattern {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4().toString();
  
    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date = new Date(new Date().getTime());
  
    @Column({ type: 'smallint', name: 'contract_type' })
    contractType!: number;
  
    @Column({ type: 'bigint' })
    @Generated('increment')
    code!: string; 
  
    @Column({ type: 'text', name: 'name' })
    name!: string;
  
    @Column({ type: 'text', name: 'list_name', nullable: true })
    listName?: string;
  
    @Column({ type: 'text', name: 'shortcut_key', nullable: true, default: '' })
    shortcutKey?: string = '';
  
    @Column({ type: 'boolean', name: 'gen_entries', default: false })
    genEntries: boolean = false;
  
    @Column({ type: 'boolean', name: 'auto_gen_entries', default: false })
    autoGenEntries: boolean = false;
  
    @Column({ type: 'boolean', name: 'auto_transfer_entry', default: false })
    autoTransferEntry: boolean = false;
  
    @Column({ type: 'smallint', name: 'record_date_created' })
    recordDateCreated!: number;
  
    @Column({ type: 'boolean', name: 'new_contract_without_terminating', default: false })
    newContractWithoutTerminating: boolean = false;
  
    @Column({ type: 'boolean', name: 'insurance_required', default: false })
    insuranceRequired: boolean = false;
  
    @Column({ type: 'uuid', name: 'default_revenue_account_id', nullable: true })
    defaultRevenueAccountId?: string;
  
    @Column({ type: 'uuid', name: 'default_commission_from_client_account_id', nullable: true })
    defaultCommissionFromClientAccountId?: string;
  
    @Column({ type: 'uuid', name: 'default_commission_from_owner_account_id', nullable: true })
    defaultCommissionFromOwnerAccountId?: string;
  
    @Column({ type: 'uuid', name: 'default_contract_price_revenue_account_id', nullable: true })
    defaultContractPriceRevenueAccountId?: string;
  
    @Column({ type: 'uuid', name: 'default_contract_ratification_revenue_account_id', nullable: true })
    defaultContractRatificationRevenueAccountId?: string;
  
    @Column({ type: 'uuid', name: 'default_fines_revenue_account_id', nullable: true })
    defaultFinesRevenueAccountId?: string;
  
    @Column({ type: 'uuid', name: 'default_fee_revenue_account_id', nullable: true })
    defaultFeeRevenueAccountId?: string;
  
    @Column({ type: 'uuid', name: 'default_discount_account_id', nullable: true })
    defaultDiscountAccountId?: string;
  
    @Column({ type: 'real', name: 'default_commission_from_client_percentage', nullable: true })
    defaultCommissionFromClientPercentage?: number;
  
    @Column({ type: 'uuid', name: 'default_insurance_account_id', nullable: true })
    defaultInsuranceAccountId?: string;
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_revenue',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithRevenue: { debit: boolean; credit: boolean } = {debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_tenant',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithTenant: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_insurance_revenue',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithInsuranceRevenue: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_price_revenue',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithPriceRevenue: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_intention_ratifying',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithIntentionRatifying: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_other_fee',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithOtherFee: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_commission_client',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithCommissionClient: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_commission_owner',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithCommissionOwner: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_contract_fines_terminating',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithContractFinesTerminating: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_decisiveness_granted',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithDecisivenessGranted: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({ type: 'text', name: 'contract_terms', nullable: true })
    contractTerms?: string;
  
    @Column({ type: 'text', name: 'folder_default_printing', nullable: true })
    folderDefaultPrinting?: string;
  
    @Column({ type: 'text', name: 'folder_print_communications', nullable: true })
    folderPrintCommunications?: string;
  
    @Column({ type: 'text', name: 'folder_print_clearance', nullable: true })
    folderPrintClearance?: string;
  
    @Column({
      type: 'jsonb',
      name: 'move_cost_center_with_contract_proceeds_rerminating',
      default: { debit: false, credit: false },
    })
    moveCostCenterWithContractProceedsRerminating: { debit: boolean; credit: boolean } = { debit: false, credit: false};
  
    @Column({ type: 'text', name: 'sms', nullable: true })
    sms?: string;
  
    @Column({ type: 'integer', name: 'assets_type' })
    assetsType!: number;
  
    @Column({ type: 'uuid', name: 'default_fees_account_1', nullable: true })
    defaultFeesAccount1?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_2', nullable: true })
    defaultFeesAccount2?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_3', nullable: true })
    defaultFeesAccount3?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_4', nullable: true })
    defaultFeesAccount4?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_5', nullable: true })
    defaultFeesAccount5?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_6', nullable: true })
    defaultFeesAccount6?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_7', nullable: true })
    defaultFeesAccount7?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_8', nullable: true })
    defaultFeesAccount8?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_9', nullable: true })
    defaultFeesAccount9?: string;
    @Column({ type: 'uuid', name: 'default_fees_account_10', nullable: true })
    defaultFeesAccount10?: string;
  
    @Column({ type: 'bigint', name: 'number'})
    @Generated('increment')
    number!: string; 
  
    @Column({ type: 'uuid', name: 'tenant_id', nullable: true })
    tenantId?: string;
  
    @Column({ type: 'text', name: 'ltnname', nullable: true })
    ltnname?: string;
  
    @Column({ type: 'text', name: 'list_ltnname', nullable: true })
    listLtnname?: string;
 

    @ManyToOne(() => Account, { nullable: true })
    @JoinColumn({ name: 'default_revenue_account_id' })
    defaultRevenueAccount?: Account;
  
    @ManyToOne(() => Account, { nullable: true })
    @JoinColumn({ name: 'default_commission_from_client_account_id' })
    defaultCommissionFromClientAccount?: Account;
  
    @ManyToOne(() => Account, { nullable: true })
    @JoinColumn({ name: 'default_commission_from_owner_account_id' })
    defaultCommissionFromOwnerAccount?: Account;
  
    @ManyToOne(() => Tenant, { nullable: true })
    @JoinColumn({ name: 'tenant_id' })
    tenant?: Tenant;
}
  