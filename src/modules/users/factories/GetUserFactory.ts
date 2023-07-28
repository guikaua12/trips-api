import { GetUserController } from '@/modules/users/controllers/GetUserController';
import { GetUserUseCase } from '@/modules/users/useCases/GetUserUseCase';
import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';

export function getUserFactory() {
    const userRepository = new UserRepository(pool);
    const getUserUseCase = new GetUserUseCase(userRepository);
    return new GetUserController(getUserUseCase);
}
