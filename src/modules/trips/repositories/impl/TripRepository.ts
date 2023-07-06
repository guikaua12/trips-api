import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { Client, QueryResult } from 'pg';

export class TripRepository implements ITripRepository {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async createTable(): Promise<QueryResult<any>> {
        return this.client.query(
            'CREATE TABLE IF NOT EXISTS trips (' +
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
