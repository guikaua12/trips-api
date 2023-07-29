import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { RegisterUserUseCase } from '@/modules/users/useCases/RegisterUserUseCase';
import { RegisterUserController } from '@/modules/users/controllers/RegisterUserController';
import { SessionRepository } from '@/modules/sessions/repositories/SessionRepository';
import { CreateSessionUseCase } from '@/modules/sessions/useCases/CreateSessionUseCase';

export function registerUserFactory() {
    const userRepository = new UserRepository(pool);
    const registerUserUseCase = new RegisterUserUseCase(userRepository);

    const sessionRepository = new SessionRepository(pool);
    const createSessionUseCase = new CreateSessionUseCase(sessionRepository);

    return new RegisterUserController(registerUserUseCase, createSessionUseCase);
}
