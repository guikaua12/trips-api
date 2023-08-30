import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { GetAllTripReservationController } from '@/modules/tripReservations/controllers/GetAllTripReservationController';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { GetAllTripReservationByPageUseCase } from '@/modules/tripReservations/useCases/GetAllTripReservationByPageUseCase';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/useCases/GetAllTripReservationUseCase';

export function getAllTripReservationFactory() {
    const tripReservationRepository = new TripReservationRepository(pool);
    const tripRepository = new TripRepository(pool);
    const getAllTripReservationByPageUseCase = new GetAllTripReservationByPageUseCase(
        tripReservationRepository,
        tripRepository
    );
    const getAllTripReservationUseCase = new GetAllTripReservationUseCase(tripReservationRepository, tripRepository);
    return new GetAllTripReservationController(getAllTripReservationByPageUseCase, getAllTripReservationUseCase);
}
