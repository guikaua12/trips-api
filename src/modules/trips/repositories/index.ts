import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';

const tripRepository = new TripRepository(pool);
const userRepository = new UserRepository(pool);
const tripReservationRepository = new TripReservationRepository(pool);

export { tripRepository, userRepository, tripReservationRepository };
