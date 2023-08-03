import { ISessionRepository } from '@/modules/sessions/repositories/ISessionRepository';
import { SessionRepository } from '@/modules/sessions/repositories/SessionRepository';
import { pool } from '@/shared/database';
import { VerifySessionUseCase } from '@/modules/sessions/useCases/VerifySessionUseCase';
import { VerifySessionController } from '@/modules/sessions/controllers/VerifySessionController';

export function verifySessionFactory() {
    const sessionRepository: ISessionRepository = new SessionRepository(pool);
    const verifySessionUseCase = new VerifySessionUseCase(sessionRepository);
    return new VerifySessionController(verifySessionUseCase);
}
