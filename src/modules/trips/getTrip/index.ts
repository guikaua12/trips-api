import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { GetTripUseCase } from '@/modules/trips/getTrip/GetTripUseCase';
import { GetTripController } from '@/modules/trips/getTrip/GetTripController';

const tripRepository = new TripRepository(pool);
const getTripUseCase = new GetTripUseCase(tripRepository);
const getTripController = new GetTripController(getTripUseCase);

export { getTripController };
