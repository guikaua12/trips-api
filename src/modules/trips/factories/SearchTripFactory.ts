import { TripRepository } from '@/modules/trips/repositories/impl/TripRepository';
import { pool } from '@/shared/database';
import { SearchTripUseCase } from '@/modules/trips/useCases/SearchTripUseCase';
import { SearchTripController } from '@/modules/trips/controllers/SearchTripController';

export function searchTripFactory() {
    const tripRepository = new TripRepository(pool);
    const searchTripUseCase = new SearchTripUseCase(tripRepository);
    const searchTripController = new SearchTripController(searchTripUseCase);

    return searchTripController;
}
