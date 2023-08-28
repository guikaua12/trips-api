import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { AppError } from '@/shared/errors/AppError';
import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { TripReservationResponse } from '@/modules/tripReservations/models/TripReservationResponse';
import {
    GetAllTripReservationDTO,
    GetAllTripReservationDTOSchema,
} from '@/modules/tripReservations/dtos/GetAllTripReservationDTO';
import { ZodError } from 'zod';
import { zodToString } from '@/shared/utils';

export class GetAllTripReservationUseCase {
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

        const tripReservationsResponses: TripReservationResponse[] = await Promise.all(
            tripReservations.map(async (tripReservation): Promise<TripReservationResponse> => {
                const trip = await this.tripRepository.getById(tripReservation.tripId);

                return {
                    id: tripReservation.id,
                    trip: trip!,
                    userId: tripReservation.userId,
                    startDate: tripReservation.startDate,
                    endDate: tripReservation.endDate,
                    totalPaid: tripReservation.totalPaid,
                    status: tripReservation.status,
                };
            })
        );

        tripReservationsResponses.sort((a, b) => (a.status === 'cancelled' ? 1 : -1));

        return tripReservationsResponses;
    }

    async execute2(userId: string): Promise<TripReservationResponse[]> {
        const tripReservations = await this.repository.getAllById(userId);

        const tripReservationsResponses: TripReservationResponse[] = await Promise.all(
            tripReservations.map(async (tripReservation): Promise<TripReservationResponse> => {
                const trip = await this.tripRepository.getById(tripReservation.tripId);

                return {
                    id: tripReservation.id,
                    trip: trip!,
                    userId: tripReservation.userId,
                    startDate: tripReservation.startDate,
                    endDate: tripReservation.endDate,
                    totalPaid: tripReservation.totalPaid,
                    status: tripReservation.status,
                };
            })
        );

        tripReservationsResponses.sort((a, b) => (a.status === 'cancelled' ? 1 : -1));

        return tripReservationsResponses;
    }
}
