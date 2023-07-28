import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { SearchTripDTO } from '@/modules/trips/dtos/SearchTripDTO';
import { Trip } from '@/modules/trips/models/Trip';
import { AppError } from '@/shared/errors/AppError';

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

        return this.tripRepository.search({ location, startDate, pricePerDay, recommended });
    }
}
