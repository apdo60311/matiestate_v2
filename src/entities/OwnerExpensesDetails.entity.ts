import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OwnerExpenses } from './OwnerExpenses.entity';
import { OwnerExpensesTypes } from './OwnerExpensesTypes.entity';
import { Tenant } from './Tenant.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('owner_expenses_details')
export class OwnerExpensesDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4().toString();

  @Column('date', { nullable: true })
  date?: Date;

  @Column('real')
  amount!: number;

  @Column('text', { nullable: true })
  note?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant;

  @Column('text', { nullable: true })
  receipt_number?: string;
  
  @Column('smallint', { nullable: true })
  number?: number;

  @ManyToOne(() => OwnerExpensesTypes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_expenses_types_id' })
  expenseType!: OwnerExpensesTypes;

  @ManyToOne(() => OwnerExpenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_expenses_id' })
  ownerExpense!: OwnerExpenses;
}