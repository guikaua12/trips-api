import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { SearchTripDTO } from '@/modules/trips/dtos/SearchTripDTO';
import { Trip } from '@/modules/trips/models/Trip';
import { AppError } from '@/shared/errors/AppError';

export class SearchTripUseCase {
    constructor(private tripRepository: ITripRepository) {}

    async execute({ location, startDate, pricePerDay, recommended }: SearchTripDTO): Promise<Trip[]> {
        if (location && typeof location !== 'string') throw new AppError(400, 'Invalid location type');
        if (startDate && typeof startDate !== 'object') throw new AppError(400, 'Invalid startDate type');
        if (pricePerDay && typeof pricePerDay !== 'number') throw new AppError(400, 'Invalid pricePerDay type');
        if (typeof recommended !== 'undefined' && typeof recommended !== 'boolean')
            throw new AppError(400, 'Invalid recommended type');

        return this.tripRepository.search({ location, startDate, pricePerDay, recommended });
    }
}
