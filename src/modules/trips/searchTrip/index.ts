import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { SearchTripUseCase } from '@/modules/trips/searchTrip/useCase';
import { SearchTripController } from '@/modules/trips/searchTrip/controller';

const tripRepository = new TripRepository(pool);
const searchTripUseCase = new SearchTripUseCase(tripRepository);
const searchTripController = new SearchTripController(searchTripUseCase);

export { searchTripController };
