require('dotenv').config();
import { Pool } from 'pg';
export const pool = new Pool({
    connectionString: process.env.CONNECTION_URL,
});

export async function connect() {
    return pool.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Database connected');
    });
}
