import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import { UserRepository } from '../repositories/UserRepository';
import { LoginUserUseCase } from './useCase';
import { pool } from '@/shared/database';
import { AppError } from '@/shared/errors/AppError';
import { BcryptPasswordVerify } from '../passwordVerify/BcryptPasswordVerify';
import { IPasswordVerify } from '../passwordVerify/IPasswordVerify';
import { User } from '../models/User';

describe('LoginUserUseCase test', () => {
    let userRepositoryMock: UserRepository;

    let passwordVerify: IPasswordVerify;

    let loginUserUseCase: LoginUserUseCase;

    beforeEach(() => {
        userRepositoryMock = new UserRepository(pool);

        passwordVerify = new BcryptPasswordVerify();

        loginUserUseCase = new LoginUserUseCase(userRepositoryMock, passwordVerify);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should not login user if user does not exists by email', async () => {
        jest.spyOn(userRepositoryMock, 'search').mockResolvedValue(null);

        expect(loginUserUseCase.execute({ email: 'email@email.com', password: 'password' })).rejects.toEqual(
            new AppError(404, 'User not found')
        );
    });

    test('should not login user if invalid password', async () => {
        const searchValue = {
            id: 'some_id',
            email: 'email@email.com',
            password: 'password',
        } as User;

        jest.spyOn(userRepositoryMock, 'search').mockResolvedValue(searchValue);
        jest.spyOn(passwordVerify, 'verify').mockResolvedValue(false);

        expect(loginUserUseCase.execute({ email: 'email@email.com', password: 'password' })).rejects.toEqual(
            new AppError(401, 'Invalid password')
        );
    });

    test('should login user', async () => {
        const searchValue = {
            id: 'some_id',
            email: 'email@email.com',
            password: 'password',
        } as User;

        jest.spyOn(userRepositoryMock, 'search').mockResolvedValue(searchValue);
        jest.spyOn(passwordVerify, 'verify').mockResolvedValue(true);

        expect(loginUserUseCase.execute({ email: 'email@email.com', password: 'password' })).resolves.toEqual(
            searchValue
        );
    });
});
