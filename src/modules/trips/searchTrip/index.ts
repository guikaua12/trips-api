import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { SearchTripUseCase } from '@/modules/trips/searchTrip/SearchTripUseCase';
import { SearchTripController } from '@/modules/trips/searchTrip/SearchTripController';

const tripRepository = new TripRepository(pool);
const searchTripUseCase = new SearchTripUseCase(tripRepository);
const searchTripController = new SearchTripController(searchTripUseCase);

export { searchTripController };
