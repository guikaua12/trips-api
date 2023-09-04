import { connect } from '@/shared/database';

require('dotenv').config();
import { Pool } from 'pg';
import process from 'process';
import { test, expect, afterAll } from '@jest/globals';
import { TripRepository } from './TripRepository';

export const pool = new Pool({
    connectionString: process.env.CONNECTION_URL,
});

export async function connect() {
    return pool.connect((err) => {
        if (err) {
            console.error(err);
            process.exit();
            return;
        }

        console.log('Database connected');
    });
}

test('getAllByIds works', async () => {
    await connect();
    const trips = await new TripRepository(pool).getAllByIds(['1', '43666154-ba45-4bba-97c9-ba6a4e289c7e']);

    expect(trips.length).toBe(1);
});

afterAll(() => {
    process.exit(1);
});
