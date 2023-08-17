import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { AppError } from '@/shared/errors/AppError';
import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { TripReservationResponse } from '@/modules/tripReservations/models/TripReservationResponse';

export class GetAllTripReservationUseCase {
    constructor(
        private repository: ITripReservationRepository,
        private tripRepository: ITripRepository
    ) {}
    async execute(userId: string): Promise<TripReservationResponse[]> {
        if (!userId) throw new AppError(400, 'User id is required');

        const tripReservations = await this.repository.getAll(userId);
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

        return tripReservationsResponses;
    }
}
