import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import { UserRepository } from '../repositories/UserRepository';
import { VerifyTokenUseCase } from './useCase';
import { pool } from '@/shared/database';
import { AppError } from '@/shared/errors/AppError';

describe('VerifyTokenUseCase test', () => {
    let userRepositoryMock: UserRepository;

    let verifyTokenUseCase: VerifyTokenUseCase;

    beforeEach(() => {
        userRepositoryMock = new UserRepository(pool);

        verifyTokenUseCase = new VerifyTokenUseCase(userRepositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should throw error if no userId is provided', async () => {
        expect(verifyTokenUseCase.execute(null!)).rejects.toEqual(new AppError(401, 'Unauthorized'));
    });

    test('should throw error if no user is found with provided userId', async () => {
        jest.spyOn(userRepositoryMock, 'search').mockResolvedValue(null);

        expect(verifyTokenUseCase.execute('some_user_id')).rejects.toEqual(new AppError(401, 'Unauthorized'));
    });

    test('should return user', async () => {
        jest.spyOn(userRepositoryMock, 'search').mockResolvedValue({
            id: 'some_id',
            email: 'some_email',
            password: 'some_password',
        });

        expect(verifyTokenUseCase.execute('some_user_id')).resolves.toEqual({
            user: {
                id: 'some_id',
                email: 'some_email',
            },
        });
    });
});
