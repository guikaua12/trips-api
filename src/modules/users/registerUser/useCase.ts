import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { User } from '@/modules/users/models/User';
import { AppError } from '@/shared/errors/AppError';
import { RegisterUserDTO, RegisterUserDTOSchema } from '@/modules/users/registerUser/dto';
import { zodToString } from '@/shared/utils';
import { ZodError } from 'zod';
import { IGenerateToken } from '../generateToken/IGenerateToken';

export type RegisterUserResponse = {
    user: Omit<User, 'password'>;
    token: string;
};

export class RegisterUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private generateToken: IGenerateToken
    ) {}

    async execute({ email, password }: RegisterUserDTO): Promise<RegisterUserResponse> {
        try {
            RegisterUserDTOSchema.parse({ email, password });
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(400, zodToString(error));
            }
        }

        const user = await this.userRepository.search({ email });
        if (user) throw new AppError(409, 'User already exists');

        const { id: insertedId, email: insertedEmail } = await this.userRepository.insert({ email, password });
        const jwt = this.generateToken.generate({ id: insertedId });

        return {
            user: {
                id: insertedId,
                email: insertedEmail,
            },
            token: jwt,
        };
    }
}
