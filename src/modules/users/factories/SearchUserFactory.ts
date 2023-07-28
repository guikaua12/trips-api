import { SearchUserController } from '@/modules/users/controllers/SearchUserController';
import { SearchUserUseCase } from '@/modules/users/useCases/SearchUserUseCase';
import { UserRepository } from '@/modules/users/repositories/UserRepository';
import { pool } from '@/shared/database';

export function searchUserFactory() {
    const userRepository = new UserRepository(pool);
    const searchUserUseCase = new SearchUserUseCase(userRepository);
    return new SearchUserController(searchUserUseCase);
}
