require('dotenv').config();
import { Client } from 'pg';
export const client = new Client(process.env.CONNECTION_URL);

export async function connect() {
    return client.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Database connected');
    });
}
