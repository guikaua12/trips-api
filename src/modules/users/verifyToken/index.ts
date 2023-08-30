import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { VerifyTokenUseCase } from '@/modules/users/verifyToken/VerifyTokenUseCase';
import { VerifyTokenController } from '@/modules/users/verifyToken/VerifyTokenController';

const userRepository = new UserRepository(pool);
const verifyTokenUseCase = new VerifyTokenUseCase(userRepository);
const verifyTokenController = new VerifyTokenController(verifyTokenUseCase);

export { verifyTokenController };
