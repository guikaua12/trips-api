import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { LoginUserUseCase } from '@/modules/users/useCases/LoginUserUseCase';
import { LoginUserController } from '@/modules/users/controllers/LoginUserController';
import { CreateSessionUseCase } from '@/modules/sessions/useCases/CreateSessionUseCase';
import { SessionRepository } from '@/modules/sessions/repositories/SessionRepository';

export function loginUserFactory() {
    const userRepository = new UserRepository(pool);
    const loginUserUseCase = new LoginUserUseCase(userRepository);

    const sessionRepository = new SessionRepository(pool);
    const createSessionUseCase = new CreateSessionUseCase(sessionRepository);

    return new LoginUserController(loginUserUseCase, createSessionUseCase);
}
