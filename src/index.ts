import { server } from '@/shared/server/server';
import { connect, pool } from '@/shared/database';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { UserRepository } from '@/modules/users/repositories/UserRepository';
require('dotenv').config();

async function main() {
    await connect();
    new TripRepository(pool).createTable().then(() => {
        console.log('Trips table created (if not exists)');
    });
    new UserRepository(pool).createTable().then(() => {
        console.log('Users table created (if not exists)');
    });

    const port = process.env.port;
    server.listen(port, () => {
        console.log(`Servidor escutando na porta ${port}`);
    });
}

main();
