import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { CreateUserUseCase } from '@/modules/users/useCases/CreateUserUseCase';
import { CreateUserController } from '@/modules/users/controllers/CreateUserController';
import { SessionRepository } from '@/modules/sessions/repositories/SessionRepository';
import { CreateSessionUseCase } from '@/modules/sessions/useCases/CreateSessionUseCase';

export function createUserFactory() {
    const userRepository = new UserRepository(pool);
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const sessionRepository = new SessionRepository(pool);
    const createSessionUseCase = new CreateSessionUseCase(sessionRepository);

    return new CreateUserController(createUserUseCase, createSessionUseCase);
}
