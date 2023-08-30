import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { AppError } from '@/shared/errors/AppError';
import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { TripReservationResponse } from '@/modules/tripReservations/models/TripReservationResponse';
import {
    GetAllTripReservationDTO,
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
    async execute({ id, page }: GetAllTripReservationDTO): Promise<TripReservationResponse[]> {
        try {
            GetAllTripReservationDTOSchema.parse({ id, page });
        } catch (err) {
            if (err instanceof ZodError) {
                throw new AppError(400, zodToString(err));
            }
        }

        const tripReservations = await this.repository.getAll({ id, page });

        const tripReservationsResponses = await this.mapToResponse(tripReservations);

        tripReservationsResponses.sort((a, b) => (a.status === 'cancelled' ? 1 : -1));

        return tripReservationsResponses;
    }

    async mapToResponse(tripReservations: TripReservation[]): Promise<TripReservationResponse[]> {
        const tripIds = tripReservations.map((tr) => tr.tripId);

        const trips = await this.tripRepository.getAllByIds(tripIds);

        return tripReservations.map((tr) => {
            const trip = trips.find((t) => t.id === tr.tripId);

            return {
                id: tr.id,
                trip: trip!,
                userId: tr.userId,
                startDate: tr.startDate,
                endDate: tr.endDate,
                totalPaid: tr.totalPaid,
                status: tr.status,
            };
        });
    }
}
