import { afterAll, beforeAll, beforeEach, describe, expect, test } from '@jest/globals';

import { connect } from '@/shared/database';
import { tripRepository, tripReservationRepository, userRepository } from '@/shared/repositories';
import { RegisterUserDTO } from '@/modules/users/registerUser/RegisterUserDTO';

beforeAll(async () => {
    await connect();
    await tripRepository!.deleteAll();
    await userRepository!.deleteAll();
    await tripReservationRepository!.deleteAll();
});

describe('crud methods', () => {
    beforeEach(() => {
        userRepository!.deleteAll();
    });

    test('should create a user', async () => {
        const dto: RegisterUserDTO = {
            email: 'john@doe.com',
            password: '123',
        };

        const user = await userRepository!.insert(dto);

        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toEqual(dto.email);
    });

    test('should search a user by id', async () => {
        const dto: RegisterUserDTO = {
            email: 'john@doe.com',
            password: '123',
        };

        const user = await userRepository!.insert(dto);

        expect(user).toBeDefined();

        const searchedUser = await userRepository!.search({ id: user.id });
        expect(searchedUser).toEqual(user);
    });

    test('should delete a user by id', async () => {
        // created
        const dto: RegisterUserDTO = {
            email: 'john@doe.com',
            password: '123',
        };

        const user = await userRepository!.insert(dto);

        // deleted
        await userRepository!.deleteById(user.id!);

        // should be null
        const deletedUser = await userRepository!.search({ id: user.id });
        expect(deletedUser).toBeNull();

        const deletedUser2 = await userRepository!.search({ email: user.email });
        expect(deletedUser2).toBeNull();
    });
});

afterAll(async () => {
    await tripRepository!.deleteAll();
    await userRepository!.deleteAll();
    await tripReservationRepository!.deleteAll();
});
