import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { DI_TYPES } from '../../di/di.types';
import { IVacatedContractFilter, IVacatedContractReport } from '../../types/report.types';
import { EXISIT, NOT_EXISIT, ALL } from '../../constants/reports.constants';
import { addDays, isEmpty } from '../../utils/utils';

@injectable()
export class VacatedContractService {
    constructor(
        @inject(DI_TYPES.DataSource) private readonly dataSource: DataSource
    ) { }

    async generateReport(filter: IVacatedContractFilter): Promise<IVacatedContractReport> {
        const manager = this.dataSource.createEntityManager();
        const params: any[] = [];
        const conditions: string[] = [];

        this.buildVacatedFilters(filter, params, conditions);

        const data = await manager.query(`
            WITH contract_data AS (
                SELECT 
                    c.id as contract_id,
                    c.end_duration_date,
                    c.note as contract_note,
                    c.client_id,
                    a.id as apartment_id,
                    a.apartment_no,
                    a.apartment_kind,
                    a.note as apartment_note,
                    s.id as shop_id,
                    s.shop_no,
                    s.shop_kind,
                    s.note as shop_note,
                    p.id as parking_id,
                    p.parking_no,
                    p.parking_kind,
                    p.note as parking_note,
                    ct.termination_date,
                    ct.evacuation_date,
                    CASE 
                        WHEN ct.termination_date IS NOT NULL THEN 
                            DATE_PART('day', ct.termination_date::timestamp - CURRENT_DATE::timestamp)
                        ELSE 
                            DATE_PART('day', c.end_duration_date::timestamp - CURRENT_DATE::timestamp)
                    END as days_left
                FROM contract c
                LEFT JOIN apartment a ON c.apartment_id = a.id
                LEFT JOIN shop s ON c.shop_id = s.id
                LEFT JOIN parking p ON c.parking_id = p.id
                LEFT JOIN contract_termination ct ON c.id = ct.contract_id
                WHERE 1=1 ${conditions.join(' ')}
            ),
            terminated_contracts AS (
                SELECT *
                FROM contract_data
                WHERE termination_date IS NOT NULL
            ),
            active_contracts AS (
                SELECT *
                FROM contract_data
                WHERE termination_date IS NULL
            )
            SELECT * FROM terminated_contracts
            UNION ALL
            SELECT * FROM active_contracts
            ORDER BY days_left
        `, params);

        const metadata = {
            total_contracts: data.length,
            terminated_contracts: data.filter((c: any) => c.termination_date).length,
            expiring_contracts: data.filter((c: any) => !c.termination_date).length
        };

        return { data, metadata };
    }

    private buildVacatedFilters(filter: IVacatedContractFilter, params: any[], conditions: string[]): void {
        if (filter.client_id) {
            params.push(filter.client_id);
            conditions.push(`AND c.client_id = $${params.length}::uuid`);
        }

        if (filter.date_from && filter.date_to && isEmpty(filter.number_of_days)) {
            params.push(filter.date_from, filter.date_to);
            conditions.push(`AND c.end_duration_date BETWEEN $${params.length - 1}::timestamp AND $${params.length}::timestamp`);
        }

        if (filter.number_of_days && isEmpty(filter.date_from) && isEmpty(filter.date_to)) {
            const start_date = new Date();
            const end_date = addDays(start_date, filter.number_of_days);
            params.push(start_date, end_date);
            conditions.push(`AND c.end_duration_date BETWEEN $${params.length - 1}::timestamp AND $${params.length}::timestamp`);
        }

        if (filter.allow_contract_statement) {
            params.push(`%${filter.contract_statement}%`);
            if (filter.contract_statement_type === EXISIT) {
                conditions.push(`AND c.note ILIKE $${params.length}`);
            } else if (filter.contract_statement_type === NOT_EXISIT) {
                conditions.push(`AND c.note NOT ILIKE $${params.length}`);
            }
        }

        if (filter.buildings?.length) {
            params.push(filter.buildings);
            conditions.push(`AND c.building_id = ANY($${params.length}::uuid[])`);
        }

        if (filter.contract_patterns?.length) {
            params.push(filter.contract_patterns);
            conditions.push(`AND c.code = ANY($${params.length}::int[])`);
        }
    }
}