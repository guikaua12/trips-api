import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { TripRepository } from '../repositories/TripRepository';
import { pool } from '@/shared/database';
import { GetTripUseCase } from './useCase';
import { AppError } from '@/shared/errors/AppError';
import { data } from '@/seed/data';
import { Trip } from '../models/Trip';

describe('GetTripUseCase test', () => {
    let tripRepositoryMock: TripRepository;

    let getTripUseCase: GetTripUseCase;

    beforeEach(() => {
        tripRepositoryMock = new TripRepository(pool);

        getTripUseCase = new GetTripUseCase(tripRepositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should not be able to get a trip if no id is provided', async () => {
        expect(getTripUseCase.execute(null!)).rejects.toEqual(new AppError(400, 'Invalid id'));
    });

    test('should not be able to get a trip if the trip does not exists on database', async () => {
        jest.spyOn(tripRepositoryMock, 'getById').mockResolvedValue(null);

        expect(getTripUseCase.execute('some id')).rejects.toEqual(new AppError(404, 'Trip not found'));
    });

    test('should return a found trip', async () => {
        jest.spyOn(tripRepositoryMock, 'getById').mockResolvedValue(data[0] as Trip);

        expect(getTripUseCase.execute('some id')).resolves.toEqual(data[0]);
    });
});
