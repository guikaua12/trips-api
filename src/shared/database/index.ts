import * as process from 'process';

require('dotenv').config();
import pg, { Pool } from 'pg';
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

        console.log('Database connected');
    });
}
