import { User } from '@/modules/users/models/User';
import { AppError } from '@/shared/errors/AppError';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

export class VerifyTokenUseCase {
    constructor(private userRepository: IUserRepository) {}
    async execute(userId: string): Promise<User> {
        if (!userId || !userId.length) {
            throw new AppError(401, 'Unauthorized');
        }

        const user = await this.userRepository.search({ id: userId });

        if (!user) {
            throw new AppError(401, 'Unauthorized');
        }

        return user;
    }
}
