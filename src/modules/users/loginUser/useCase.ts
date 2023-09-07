import { LoginUserDTO, LoginUserDTOSchema } from '@/modules/users/loginUser/dto';
import { User } from '@/modules/users/models/User';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { ZodError } from 'zod';
import { AppError } from '@/shared/errors/AppError';
import { zodToString } from '@/shared/utils';
import { match } from '@/shared/utils/passwordUtils';

export class LoginUserUseCase {
    constructor(private repository: IUserRepository) {}
    async execute({ email, password }: LoginUserDTO): Promise<User> {
        try {
            LoginUserDTOSchema.parse({ email, password });
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(400, zodToString(error));
            }
        }

        const user = await this.repository.search({ email });

        if (!user) {
            throw new AppError(404, 'User not found');
        }

        const passwordMatch = await match(password, user.password);

        if (!passwordMatch) {
            throw new AppError(401, 'Invalid password');
        }

        return user;
    }
}
