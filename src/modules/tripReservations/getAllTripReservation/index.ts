import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/getAllTripReservation/useCase';
import { GetAllTripReservationController } from '@/modules/tripReservations/getAllTripReservation/controller';

const tripReservationRepository = new TripReservationRepository(pool);
const tripRepository = new TripRepository(pool);
const getAllTripReservationByPageUseCase = new GetAllTripReservationUseCase(tripReservationRepository, tripRepository);
const getAllTripReservationController = new GetAllTripReservationController(getAllTripReservationByPageUseCase);

export { getAllTripReservationController };
