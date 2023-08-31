import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { AppError } from '@/shared/errors/AppError';
import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { TripReservationWithTrip } from '@/modules/tripReservations/models/TripReservationWithTrip';
import {
    GetAllTripReservationDTOInput,
    GetAllTripReservationDTOSchema,
} from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationDTO';
import { ZodError } from 'zod';
import { zodToString } from '@/shared/utils';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';

export class GetAllTripReservationByPageUseCase {
    constructor(
        private repository: ITripReservationRepository,
        private tripRepository: ITripRepository
    ) {}
    async execute({
        id,
        sort_by,
        sort_dir,
        limit,
        page_start,
        page_end,
    }: GetAllTripReservationDTOInput): Promise<TripReservationWithTrip[]> {
        const parsed = GetAllTripReservationDTOSchema.safeParse({ id, sort_by, sort_dir, limit, page_start, page_end });

        if (!parsed.success) {
            throw new AppError(400, zodToString(parsed.error));
        }

        const parsedData = parsed.data;

        const tripReservations = await this.repository.getAll({
            ...parsedData,
            id,
        });

        const tripReservationsResponses = await this.mapToResponse(tripReservations);

        return tripReservationsResponses;
    }

    async mapToResponse(tripReservations: TripReservation[]): Promise<TripReservationWithTrip[]> {
        const tripIds = tripReservations.map((tr) => tr.tripId);

        const trips = await this.tripRepository.getAllByIds(tripIds);

        return tripReservations.map((tr): TripReservationWithTrip => {
            const trip = trips.find((t) => t.id === tr.tripId);

            return {
                ...tr,
                trip: trip!,
            };
        });
    }
}
