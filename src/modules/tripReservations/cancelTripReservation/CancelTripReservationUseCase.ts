import { AppError } from '@/shared/errors/AppError';
import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { TripReservationWithTrip } from '@/modules/tripReservations/models/TripReservationWithTrip';
import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import {
    CancelTripReservationDTO,
    CancelTripReservationDTOSchema,
} from '@/modules/tripReservations/cancelTripReservation/CancelTripReservationDTO';
import { ZodError } from 'zod';
import { zodToString } from '@/shared/utils';

export class CancelTripReservationUseCase {
    constructor(
        private repository: ITripReservationRepository,
        private tripRepository: ITripRepository
    ) {}
    async execute({ tripId, userId }: CancelTripReservationDTO): Promise<TripReservationWithTrip> {
        try {
            CancelTripReservationDTOSchema.parse({ tripId, userId });
        } catch (err) {
            if (err instanceof ZodError) {
                throw new AppError(400, zodToString(err));
            }
        }

        const tripReservation = await this.repository.getById(tripId);
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

        const updatedTripReservation = await this.repository.update({ id: tripId, userId, status: 'cancelled' });
        if (!updatedTripReservation) throw new AppError(404, 'Trip reservation not found');

        return {
            ...updatedTripReservation,
            trip: trip,
        };
    }
}
