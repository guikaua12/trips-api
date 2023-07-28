import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { User } from '@/modules/users/models/User';
import { AppError } from '@/shared/errors/AppError';

export class GetUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);

        if (!user) throw new AppError(404, 'User not found');

        return user;
    }
}
