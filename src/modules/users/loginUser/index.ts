import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { LoginUserUseCase } from '@/modules/users/loginUser/useCase';
import { LoginUserController } from '@/modules/users/loginUser/controller';

const userRepository = new UserRepository(pool);
const loginUserUseCase = new LoginUserUseCase(userRepository);

const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController };
