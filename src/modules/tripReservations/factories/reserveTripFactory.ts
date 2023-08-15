import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { ReserveTripUseCase } from '@/modules/tripReservations/useCases/ReserveTripUseCase';
import { ReserveTripController } from '@/modules/tripReservations/controllers/ReserveTripController';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';

export function reserveTripFactory() {
    const tripRepository = new TripRepository(pool);
    const tripReservationRepository = new TripReservationRepository(pool);
    const reserveTripUseCase = new ReserveTripUseCase(tripReservationRepository, tripRepository);
    return new ReserveTripController(reserveTripUseCase);
}
