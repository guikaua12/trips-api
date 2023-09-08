import { LoginUserDTO, LoginUserDTOSchema } from '@/modules/users/loginUser/dto';
import { User } from '@/modules/users/models/User';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { ZodError } from 'zod';
import { AppError } from '@/shared/errors/AppError';
import { zodToString } from '@/shared/utils';
import { IPasswordVerify } from '../passwordVerify/IPasswordVerify';
import { IGenerateToken } from '../generateToken/IGenerateToken';

export type LoginUseResponse = {
    user: Omit<User, 'password'>;
    token: string;
};

export class LoginUserUseCase {
    constructor(
        private repository: IUserRepository,
        private passwordVerify: IPasswordVerify,
        private generateToken: IGenerateToken
    ) {}
    async execute({ email, password }: LoginUserDTO): Promise<LoginUseResponse> {
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

        const passwordMatch = await this.passwordVerify.verify(password, user.password);

        if (!passwordMatch) {
            throw new AppError(401, 'Invalid password');
        }

        const jwt = this.generateToken.generate({ id: user.id });

        return {
            user: {
                id: user.id,
                email: user.email,
            },
            token: jwt,
        };
    }
}
