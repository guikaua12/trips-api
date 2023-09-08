import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import { UserRepository } from '../repositories/UserRepository';
import { IGenerateToken } from '../generateToken/IGenerateToken';
import { RegisterUserUseCase } from './useCase';
import { pool } from '@/shared/database';
import { JwtGenerateToken } from '../generateToken/JwtGenerateToken';
import { AppError } from '@/shared/errors/AppError';

describe('RegisterUserUseCase test', () => {
    let userRepositoryMock: UserRepository;

    let generateToken: IGenerateToken;

    let registerUserUseCase: RegisterUserUseCase;

    beforeEach(() => {
        userRepositoryMock = new UserRepository(pool);

        generateToken = new JwtGenerateToken();

        registerUserUseCase = new RegisterUserUseCase(userRepositoryMock, generateToken);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should a user already exists with that email', async () => {
        jest.spyOn(userRepositoryMock, 'search').mockResolvedValue({
            id: 'some_id',
            email: 'email@email.com',
            password: 'password',
        });

        expect(registerUserUseCase.execute({ email: 'email@email.com', password: 'password' })).rejects.toEqual(
            new AppError(409, 'User already exists')
        );
    });

    test('should register user', async () => {
        jest.spyOn(userRepositoryMock, 'search').mockResolvedValue(null);
        jest.spyOn(userRepositoryMock, 'insert').mockResolvedValue({
            id: 'some_id',
            email: 'email@email.com',
            password: 'password',
        });
        jest.spyOn(generateToken, 'generate').mockReturnValue('some_generated_token');

        expect(registerUserUseCase.execute({ email: 'email@email.com', password: 'password' })).resolves.toEqual({
            user: {
                id: 'some_id',
                email: 'email@email.com',
            },
            token: 'some_generated_token',
        });
    });
});
