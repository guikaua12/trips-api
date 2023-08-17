import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/useCases/GetAllTripReservationUseCase';
import { GetAllTripReservationController } from '@/modules/tripReservations/controllers/GetAllTripReservationController';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';

export function getAllTripReservationFactory() {
    const tripReservationRepository = new TripReservationRepository(pool);
    const tripRepository = new TripRepository(pool);
    const getAllTripReservationUseCase = new GetAllTripReservationUseCase(tripReservationRepository, tripRepository);
    return new GetAllTripReservationController(getAllTripReservationUseCase);
}
