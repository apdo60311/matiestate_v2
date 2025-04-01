import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { DI_TYPES } from '../../di/di.types';
import { ILeasedReportFilter, ILeasedReportResponse } from '../../types/report.types';
import { WITH_LAWSUIT, WITHOUT_LAWSUIT, NOTE_CONTAIN, NOTE_NOT_CONTAIN, BLOCKED_UNIT, NON_BLOCKED_UNIT } from '../../constants/reports.constants';

@injectable()
export class LeasedReportService {
    constructor(
        @inject(DI_TYPES.DataSource) private readonly dataSource: DataSource
    ) { }

    async generateReport(filter: ILeasedReportFilter): Promise<ILeasedReportResponse> {
        const manager = this.dataSource.createEntityManager();
        const params: any[] = [];
        const conditions: string[] = [];

        this.buildLeasedFilters(filter, params, conditions);

        const data = await manager.query(`
            WITH property_contracts AS (
                SELECT 
                    c.id as contract_id,
                    c.contract_type,
                    c.note as contract_note,
                    c.lawsuit,
                    c.contract_value,
                    c.feedback,
                    c.previous_securing,
                    c.current_securing_value,
                    COALESCE(a.id, s.id) as property_id,
                    COALESCE(a.apartment_no, s.shop_no) as property_no,
                    COALESCE(a.apartment_kind, s.shop_kind) as property_kind,
                    COALESCE(a.area, s.area) as area,
                    COALESCE(a.area_unit, s.area_unit) as area_unit,
                    COALESCE(a.has_lawsuit, s.has_lawsuit) as has_lawsuit,
                    COALESCE(a.blocked, s.blocked) as blocked,
                    COALESCE(a.note, s.note) as property_note,
                    COALESCE(rpa.price, rps.price) as rent_price,
                    COALESCE(spa.price, sps.price) as selling_price,
                    ct.termination_date,
                    ct.terminated,
                    cc.amount as collected_cheques,
                    vm.credit_amount as received_cash_payments,
                    uc.amount as total_uncollected_amount,
                    rc.amount as returned_value
                FROM contract c
                LEFT JOIN apartment a ON c.apartment_id = a.id
                LEFT JOIN shop s ON c.shop_id = s.id
                LEFT JOIN apartment_rental_price rpa ON a.id = rpa.apartment_id
                LEFT JOIN shop_rental_price rps ON s.id = rps.shop_id
                LEFT JOIN apartment_selling_price spa ON a.id = spa.apartment_id
                LEFT JOIN shop_selling_price sps ON s.id = sps.shop_id
                LEFT JOIN contract_termination ct ON c.id = ct.contract_id
                LEFT JOIN cheque cc ON c.id = cc.contract_id AND cc.status = 'collected'  
                LEFT JOIN voucher_main vm ON c.id = vm.contract_id
                LEFT JOIN cheque uc ON c.id = uc.contract_id AND uc.status = 'uncollected'
                LEFT JOIN cheque rc ON c.id = rc.contract_id AND rc.status = 'returned'
                WHERE 1=1 ${conditions.join(' ')}
            ),
            filtered_results AS (
                SELECT 
                    *,
                    COALESCE(collected_cheques, 0) + COALESCE(received_cash_payments, 0) as total_collected_amount,
                    CASE 
                        WHEN property_id LIKE 'apt_%' THEN 'apartment'
                        ELSE 'shop'
                    END as property_type
                FROM property_contracts
                WHERE (${filter.flats ? 'property_type = \'apartment\'' : '1=0'})
                   OR (${filter.shops ? 'property_type = \'shop\'' : '1=0'})
            )
            SELECT * FROM filtered_results
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

    private buildLeasedFilters(filter: ILeasedReportFilter, params: any[], conditions: string[]): void {
        // Contract type filter
        if (filter.show_sold_units) {
            conditions.push(`AND c.contract_type = 1`);
        }

        // Contract statement filter
        if (filter.allow_contract_statement && filter.contract_statement) {
            params.push(`%${filter.contract_statement}%`);
            if (filter.contract_statement_type === NOTE_CONTAIN) {
                conditions.push(`AND c.note ILIKE $${params.length}`);
            } else if (filter.contract_statement_type === NOTE_NOT_CONTAIN) {
                conditions.push(`AND c.note NOT ILIKE $${params.length}`);
            }
        }

        // Lawsuit filters
        if (filter.lawsuit_on_contract === WITH_LAWSUIT) {
            conditions.push(`AND c.lawsuit = true`);
        } else if (filter.lawsuit_on_contract === WITHOUT_LAWSUIT) {
            conditions.push(`AND c.lawsuit = false`);
        }

        // Rent range filter
        if (filter.rent_form && filter.rent_to) {
            params.push(filter.rent_form, filter.rent_to);
            conditions.push(`AND c.contract_value BETWEEN $${params.length - 1}::numeric AND $${params.length}::numeric`);
        }

        // Review status filters
        if (filter.reviewed && !filter.unreviewed) {
            conditions.push(`AND c.feedback = true`);
        } else if (!filter.reviewed && filter.unreviewed) {
            conditions.push(`AND c.feedback = false`);
        }

        // Property number filter
        if (filter.property_no) {
            params.push(filter.property_no);
            conditions.push(`AND (a.apartment_no = $${params.length} OR s.shop_no = $${params.length})`);
        }

        // Area filters
        if (filter.area_unit) {
            params.push(filter.area_unit);
            conditions.push(`AND COALESCE(a.area_unit, s.area_unit) = $${params.length}`);
        }

        if (filter.area_form && filter.area_to) {
            params.push(filter.area_form, filter.area_to);
            conditions.push(`AND COALESCE(a.area, s.area) BETWEEN $${params.length - 1}::numeric AND $${params.length}::numeric`);
        }

        // Property lawsuit filters
        if (filter.lawsuit_on_unit === WITH_LAWSUIT) {
            conditions.push(`AND COALESCE(a.has_lawsuit, s.has_lawsuit) = true`);
        } else if (filter.lawsuit_on_unit === WITHOUT_LAWSUIT) {
            conditions.push(`AND COALESCE(a.has_lawsuit, s.has_lawsuit) = false`);
        }

        // Blocked unit filters
        if (filter.blocked_units === BLOCKED_UNIT) {
            conditions.push(`AND COALESCE(a.blocked, s.blocked) = true`);
        } else if (filter.blocked_units === NON_BLOCKED_UNIT) {
            conditions.push(`AND COALESCE(a.blocked, s.blocked) = false`);
        }

        // Property statement filters
        if (filter.allow_property_statement && filter.property_statement) {
            params.push(`%${filter.property_statement}%`);
            if (filter.property_statement_type === NOTE_CONTAIN) {
                conditions.push(`AND COALESCE(a.note, s.note) ILIKE $${params.length}`);
            } else if (filter.property_statement_type === NOTE_NOT_CONTAIN) {
                conditions.push(`AND COALESCE(a.note, s.note) NOT ILIKE $${params.length}`);
            }
        }

        // Description filter
        if (filter.description) {
            params.push(`%${filter.description}%`);
            conditions.push(`AND COALESCE(a.description, s.description) ILIKE $${params.length}`);
        }

        // Buildings filter
        if (filter.buildings?.length) {
            params.push(filter.buildings);
            conditions.push(`AND COALESCE(a.building_id, s.building_id) = ANY($${params.length}::uuid[])`);
        }

        // Date filters
        if (filter.created_at_from) {
            params.push(filter.created_at_from);
            conditions.push(`AND c.created_at >= $${params.length}::timestamp`);
        }

        if (filter.created_at_to) {
            params.push(filter.created_at_to);
            conditions.push(`AND c.created_at <= $${params.length}::timestamp`);
        }

        // Transaction filters
        if (filter.show_credit) {
            conditions.push(`AND cc.amount > 0`);
        }

        if (filter.show_debit) {
            conditions.push(`AND vm.debit_amount > 0`);
        }
    }
}