import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { Trip } from '@/modules/trips/models/Trip';
import { AppError } from '@/shared/errors/AppError';

export class GetTripUseCase {
    constructor(private tripRepository: ITripRepository) {}

    async execute(id: string): Promise<Trip> {
        if (!id) throw new AppError(400, 'Invalid id');

        const trip = await this.tripRepository.getById(id);

        if (!trip) throw new AppError(404, 'Trip not found');

        return trip;
    }
}
