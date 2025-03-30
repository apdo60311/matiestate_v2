import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { DI_TYPES } from '../../di/di.types';
import { IGeneralLedgerFilter, IGeneralLedgerReport } from '../../types/report.types';

@injectable()
export class GeneralLedgerService {
    constructor(
        @inject(DI_TYPES.DataSource) private readonly dataSource: DataSource
    ) { }

    async generateReport(filter: IGeneralLedgerFilter): Promise<IGeneralLedgerReport> {
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

            if (filter.allow_statement_statement) {
                params.push(filter.allow_statement_statement);
                if (filter.statement_statement_type === 'contains') {
                    conditions.push(`AND emd.note LIKE '%' || $${params.length}::text || '%'`);
                } else {
                    conditions.push(`AND emd.note NOT LIKE '%' || $${params.length}::text || '%'`);
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

            if (filter.show_credit) {
                conditions.push(`AND egd.credit > 0`);
            }

            if (filter.show_debit) {
                conditions.push(`AND egd.debit > 0`);
            }
        }

        const whereClause = conditions.join(' ');

        const data = await manager.query(`
            SELECT 
                emd.created_at,
                egd.debit,
                egd.credit,
                emd.note,
                emd.currency_id,
                egd.account_id,
                a.name as account_name,
                egd.observe_account_id,
                oa.name as observe_account_name,
                emd.number,
                cc.id as cost_center_id,
                cc.name as cost_center_name,
                cc.note as cost_center_note,
                cc.created_at as cost_center_created_at,
                SUM(egd.debit - egd.credit) OVER (ORDER BY egd.id) AS balance
            FROM entry_main_data emd
            JOIN entry_grid_data egd ON emd.id = egd.entry_main_data_id
            JOIN cost_center cc ON egd.cost_center_id = cc.id
            JOIN account a ON egd.account_id = a.id
            JOIN account oa ON egd.observe_account_id = oa.id
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