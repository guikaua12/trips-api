import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { SearchTripDTO, SearchTripDTOSchema } from '@/modules/trips/searchTrip/SearchTripDTO';
import { Trip } from '@/modules/trips/models/Trip';
import { AppError } from '@/shared/errors/AppError';
import { ZodError } from 'zod';
import { zodToString } from '@/shared/utils';

export class SearchTripUseCase {
    constructor(private tripRepository: ITripRepository) {}

    async execute({ location, startDate, pricePerDay, recommended }: SearchTripDTO): Promise<Trip[]> {
        try {
            SearchTripDTOSchema.parse({ location, startDate, pricePerDay, recommended });
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(400, zodToString(error));
            }
        }

        return this.tripRepository.searchMany({ location, startDate, pricePerDay, recommended });
    }
}
