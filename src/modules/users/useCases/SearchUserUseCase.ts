import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { User } from '@/modules/users/models/User';
import { AppError } from '@/shared/errors/AppError';
import { SearchUserDTO } from '@/modules/users/dtos/SearchUserDTO';

export class SearchUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute({ id, email }: SearchUserDTO): Promise<User> {
        const user = await this.userRepository.search({ id, email });

        if (!user) throw new AppError(404, 'User not found');

        return user;
    }
}
