import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/useCases/GetAllTripReservationUseCase';
import { GetAllTripReservationController } from '@/modules/tripReservations/controllers/GetAllTripReservationController';

export function getAllTripReservationFactory() {
    const tripReservationRepository = new TripReservationRepository(pool);
    const getAllTripReservationUseCase = new GetAllTripReservationUseCase(tripReservationRepository);
    return new GetAllTripReservationController(getAllTripReservationUseCase);
}
