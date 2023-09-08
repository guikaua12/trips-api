import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';
import { LoginUserUseCase } from '@/modules/users/loginUser/useCase';
import { LoginUserController } from '@/modules/users/loginUser/controller';
import { BcryptPasswordVerify } from '../passwordVerify/BcryptPasswordVerify';
import { JwtGenerateToken } from '../generateToken/JwtGenerateToken';

const userRepository = new UserRepository(pool);
const passwordVerify = new BcryptPasswordVerify();
const generateToken = new JwtGenerateToken();
const loginUserUseCase = new LoginUserUseCase(userRepository, passwordVerify, generateToken);

const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController };
