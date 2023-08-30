import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { GetAllTripReservationByPageUseCase } from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationByPageUseCase';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationUseCase';
import { GetAllTripReservationController } from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationController';

const tripReservationRepository = new TripReservationRepository(pool);
const tripRepository = new TripRepository(pool);
const getAllTripReservationByPageUseCase = new GetAllTripReservationByPageUseCase(
    tripReservationRepository,
    tripRepository
);
const getAllTripReservationUseCase = new GetAllTripReservationUseCase(tripReservationRepository, tripRepository);
const getAllTripReservationController = new GetAllTripReservationController(
    getAllTripReservationByPageUseCase,
    getAllTripReservationUseCase
);

export { getAllTripReservationController };
