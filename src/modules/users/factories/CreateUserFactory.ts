import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { CreateUserUseCase } from '@/modules/users/useCases/CreateUserUseCase';
import { CreateUserController } from '@/modules/users/controllers/CreateUserController';

export function createUserFactory() {
    const userRepository = new UserRepository(pool);
    const createUserUseCase = new CreateUserUseCase(userRepository);
    return new CreateUserController(createUserUseCase);
}
