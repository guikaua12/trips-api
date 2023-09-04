import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { Pool } from 'pg';

let tripRepository: TripRepository | undefined = undefined;
let userRepository: UserRepository | undefined = undefined;
let tripReservationRepository: TripReservationRepository | undefined = undefined;

export function init(pool: Pool) {
    tripRepository = new TripRepository(pool);
    userRepository = new UserRepository(pool);
    tripReservationRepository = new TripReservationRepository(pool);
}

export { tripRepository, userRepository, tripReservationRepository };
