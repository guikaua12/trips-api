import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { GetTripUseCase } from '@/modules/trips/useCases/GetTripUseCase';
import { GetTripController } from '@/modules/trips/controllers/GetTripController';

export function getTripFactory() {
    const tripRepository = new TripRepository(pool);
    const getTripUseCase = new GetTripUseCase(tripRepository);
    const getTripController = new GetTripController(getTripUseCase);

    return getTripController;
}
