import { tripRepository, tripReservationRepository, userRepository } from '@/shared/repositories';
import { describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import { CancelTripReservationUseCase } from './CancelTripReservationUseCase';
import { AppError } from '@/shared/errors/AppError';
import { data } from '@/seed/data';
import { disconnect, connect } from '@/shared/database';

beforeAll(async () => {
    await connect();
});

describe('CancelTripReservationUseCase test', () => {
    let cancelTripReservationUseCase;

    beforeEach(async () => {
        userRepository!.deleteAll();
        tripRepository!.deleteAll();
        tripReservationRepository!.deleteAll();
        cancelTripReservationUseCase = new CancelTripReservationUseCase(tripReservationRepository!, tripRepository!);
    });

    test('should not be able to cancel a trip reservation if it does not exists', async () => {
        const userId = 'userId';
        const tripReservationId = 'tripReservationId';

        await expect(cancelTripReservationUseCase!.execute({ tripId: tripReservationId, userId })).rejects.toEqual(
            new AppError(404, 'Trip reservation not found')
        );
    });

    test('should not be able to cancel a trip reservation if the trip owner is not the same as the requester', async () => {
        const trip = await tripRepository!.insert(data[0]);
        const user = await userRepository!.insert({ email: 'john@doe.com', password: '123' });
        const tripReservation = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        await expect(
            cancelTripReservationUseCase!.execute({ tripId: tripReservation.id, userId: 'some_wrong_user_id' })
        ).rejects.toEqual(new AppError(401, 'Unauthorized'));
    });

    test('should not be able to cancel a trip reservation if the trip is already cancelled', async () => {
        const trip = await tripRepository!.insert(data[0]);
        const user = await userRepository!.insert({ email: 'john@doe.com', password: '123' });
        const tripReservation = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        await cancelTripReservationUseCase!.execute({ tripId: tripReservation.id, userId: user.id });

        await expect(
            cancelTripReservationUseCase!.execute({ tripId: tripReservation.id, userId: user.id })
        ).rejects.toEqual(new AppError(400, 'Trip reservation already cancelled'));
    });

    test('should be able to cancel a trip reservation', async () => {
        const trip = await tripRepository!.insert(data[0]);
        const user = await userRepository!.insert({ email: 'john@doe.com', password: '123' });
        const tripReservation = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        await expect(
            cancelTripReservationUseCase!.execute({ tripId: tripReservation.id, userId: user.id })
        ).resolves.toEqual({
            id: tripReservation.id,
            tripId: trip.id,
            trip,
            userId: user.id,
            startDate: tripReservation.startDate,
            endDate: tripReservation.endDate,
            totalPaid: tripReservation.totalPaid,
            status: 'cancelled',
            createdAt: tripReservation.createdAt,
        });
    });
});

afterAll(() => {
    userRepository!.deleteAll();
    tripRepository!.deleteAll();
    tripReservationRepository!.deleteAll();
    disconnect();
});
