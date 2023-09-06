import pg, { Pool } from 'pg';
import { init, tripRepository, tripReservationRepository, userRepository } from '@/shared/repositories';
import { env } from '@/dotenv';

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => parseFloat(value));

export let pool = new Pool({
    connectionString: env.CONNECTION_URL,
});

export async function connect() {
    try {
        await pool.connect();

        init(pool);
        await createTables();
        await setupExtensions();
        console.log('Database connected');
    } catch (err) {
        console.error(err);
    }
}
export async function disconnect() {
    await pool.end();
}

export async function createTables() {
    await tripRepository?.createTable();
    await userRepository?.createTable();
    await tripReservationRepository?.createTable();
}

export async function setupExtensions() {
    return await pool.query('CREATE EXTENSION IF NOT EXISTS unaccent;');
}
