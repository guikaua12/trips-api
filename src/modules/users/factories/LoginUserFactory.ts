import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { LoginUserUseCase } from '@/modules/users/useCases/LoginUserUseCase';
import { LoginUserController } from '@/modules/users/controllers/LoginUserController';

export function loginUserFactory() {
    const userRepository = new UserRepository(pool);
    const loginUserUseCase = new LoginUserUseCase(userRepository);

    return new LoginUserController(loginUserUseCase);
}
