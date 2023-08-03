import { ISessionRepository } from '@/modules/sessions/repositories/ISessionRepository';
import { SessionRepository } from '@/modules/sessions/repositories/SessionRepository';
import { pool } from '@/shared/database';
import { VerifySessionUseCase } from '@/modules/sessions/useCases/VerifySessionUseCase';
import { VerifySessionController } from '@/modules/sessions/controllers/VerifySessionController';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { UserRepository } from '@/modules/users/repositories/UserRepository';

export function verifySessionFactory() {
    const sessionRepository: ISessionRepository = new SessionRepository(pool);
    const userRepository: IUserRepository = new UserRepository(pool);
    const verifySessionUseCase = new VerifySessionUseCase(sessionRepository, userRepository);
    return new VerifySessionController(verifySessionUseCase);
}
