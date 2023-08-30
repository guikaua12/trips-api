import { SearchUserController } from '@/modules/users/searchUser/SearchUserController';
import { SearchUserUseCase } from '@/modules/users/searchUser/SearchUserUseCase';
import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';

const userRepository = new UserRepository(pool);
const searchUserUseCase = new SearchUserUseCase(userRepository);
const searchUserController = new SearchUserController(searchUserUseCase);

export { searchUserController };
