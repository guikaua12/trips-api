import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { VerifyTokenUseCase } from '@/modules/users/useCases/VerifyTokenUseCase';
import { VerifyTokenController } from '@/modules/users/controllers/VerifyTokenController';

export function verifyTokenFactory() {
    const userRepository = new UserRepository(pool);
    const verifyTokenUseCase = new VerifyTokenUseCase(userRepository);
    return new VerifyTokenController(verifyTokenUseCase);
}
