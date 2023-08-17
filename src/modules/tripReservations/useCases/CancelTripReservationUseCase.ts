import { AppError } from '@/shared/errors/AppError';
import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { TripReservationResponse } from '@/modules/tripReservations/models/TripReservationResponse';
import { UpdateTripReservationDTO } from '@/modules/tripReservations/dtos/UpdateTripReservationDTO';
import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';

export class CancelTripReservationUseCase {
    constructor(
        private repository: ITripReservationRepository,
        private tripRepository: ITripRepository
    ) {}
    async execute({ id, userId, status }: UpdateTripReservationDTO): Promise<TripReservationResponse> {
        if (!id) throw new AppError(400, 'Trip reservation id is required');

        const tripReservation = await this.repository.getById(id);
        if (!tripReservation) throw new AppError(404, 'Trip reservation not found');

        if (tripReservation.userId !== userId) {
            throw new AppError(401, 'Unauthorized');
        }

        if (tripReservation.status === 'cancelled') {
            throw new AppError(400, 'Trip reservation already cancelled');
        }

        const trip = await this.tripRepository.getById(tripReservation.tripId);
        if (!trip) {
            throw new AppError(404, 'Trip not found');
        }

        const updatedTripReservation = await this.repository.update({ id, userId, status });
        if (!updatedTripReservation) throw new AppError(404, 'Trip reservation not found');

        return {
            id: updatedTripReservation.id,
            trip,
            userId: updatedTripReservation.userId,
            startDate: updatedTripReservation.startDate,
            endDate: updatedTripReservation.endDate,
            totalPaid: updatedTripReservation.totalPaid,
            status: updatedTripReservation.status,
        };
    }
}
