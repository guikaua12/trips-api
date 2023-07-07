import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { Client, QueryResult } from 'pg';

export class TripRepository implements ITripRepository {
    static TABLE_NAME = 'trips';
    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async createTable(): Promise<QueryResult<any>> {
        return this.pool.query(
            `CREATE TABLE IF NOT EXISTS ${TripRepository.TABLE_NAME} (` +
                'id VARCHAR PRIMARY KEY, ' +
                'name VARCHAR, ' +
                'description VARCHAR, ' +
                'startDate DATE, ' +
                'endDate DATE, ' +
                'pricePerDay DECIMAL(8,2), ' +
                'coverImage VARCHAR, ' +
                'imagesUrl VARCHAR[], ' +
                'highlights VARCHAR[], ' +
                'maxGuests INTEGER' +
                ')'
        );
    }
}
