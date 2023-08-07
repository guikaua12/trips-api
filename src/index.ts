import { server } from '@/shared/server/server';
import { connect, pool } from '@/shared/database';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { UserRepository } from '@/modules/users/repositories/UserRepository';
require('dotenv').config();

async function main() {
    await connect();
    await new TripRepository(pool).createTable();
    await new UserRepository(pool).createTable();

    const port = process.env.port;
    server.listen(port, () => {
        console.log(`Servidor escutando na porta ${port}`);
    });
}

main();
