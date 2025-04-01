import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { DI_TYPES } from '../../di/di.types';
import { IUnitReservedFilter, IUnitReservedReport } from '../../types/report.types';
import { EXISIT, NOT_EXISIT } from '../../constants/reports.constants';
import { addDays, isEmpty } from '../../utils/utils';

@injectable()
export class UnitReservedReportService {
    constructor(
        @inject(DI_TYPES.DataSource) private readonly dataSource: DataSource
    ) { }

    async generateReport(filter: IUnitReservedFilter): Promise<IUnitReservedReport> {
        const manager = this.dataSource.createEntityManager();
        const params: any[] = [];
        const conditions: string[] = [];

        this.buildReservedFilters(filter, params, conditions);

        const data = await manager.query(`
            WITH reserved_properties AS (
                SELECT 
                    rp.id,
                    rp.property_type,
                    rp.property_id,
                    rp.book_date,
                    rp.end_book_date,
                    rp.note,
                    rp.has_payment,
                    rp.reservation_expired,
                    rp.payment_amount,
                    rp.currency_val,
                    rp.number,
                    rp.account_id,
                    rp.building_id,
                    rp.credit_cost_center_id,
                    rp.currency_id,
                    rp.tenant_id,
                    CASE 
                        WHEN rp.property_type = 1 THEN a.apartment_no
                        WHEN rp.property_type = 2 THEN p.parking_no
                        WHEN rp.property_type = 3 THEN s.shop_no
                        ELSE NULL 
                    END as property_no,
                    t.name as tenant_name,
                    cc.name as cost_center_name,
                    c.name as currency_name,
                    b.name as building_name,
                    DATE_PART('day', rp.end_book_date::timestamp - CURRENT_DATE::timestamp) as days_remaining
                FROM reservation_property rp
                LEFT JOIN apartment a ON rp.property_id = a.id AND rp.property_type = 1
                LEFT JOIN parking p ON rp.property_id = p.id AND rp.property_type = 2
                LEFT JOIN shop s ON rp.property_id = s.id AND rp.property_type = 3
                LEFT JOIN tenants t ON rp.tenant_id = t.id
                LEFT JOIN cost_center cc ON rp.credit_cost_center_id = cc.id
                LEFT JOIN currency c ON rp.currency_id = c.id
                LEFT JOIN building b ON rp.building_id = b.id
                WHERE 1=1 ${conditions.join(' ')}
            )
            SELECT * FROM reserved_properties
            ORDER BY book_date DESC
        `, params);

        const metadata = {
            total_reservations: data.length,
            active_reservations: data.filter((r: any) => !r.reservation_expired).length,
            expired_reservations: data.filter((r: any) => r.reservation_expired).length,
            total_payment_amount: data.reduce((sum: any, item: any) => sum + (item.payment_amount || 0), 0)
        };

        return { data, metadata };
    }

    private buildReservedFilters(filter: IUnitReservedFilter, params: any[], conditions: string[]): void {
        if (filter.client_id) {
            params.push(filter.client_id);
            conditions.push(`AND rp.account_id = $${params.length}::uuid`);
        }

        if (filter.booking === EXISIT) {
            conditions.push(`AND rp.reservation_expired = false`);
        } else if (filter.booking === NOT_EXISIT) {
            conditions.push(`AND rp.reservation_expired = true`);
        }

        if (filter.unit_type) {
            params.push(filter.unit_type);
            conditions.push(`AND rp.property_type = $${params.length}::integer`);
        }

        if (filter.property_no) {
            params.push(filter.property_no);
            conditions.push(`AND (
                (rp.property_type = 1 AND a.apartment_no = $${params.length}) OR
                (rp.property_type = 2 AND p.parking_no = $${params.length}) OR
                (rp.property_type = 3 AND s.shop_no = $${params.length})
            )`);
        }

        const remaining_days = filter.remaining_days_of_number_of_reservation_is_smaller;

        if (filter.allow_booking_date && filter.from && filter.to && isEmpty(remaining_days)) {
            params.push(filter.from, filter.to);
            conditions.push(`AND rp.book_date BETWEEN $${params.length - 1}::timestamp AND $${params.length}::timestamp`);
        }

        if (filter.remaining_days) {
            const start_date = filter.from || new Date();
            const end_date = addDays(start_date, filter.remaining_days);
            params.push(start_date, end_date);
            conditions.push(`AND rp.end_book_date BETWEEN $${params.length - 1}::timestamp AND $${params.length}::timestamp`);
        }

        if (filter.buildings?.length) {
            params.push(filter.buildings);
            conditions.push(`AND rp.building_id = ANY($${params.length}::uuid[])`);
        }
    }
}