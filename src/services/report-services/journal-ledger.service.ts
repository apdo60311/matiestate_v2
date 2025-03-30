import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { DI_TYPES } from '../../di/di.types';
import { DebitTransactionType, IJournalLedgerFilter, IJournalLedgerReport } from '../../types/report.types';

@injectable()
export class JournalLedgerService {
    constructor(
        @inject(DI_TYPES.DataSource) private readonly dataSource: DataSource
    ) { }

    async generateReport(filter: IJournalLedgerFilter): Promise<IJournalLedgerReport> {
        const manager = this.dataSource.createEntityManager();
        const params: any[] = [];
        const conditions: string[] = [];

        if (filter) {
            if (filter.account_id) {
                params.push(filter.account_id);
                conditions.push(`AND egd.account_id = $${params.length}::uuid`);
            }

            if (filter.cost_center_id) {
                params.push(filter.cost_center_id);
                conditions.push(`AND egd.cost_center_id = $${params.length}::uuid`);
            }

            if (filter.currency_id) {
                params.push(filter.currency_id);
                conditions.push(`AND emd.currency_id = $${params.length}::uuid`);
            }

            if (filter.entry_number_from) {
                params.push(filter.entry_number_from);
                conditions.push(`AND emd.number >= $${params.length}::integer`);
            }

            if (filter.entry_number_to) {
                params.push(filter.entry_number_to);
                conditions.push(`AND emd.number <= $${params.length}::integer`);
            }

            if (filter.debit_transaction) {
                switch (filter.debit_transaction) {
                    case DebitTransactionType.WITHOUT:
                        conditions.push(`AND emd.debit = 0`);
                        break;
                    case DebitTransactionType.LESS_THAN:
                        params.push(filter.debit_amount);
                        conditions.push(`AND emd.debit < $${params.length}::numeric`);
                        break;
                    case DebitTransactionType.MORE_THAN:
                        params.push(filter.debit_amount);
                        conditions.push(`AND emd.debit > $${params.length}::numeric`);
                        break;
                    case DebitTransactionType.EQUAL:
                        params.push(filter.debit_amount);
                        conditions.push(`AND emd.debit = $${params.length}::numeric`);
                        break;
                    case DebitTransactionType.BETWEEN:
                        params.push(filter.debit_amount_from);
                        params.push(filter.debit_amount_to);
                        conditions.push(`AND emd.debit BETWEEN $${params.length - 1}::numeric AND $${params.length}::numeric`);
                        break;
                    case DebitTransactionType.LESS_OR_EQUAL:
                        params.push(filter.debit_amount);
                        conditions.push(`AND emd.debit <= $${params.length}::numeric`);
                        break;
                    case DebitTransactionType.LARGEST_OR_EQUAL:
                        params.push(filter.debit_amount);
                        conditions.push(`AND emd.debit >= $${params.length}::numeric`);
                        break;
                }
            }

            if (filter.created_at_from) {
                params.push(filter.created_at_from);
                conditions.push(`AND emd.created_at >= $${params.length}::timestamp`);
            }

            if (filter.created_at_to) {
                params.push(filter.created_at_to);
                conditions.push(`AND emd.created_at <= $${params.length}::timestamp`);
            }
        }

        const whereClause = conditions.join(' ');

        const data = await manager.query(`
            SELECT 
                emd.created_at,
                egd.debit,
                egd.credit,
                emd.note,
                emd.created_from,
                emd.created_from_id,
                emd.currency_id,
                emd.created_from_code,
                egd.account_id,
                a.name as account_name,
                egd.observe_account_id,
                oa.name as observe_account_name,
                emd.number,
                cc.id as cost_center_id,
                cc.name as cost_center_name,
                c.name as currency_name,
                c.code as currency_code,
                SUM(egd.debit - egd.credit) OVER (ORDER BY egd.id) AS balance
            FROM entry_main_data emd
            JOIN entry_grid_data egd ON emd.id = egd.entry_main_data_id
            JOIN cost_center cc ON egd.cost_center_id = cc.id
            JOIN account a ON egd.account_id = a.id
            JOIN account oa ON egd.observe_account_id = oa.id
            JOIN currency c ON emd.currency_id = c.id
            WHERE 1=1 ${whereClause}
        `, params);

        const metadata = {
            total_activity: data.reduce((acc: number, item: any) =>
                acc + (Number(item.debit) - Number(item.credit)), 0),
            pervios_total: 0,
            total: 0
        };

        return { data, metadata };
    }
}