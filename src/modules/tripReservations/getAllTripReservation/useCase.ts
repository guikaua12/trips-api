import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { AppError } from '@/shared/errors/AppError';
import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { TripReservationWithTrip } from '@/modules/tripReservations/models/TripReservationWithTrip';
import {
    GetAllTripReservationDTOInput,
    GetAllTripReservationDTOSchema,
} from '@/modules/tripReservations/getAllTripReservation/dto';
import { zodToString } from '@/shared/utils';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';

export type GetAllTripReservationReponse = {
    tripReservations: TripReservationWithTrip[];
    pages: number;
};

export class GetAllTripReservationUseCase {
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
    }: GetAllTripReservationDTOInput): Promise<GetAllTripReservationReponse> {
        const parsed = GetAllTripReservationDTOSchema.safeParse({ id, sort_by, sort_dir, limit, page_start, page_end });

        if (!parsed.success) {
            throw new AppError(400, zodToString(parsed.error));
        }

        const parsedData = parsed.data;

        // original trip reservations
        const tripReservations = await this.repository.searchMany({
            ...parsedData,
            id,
        });

        // response trip reservations
        const tripReservationsResponses = await this.mapToResponse(tripReservations);

        // get total pages
        const allTripReservations = await this.repository.getAllByUserId(id);
        const pages = Math.ceil(allTripReservations.length / parsedData.limit);

        return {
            tripReservations: tripReservationsResponses,
            pages,
        };
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
