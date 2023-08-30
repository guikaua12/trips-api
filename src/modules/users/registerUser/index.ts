import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { RegisterUserUseCase } from '@/modules/users/registerUser/RegisterUserUseCase';
import { RegisterUserController } from '@/modules/users/registerUser/RegisterUserController';

const userRepository = new UserRepository(pool);
const registerUserUseCase = new RegisterUserUseCase(userRepository);

const registerUserController = new RegisterUserController(registerUserUseCase);

export { registerUserController };
