import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { User } from '@/modules/users/models/User';
import { AppError } from '@/shared/errors/AppError';
import { CreateUserDTO, CreateUserDTOSchema } from '@/modules/users/dtos/CreateUserDTO';
import { zodToString } from '@/shared/utils';
import { ZodError } from 'zod';

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute({ email, password }: CreateUserDTO): Promise<User> {
        try {
            CreateUserDTOSchema.parse({ email, password });
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(400, zodToString(error));
            }
        }

        const user = await this.userRepository.search({ email });
        if (user) throw new AppError(409, 'User already exists');

        return await this.userRepository.create({ email, password });
    }
}
