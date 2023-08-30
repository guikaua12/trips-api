import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { ReserveTripUseCase } from '@/modules/tripReservations/reserveTrip/ReserveTripUseCase';
import { ReserveTripController } from '@/modules/tripReservations/reserveTrip/ReserveTripController';

const tripRepository = new TripRepository(pool);
const tripReservationRepository = new TripReservationRepository(pool);
const reserveTripUseCase = new ReserveTripUseCase(tripReservationRepository, tripRepository);
const reserveTripController = new ReserveTripController(reserveTripUseCase);

export { reserveTripController };
