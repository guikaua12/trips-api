import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';
import { AppError } from '@/shared/errors/AppError';

export class GetAllTripReservationUseCase {
    constructor(private repository: ITripReservationRepository) {}
    async execute(userId: string): Promise<TripReservation[]> {
        if (!userId) throw new AppError(400, 'User id is required');

        return await this.repository.getAll(userId);
    }
}
