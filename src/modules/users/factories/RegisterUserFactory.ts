import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { RegisterUserUseCase } from '@/modules/users/useCases/RegisterUserUseCase';
import { RegisterUserController } from '@/modules/users/controllers/RegisterUserController';

export function registerUserFactory() {
    const userRepository = new UserRepository(pool);
    const registerUserUseCase = new RegisterUserUseCase(userRepository);

    return new RegisterUserController(registerUserUseCase);
}
