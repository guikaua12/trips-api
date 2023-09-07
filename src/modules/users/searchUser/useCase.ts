import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { User } from '@/modules/users/models/User';
import { AppError } from '@/shared/errors/AppError';
import { SearchUserDTO, SearchUserDTOSchema } from '@/modules/users/searchUser/dto';
import { ZodError } from 'zod';
import { zodToString } from '@/shared/utils';

export class SearchUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute({ id, email }: SearchUserDTO): Promise<User> {
        try {
            SearchUserDTOSchema.parse({ id, email });
        } catch (error) {
            if (error instanceof ZodError) throw new AppError(400, zodToString(error));
        }

        const user = await this.userRepository.search({ id, email });

        if (!user) throw new AppError(404, 'User not found');

        return user;
    }
}
