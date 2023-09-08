import { User } from '@/modules/users/models/User';
import { AppError } from '@/shared/errors/AppError';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';

export type VerifyTokenResponse = {
    user: Omit<User, 'password'>;
};

export class VerifyTokenUseCase {
    constructor(private userRepository: IUserRepository) {}
    async execute(userId: string): Promise<VerifyTokenResponse> {
        if (!userId || !userId.length) {
            throw new AppError(401, 'Unauthorized');
        }

        const user = await this.userRepository.search({ id: userId });

        if (!user) {
            throw new AppError(401, 'Unauthorized');
        }

        return {
            user: {
                id: user.id,
                email: user.email,
            },
        };
    }
}
