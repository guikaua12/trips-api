import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { RegisterUserUseCase } from '@/modules/users/registerUser/useCase';
import { RegisterUserController } from '@/modules/users/registerUser/controller';
import { JwtGenerateToken } from '../generateToken/JwtGenerateToken';

const userRepository = new UserRepository(pool);
const generateToken = new JwtGenerateToken();
const registerUserUseCase = new RegisterUserUseCase(userRepository, generateToken);

const registerUserController = new RegisterUserController(registerUserUseCase);

export { registerUserController };
