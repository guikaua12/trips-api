import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { LoginUserUseCase } from '@/modules/users/loginUser/LoginUserUseCase';
import { LoginUserController } from '@/modules/users/loginUser/LoginUserController';

const userRepository = new UserRepository(pool);
const loginUserUseCase = new LoginUserUseCase(userRepository);

const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController };
