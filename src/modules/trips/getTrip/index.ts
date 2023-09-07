import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { GetTripUseCase } from '@/modules/trips/getTrip/useCase';
import { GetTripController } from '@/modules/trips/getTrip/controller';

const tripRepository = new TripRepository(pool);
const getTripUseCase = new GetTripUseCase(tripRepository);
const getTripController = new GetTripController(getTripUseCase);

export { getTripController };
