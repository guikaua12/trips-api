import { pool } from '@/shared/database';
import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { CancelTripReservationUseCase } from '@/modules/tripReservations/useCases/CancelTripReservationUseCase';
import { CancelTripReservationController } from '@/modules/tripReservations/controllers/CancelTripReservationController';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';

export function cancelTripReservationFactory() {
    const tripReservationRepository = new TripReservationRepository(pool);
    const tripRepository = new TripRepository(pool);
    const cancelTripReservationUseCase = new CancelTripReservationUseCase(tripReservationRepository, tripRepository);
    return new CancelTripReservationController(cancelTripReservationUseCase);
}
