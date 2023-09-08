import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { TripRepository } from '../repositories/TripRepository';
import { pool } from '@/shared/database';
import { SearchTripUseCase } from './useCase';
import { AppError } from '@/shared/errors/AppError';
import { data } from '@/seed/data';
import { Trip } from '../models/Trip';

describe('SearchTripUseCase test', () => {
    let tripRepositoryMock: TripRepository;

    let searchTripUseCase: SearchTripUseCase;

    beforeEach(() => {
        tripRepositoryMock = new TripRepository(pool);

        searchTripUseCase = new SearchTripUseCase(tripRepositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should not be able to search a trip if no dto property is provided', async () => {
        expect(searchTripUseCase.execute({})).rejects.toEqual(
            new AppError(400, 'Pelo menos um dos campos deve ser preenchido')
        );
    });

    test('should search', async () => {
        const searchManyValue = [data[0], data[1]] as Trip[];

        jest.spyOn(tripRepositoryMock, 'searchMany').mockResolvedValue(searchManyValue);

        expect(
            searchTripUseCase.execute({ location: 'some_location', pricePerDay: 100, recommended: true })
        ).resolves.toEqual(searchManyValue);
    });
});
