import { inject, injectable } from 'inversify';
import { DataSource, EntityManager } from 'typeorm';
import { IBalanceSheetFilter, IBalanceSheetReport } from '../../types/report.types';
import { DI_TYPES } from '../../di/di.types';


@injectable()
export class BalanceSheetService {
    constructor(@inject(DI_TYPES.DataSource) private dataSource: DataSource) { }

    async generateReport(filter: IBalanceSheetFilter): Promise<IBalanceSheetReport> {
        const manager = this.dataSource.createEntityManager();

        const params: any[] = [];
        const conditions: string[] = [];

        if (filter.account_id) {
            params.push(filter.account_id);
            conditions.push(`AND egd.account_id = $${params.length}::uuid`);
        }

        if (filter.observe_account_id) {
            params.push(filter.observe_account_id);
            conditions.push(`AND egd.observe_account_id = $${params.length}::uuid`);
        }

        if (filter.cost_center_id) {
            params.push(filter.cost_center_id);
            conditions.push(`AND egd.cost_center_id = $${params.length}::uuid`);
        }

        if (filter.currency_id) {
            params.push(filter.currency_id);
            conditions.push(`AND egd.currency_id = $${params.length}::uuid`);
        }

        if (filter.date_from) {
            params.push(filter.date_from);
            conditions.push(`AND egd.created_at >= $${params.length}::timestamp`);
        }

        if (filter.date_to) {
            params.push(filter.date_to);
            conditions.push(`AND egd.created_at <= $${params.length}::timestamp`);
        }

        if (filter.level) {
            params.push(filter.level);
            conditions.push(`AND ah.depth <= $${params.length}::integer`);
        }

        params.push([1, 2]);
        const whereClause = conditions.join(' ');
        const arrayParamIndex = params.length;


        const hierarchyQuery = await manager
            .query(`
                WITH RECURSIVE account_hierarchy AS (
                    SELECT 
                        id as account_id,
                        name as account_name,
                        parent_id,
                        final_id,
                        name as final_name,
                        number,
                        NULL::VARCHAR as parent_name,
                        1 as depth,
                        ARRAY[id] as hierarchy_path,
                        ROW_NUMBER() OVER (ORDER BY id) as row_num,
                        CAST(ROW_NUMBER() OVER (ORDER BY id) AS TEXT) as hierarchy_label
                    FROM account
                    WHERE parent_id IS NULL
                    
                    UNION ALL
                    
                    SELECT 
                        a.id,
                        a.name,
                        a.parent_id,
                        a.final_id,
                        a.name,
                        a.number,
                        ah.account_name,
                        ah.depth + 1,
                        ah.hierarchy_path || a.id,
                        ROW_NUMBER() OVER (PARTITION BY a.parent_id ORDER BY a.id),
                        CAST(ah.hierarchy_label || '_' || ROW_NUMBER() OVER (PARTITION BY a.parent_id ORDER BY a.id) AS TEXT)
                    FROM account a
                    INNER JOIN account_hierarchy ah ON ah.account_id = a.parent_id
                ),
                account_totals AS (
                    SELECT 
                        ah.account_id,
                        ah.account_name,
                        ah.parent_id,
                        ah.parent_name,
                        ah.final_id,
                        ah.final_name,
                        ah.number,
                        ah.hierarchy_label,
                        ah.depth as level,
                        COALESCE(SUM(egd.debit), 0) as total_debit,
                        COALESCE(SUM(egd.credit), 0) as total_credit
                    FROM account_hierarchy ah
                    LEFT JOIN entry_grid_data egd ON egd.account_id = ah.account_id
                    WHERE 1=1 ${whereClause}
                    GROUP BY 
                        ah.account_id, ah.account_name, ah.parent_id, ah.parent_name,
                        ah.final_id, ah.final_name, ah.number, ah.hierarchy_label, ah.depth
                ),
                aggregated_totals AS (
                    SELECT *
                    FROM account_totals
                    
                    UNION ALL
                    
                    SELECT 
                        at.account_id,
                        at.account_name,
                        at.parent_id,
                        at.parent_name,
                        at.final_id,
                        at.final_name,
                        at.number,
                        at.hierarchy_label,
                        at.level,
                        at.total_debit + COALESCE(ct.total_debit, 0),
                        at.total_credit + COALESCE(ct.total_credit, 0)
                    FROM account_totals at
                    INNER JOIN aggregated_totals ct ON ct.parent_id = at.account_id
                )
                SELECT 
                    account_id,
                    account_name,
                    parent_id,
                    parent_name,
                    final_id,
                    final_name,
                    number,
                    hierarchy_label,
                    level,
                    SUM(total_debit) as total_debit,
                    SUM(total_credit) as total_credit
                FROM aggregated_totals
                WHERE number = ANY($${arrayParamIndex})
                AND (parent_id IS NULL OR parent_id IN (
                    SELECT id FROM account 
                    WHERE number = ANY($${arrayParamIndex}) AND parent_id IS NULL
                ))
                GROUP BY 
                    account_id, account_name, parent_id, parent_name,
                    final_id, final_name, number, hierarchy_label, level
                ORDER BY hierarchy_label
            `, params);

        const metadata = {
            total_debit: hierarchyQuery.reduce((acc: any, item: any) => acc + Number(item.total_debit), 0),
            total_credit: hierarchyQuery.reduce((acc: any, item: any) => acc + Number(item.total_credit), 0),
        };

        return { data: hierarchyQuery, metadata };
    }
}