import { ReserveTripDTO, ReserveTripDTOSchema } from '@/modules/tripReservations/dtos/ReserveTripDTO';
import { ZodError } from 'zod';
import { AppError } from '@/shared/errors/AppError';
import { zodToString } from '@/shared/utils';
import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { TripReservationResponse } from '@/modules/tripReservations/models/TripReservationResponse';

export class ReserveTripUseCase {
    constructor(
        private tripReservationRepository: ITripReservationRepository,
        private tripRepository: ITripRepository
    ) {}
    async execute({ tripId, userId, startDate, endDate, totalPaid }: ReserveTripDTO): Promise<TripReservationResponse> {
        try {
            ReserveTripDTOSchema.parse({ tripId, userId, startDate, endDate, totalPaid });
        } catch (err) {
            if (err instanceof ZodError) {
                throw new AppError(400, zodToString(err));
            }
        }

        // verifications
        const tripExists = await this.tripRepository.getById(tripId);
        if (!tripExists) throw new AppError(404, 'Trip not found');

        const hasTripInDateRange = await this.tripReservationRepository.getByDateRange(tripId, startDate, endDate);
        if (hasTripInDateRange) throw new AppError(400, 'Trip already reserved in date range');

        // create
        const tripReservation = await this.tripReservationRepository.create({
            tripId,
            userId,
            startDate,
            endDate,
            totalPaid,
        });

        const trip = await this.tripRepository.getById(tripId);
        const tripReservationResponse: TripReservationResponse = {
            id: tripReservation.id,
            trip: trip!,
            userId: tripReservation.userId,
            startDate: tripReservation.startDate,
            endDate: tripReservation.endDate,
            totalPaid: tripReservation.totalPaid,
        };

        return tripReservationResponse;
    }
}
