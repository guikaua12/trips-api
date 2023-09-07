import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { RegisterUserUseCase } from '@/modules/users/registerUser/useCase';
import { RegisterUserController } from '@/modules/users/registerUser/controller';

const userRepository = new UserRepository(pool);
const registerUserUseCase = new RegisterUserUseCase(userRepository);

const registerUserController = new RegisterUserController(registerUserUseCase);

export { registerUserController };
