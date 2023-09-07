import { describe, test, expect, beforeAll, beforeEach, afterEach, jest } from '@jest/globals';
import { ReserveTripUseCase } from './useCase';
import { ReserveTripDTO } from '@/modules/tripReservations/reserveTrip/dto';
import { TripReservationWithTrip } from '@/modules/tripReservations/models/TripReservationWithTrip';
import { AppError } from '@/shared/errors/AppError';
import { data } from '@/seed/data';
import { TripReservationRepository } from '../repositories/TripReservationRepository';
import { pool } from '@/shared/database';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { Trip } from '@/modules/trips/models/Trip';

describe('ReserveTripUseCase', () => {
    let tripReservationRepositoryMock: TripReservationRepository;
    let tripRepositoryMock: TripRepository;
    let reserveTripUseCase: ReserveTripUseCase;

    beforeEach(() => {
        tripReservationRepositoryMock = new TripReservationRepository(pool);
        tripRepositoryMock = new TripRepository(pool);
        reserveTripUseCase = new ReserveTripUseCase(tripReservationRepositoryMock, tripRepositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should reserve a trip', async () => {
        jest.spyOn(tripRepositoryMock, 'getById').mockReturnValue(new Promise((res) => res(data[0] as Trip)));
        jest.spyOn(tripReservationRepositoryMock, 'getByDateRange').mockReturnValue(new Promise((res) => res(null)));
        jest.spyOn(tripReservationRepositoryMock, 'insert').mockReturnValue(
            new Promise((res) =>
                res({
                    id: '1337',
                    tripId: data[0].id!,
                    userId: 'some_user_id',
                    startDate: new Date(),
                    endDate: new Date(),
                    totalPaid: 100,
                    status: 'confirmed',
                    createdAt: new Date(),
                })
            )
        );

        const trip = await tripRepositoryMock.getById(data[0].id!);

        const reserveData: ReserveTripDTO = {
            tripId: trip!.id,
            userId: 'some_user_id',
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        const result = await reserveTripUseCase.execute(reserveData);

        expect(result).toBeDefined();

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('tripId');
        expect(result).toHaveProperty('trip');
        expect(result).toHaveProperty('userId');
        expect(result).toHaveProperty('startDate');
        expect(result).toHaveProperty('endDate');
        expect(result).toHaveProperty('totalPaid');
        expect(result).toHaveProperty('status');
        expect(result).toHaveProperty('createdAt');
    });

    test('should throw AppError when trip not found', async () => {
        jest.spyOn(tripRepositoryMock, 'getById').mockReturnValue(new Promise((res) => res(null)));

        const reserveData: ReserveTripDTO = {
            tripId: 'some_invalid_trip_id',
            userId: 'some_user_id',
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        await expect(reserveTripUseCase.execute(reserveData)).rejects.toEqual(new AppError(404, 'Trip not found'));
    });

    test('should throw AppError when another trip reservation is found in the same date range', async () => {
        jest.spyOn(tripRepositoryMock, 'getById').mockReturnValue(new Promise((res) => res(data[0] as Trip)));
        jest.spyOn(tripReservationRepositoryMock, 'getByDateRange').mockReturnValue(
            new Promise((res) =>
                res({
                    id: '1337',
                    tripId: data[0].id!,
                    userId: 'some_user_id',
                    startDate: new Date(),
                    endDate: new Date(),
                    totalPaid: 100,
                    status: 'confirmed',
                    createdAt: new Date(),
                })
            )
        );

        const reserveData: ReserveTripDTO = {
            tripId: 'some_invalid_trip_id',
            userId: 'some_user_id',
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        await expect(reserveTripUseCase.execute(reserveData)).rejects.toEqual(
            new AppError(400, 'Trip already reserved in date range')
        );
    });
});
