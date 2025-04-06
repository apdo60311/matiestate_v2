import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { DI_TYPES } from '../../di/di.types';
import { ISoldUnitsFilter, ISoldUnitsReport } from '../../types/report.types';
import { EXISIT, NOT_EXISIT } from '../../constants/reports.constants';
import { isEmpty } from '../../utils/utils';

@injectable()
export class SoldUnitsService {
    constructor(
        @inject(DI_TYPES.DataSource) private readonly dataSource: DataSource
    ) { }

    async generateReport(filter: ISoldUnitsFilter): Promise<ISoldUnitsReport> {
        const manager = this.dataSource.createEntityManager();
        const params: any[] = [];
        const conditions: string[] = [];

        this.buildSoldUnitsFilters(filter, params, conditions);

        const data = await manager.query(`
            WITH property_contracts AS (
                SELECT 
                    c.id as contract_id,
                    c.contract_type,
                    c.issue_date,
                    c.client_id,
                    COALESCE(a.id, s.id) as property_id,
                    COALESCE(a.apartment_no, s.shop_no) as property_no,
                    COALESCE(a.area, s.area) as area,
                    COALESCE(a.area_unit, s.area_unit) as area_unit,
                    COALESCE(a.description, s.description) as description,
                    b.city as area_name,
                    cc.amount as collected_cheques,
                    vm.credit_amount as received_cash_payments,
                    uc.amount as total_uncollected_amount,
                    CASE 
                        WHEN a.id IS NOT NULL THEN 'apartment'
                        ELSE 'shop'
                    END as property_type
                FROM contract c
                LEFT JOIN apartment a ON c.apartment_id = a.id
                LEFT JOIN shop s ON c.shop_id = s.id
                LEFT JOIN building b ON COALESCE(a.building_id, s.building_id) = b.id
                LEFT JOIN cheque cc ON c.id = cc.contract_id AND cc.status = 'collected'
                LEFT JOIN voucher_main_data vm ON c.id = vm.contract_id
                LEFT JOIN cheque uc ON c.id = uc.contract_id AND uc.status = 'uncollected'
                WHERE 1=1 ${conditions.join(' ')}
            ),
            filtered_results AS (
                SELECT 
                    *,
                    COALESCE(collected_cheques, 0) + COALESCE(received_cash_payments, 0) as total_collected_amount
                FROM property_contracts
                WHERE (${filter.flats ? 'property_type = \'apartment\'' : '1=0'})
                   OR (${filter.shops ? 'property_type = \'shop\'' : '1=0'})
            )
            SELECT * FROM filtered_results
            WHERE 1=1
            ${filter.status === EXISIT ? 'AND contract_type = 1' : ''}
            ${filter.status === NOT_EXISIT ? 'AND (contract_type != 1 OR contract_type IS NULL)' : ''}
            ORDER BY property_no
        `, params);

        const metadata = {
            total_properties: data.length,
            total_apartments: data.filter((p: any) => p.property_type === 'apartment').length,
            total_shops: data.filter((p: any) => p.property_type === 'shop').length,
            total_collected: data.reduce((sum: any, item: any) => sum + (item.total_collected_amount || 0), 0),
            total_uncollected: data.reduce((sum: any, item: any) => sum + (item.total_uncollected_amount || 0), 0)
        };

        return { data, metadata };
    }

    private buildSoldUnitsFilters(filter: ISoldUnitsFilter, params: any[], conditions: string[]): void {
        if (filter.from && filter.to) {
            params.push(filter.from, filter.to);
            conditions.push(`AND c.issue_date BETWEEN $${params.length - 1}::timestamp AND $${params.length}::timestamp`);
        }

        if (filter.client_id) {
            params.push(filter.client_id);
            conditions.push(`AND c.client_id = $${params.length}::uuid`);
        }

        if (filter.area_name) {
            params.push(filter.area_name);
            conditions.push(`AND b.city = $${params.length}`);
        }

        if (filter.description) {
            params.push(`%${filter.description}%`);
            conditions.push(`AND COALESCE(a.description, s.description) ILIKE $${params.length}`);
        }

        if (filter.area_form && filter.area_to) {
            params.push(filter.area_form, filter.area_to);
            conditions.push(`AND COALESCE(a.area, s.area) BETWEEN $${params.length - 1}::numeric AND $${params.length}::numeric`);
        }

        if (filter.buildings?.length) {
            params.push(filter.buildings);
            conditions.push(`AND COALESCE(a.building_id, s.building_id) = ANY($${params.length}::uuid[])`);
        }
    }
}