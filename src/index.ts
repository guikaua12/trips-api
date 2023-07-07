import { server } from '@/shared/server/server';
import { connect, pool } from '@/shared/database';
import { TripRepository } from '@/modules/trips/repositories/impl/TripRepository';
require('dotenv').config();

async function main() {
    await connect();

    const tripRepository = new TripRepository(pool);
    tripRepository.createTable().then(() => {
        console.log('Trips table created (if not exists)');
    });

    const port = process.env.port;
    server.listen(port, () => {
        console.log(`Servidor escutando na porta ${port}`);
    });
}

main();
