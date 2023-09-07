import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { CancelTripReservationUseCase } from './useCase';
import { AppError } from '@/shared/errors/AppError';
import { data } from '@/seed/data';
import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { TripReservationRepository } from '@/modules/tripReservations/repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { Trip } from '@/modules/trips/models/Trip';
import { TripReservation } from '../models/TripReservation';

describe('CancelTripReservationUseCase test', () => {
    let userRepositoryMock: UserRepository;
    let tripRepositoryMock: TripRepository;
    let tripReservationRepositoryMock: TripReservationRepository;

    let cancelTripReservationUseCase: CancelTripReservationUseCase;

    beforeEach(async () => {
        userRepositoryMock = new UserRepository(pool);
        tripRepositoryMock = new TripRepository(pool);
        tripReservationRepositoryMock = new TripReservationRepository(pool);

        cancelTripReservationUseCase = new CancelTripReservationUseCase(
            tripReservationRepositoryMock,
            tripRepositoryMock
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should not be able to cancel a trip reservation if it does not exists', async () => {
        jest.spyOn(tripReservationRepositoryMock, 'getById').mockResolvedValue(null);

        await expect(
            cancelTripReservationUseCase.execute({ tripId: 'some_trip_id', userId: 'some_user_id' })
        ).rejects.toEqual(new AppError(404, 'Trip reservation not found'));
    });

    test('should not be able to cancel a trip reservation if the trip owner is not the same as the requester', async () => {
        jest.spyOn(tripReservationRepositoryMock, 'getById').mockResolvedValue({
            id: '1337',
            tripId: data[0].id!,
            userId: 'correct_owner_id',
            startDate: new Date(),
            endDate: new Date(),
            totalPaid: 100,
            status: 'confirmed',
            createdAt: new Date(),
        });

        await expect(
            cancelTripReservationUseCase.execute({ tripId: '1337', userId: 'some_wrong_user_id' })
        ).rejects.toEqual(new AppError(401, 'Unauthorized'));
    });

    test('should not be able to cancel a trip reservation if it is already cancelled', async () => {
        jest.spyOn(tripReservationRepositoryMock, 'getById').mockResolvedValue({
            id: '1337',
            tripId: data[0].id!,
            userId: 'correct_owner_id',
            startDate: new Date(),
            endDate: new Date(),
            totalPaid: 100,
            status: 'cancelled',
            createdAt: new Date(),
        });

        await expect(
            cancelTripReservationUseCase.execute({ tripId: '1337', userId: 'correct_owner_id' })
        ).rejects.toEqual(new AppError(400, 'Trip reservation already cancelled'));
    });

    test('should not be able to cancel a trip reservation if the TRIP does not exist', async () => {
        jest.spyOn(tripReservationRepositoryMock, 'getById').mockResolvedValue({
            id: '1337',
            tripId: data[0].id!,
            userId: 'correct_owner_id',
            startDate: new Date(),
            endDate: new Date(),
            totalPaid: 100,
            status: 'confirmed',
            createdAt: new Date(),
        });
        jest.spyOn(tripRepositoryMock, 'getById').mockResolvedValue(null);

        await expect(
            cancelTripReservationUseCase.execute({ tripId: '1337', userId: 'correct_owner_id' })
        ).rejects.toEqual(new AppError(404, 'Trip not found'));
    });

    test('should be able to cancel a trip reservation', async () => {
        jest.spyOn(tripReservationRepositoryMock, 'getById').mockResolvedValue({
            id: '1337',
            tripId: data[0].id!,
            userId: 'correct_owner_id',
            startDate: new Date(),
            endDate: new Date(),
            totalPaid: 100,
            status: 'confirmed',
            createdAt: new Date(),
        });
        const updatedTripReservation: TripReservation = {
            id: '1337',
            tripId: data[0].id!,
            userId: 'correct_owner_id',
            startDate: new Date(),
            endDate: new Date(),
            totalPaid: 100,
            status: 'cancelled',
            createdAt: new Date(),
        };
        jest.spyOn(tripReservationRepositoryMock, 'update').mockResolvedValue(updatedTripReservation);
        jest.spyOn(tripRepositoryMock, 'getById').mockResolvedValue(data[0] as Trip);

        await expect(
            cancelTripReservationUseCase.execute({ tripId: '1337', userId: 'correct_owner_id' })
        ).resolves.toEqual({ ...updatedTripReservation, trip: data[0] as Trip });
    });
});
