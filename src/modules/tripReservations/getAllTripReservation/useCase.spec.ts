import { data } from '@/seed/data';
import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { GetAllTripReservationUseCase } from './useCase';
import { TripReservationRepository } from '../repositories/TripReservationRepository';
import { TripRepository } from '@/modules/trips/repositories/TripRepository';
import { pool } from '@/shared/database';
import { TripReservation } from '../models/TripReservation';

describe('GetAllTripReservationUseCase test', () => {
    let tripReservationRepositoryMock: TripReservationRepository;
    let tripRepositoryMock: TripRepository;

    let getAllTripReservationUseCase: GetAllTripReservationUseCase;

    beforeEach(() => {
        tripReservationRepositoryMock = new TripReservationRepository(pool);
        tripRepositoryMock = new TripRepository(pool);

        getAllTripReservationUseCase = new GetAllTripReservationUseCase(
            tripReservationRepositoryMock,
            tripRepositoryMock
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should get all trip reservations', async () => {
        const searchManyValue: TripReservation[] = [
            {
                id: '1337',
                tripId: data[0].id!,
                userId: 'correct_owner_id',
                startDate: new Date('2023-09-01'),
                endDate: new Date('2023-09-05'),
                totalPaid: 100,
                status: 'cancelled',
                createdAt: new Date(),
            },
            {
                id: '1337',
                tripId: data[0].id!,
                userId: 'correct_owner_id',
                startDate: new Date('2023-09-06'),
                endDate: new Date('2023-09-10'),
                totalPaid: 100,
                status: 'cancelled',
                createdAt: new Date(),
            },
        ];
        jest.spyOn(tripReservationRepositoryMock, 'searchMany').mockResolvedValue(searchManyValue);

        const response = await getAllTripReservationUseCase.execute({
            id: 'correct_owner_id',
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'desc',
        });

        expect(response).toBeDefined();
        expect(response).toHaveProperty('tripReservations');
        expect(response.tripReservations[0].id).toEqual(searchManyValue[0].id);
        expect(response.tripReservations[1].id).toEqual(searchManyValue[1].id);
    });

    test('should return ordered trip reservations using desc', async () => {
        const searchManyValue: TripReservation[] = [
            {
                id: '1337',
                tripId: data[0].id!,
                userId: 'correct_owner_id',
                startDate: new Date('2023-09-06'),
                endDate: new Date('2023-09-10'),
                totalPaid: 100,
                status: 'cancelled',
                createdAt: new Date('2023-09-06'),
            },
            {
                id: '1337',
                tripId: data[0].id!,
                userId: 'correct_owner_id',
                startDate: new Date('2023-09-01'),
                endDate: new Date('2023-09-05'),
                totalPaid: 100,
                status: 'cancelled',
                createdAt: new Date('2023-09-01'),
            },
        ];
        jest.spyOn(tripReservationRepositoryMock, 'searchMany').mockResolvedValue(searchManyValue);

        const response = await getAllTripReservationUseCase.execute({
            id: 'correct_owner_id',
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'desc',
        });

        expect(response).toBeDefined();
        expect(response.tripReservations[0].id).toEqual(searchManyValue[0].id);
        expect(response.tripReservations[1].id).toEqual(searchManyValue[1].id);
    });

    test('should return ordered trip reservations using asc', async () => {
        const searchManyValue: TripReservation[] = [
            {
                id: '1337',
                tripId: data[0].id!,
                userId: 'correct_owner_id',
                startDate: new Date('2023-09-01'),
                endDate: new Date('2023-09-05'),
                totalPaid: 100,
                status: 'cancelled',
                createdAt: new Date('2023-09-01'),
            },
            {
                id: '1337',
                tripId: data[0].id!,
                userId: 'correct_owner_id',
                startDate: new Date('2023-09-06'),
                endDate: new Date('2023-09-10'),
                totalPaid: 100,
                status: 'cancelled',
                createdAt: new Date('2023-09-06'),
            },
        ];
        jest.spyOn(tripReservationRepositoryMock, 'searchMany').mockResolvedValue(searchManyValue);

        const response = await getAllTripReservationUseCase.execute({
            id: 'correct_owner_id',
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'asc',
        });

        expect(response).toBeDefined();
        expect(response.tripReservations[0].id).toEqual(searchManyValue[0].id);
        expect(response.tripReservations[1].id).toEqual(searchManyValue[1].id);
    });
});
