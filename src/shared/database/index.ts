import * as process from 'process';

require('dotenv').config();
require('dotenv').config({ path: '.env.test' });
import pg, { Pool } from 'pg';
import { init, tripRepository, tripReservationRepository, userRepository } from '@/shared/repositories';
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => parseFloat(value));

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

        init(pool);
        createTables();
        setupExtensions();
        console.log('Database connected');
    });
}

export async function createTables() {
    await tripRepository?.createTable();
    await userRepository?.createTable();
    await tripReservationRepository?.createTable();
}

export async function setupExtensions() {
    return await pool.query('CREATE EXTENSION IF NOT EXISTS unaccent;');
}
