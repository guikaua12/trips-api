import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { CancelTripReservationUseCase } from '@/modules/tripReservations/cancelTripReservation/useCase';
import { CancelTripReservationController } from '@/modules/tripReservations/cancelTripReservation/controller';

const tripReservationRepository = new TripReservationRepository(pool);
const tripRepository = new TripRepository(pool);
const cancelTripReservationUseCase = new CancelTripReservationUseCase(tripReservationRepository, tripRepository);
const cancelTripReservationController = new CancelTripReservationController(cancelTripReservationUseCase);

export { cancelTripReservationController };
