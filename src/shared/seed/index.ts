import { connect, pool } from '@/shared/database';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { data } from './data';
import * as process from 'process';

async function main() {
    await connect();

    const tripRepository = new TripRepository(pool);
    await tripRepository.insertMany(data);

    console.log('Created trips.');
    process.exit(0);
}

main();
