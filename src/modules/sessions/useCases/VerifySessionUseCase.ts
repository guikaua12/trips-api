import { VerifySessionDTO, VerifySessionDTOSchema } from '@/modules/sessions/dtos/VerifySessionDTO';
import { ZodError } from 'zod';
import { AppError } from '@/shared/errors/AppError';
import { zodToString } from '@/shared/utils';
import { ISessionRepository } from '@/modules/sessions/repositories/ISessionRepository';
import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { User } from '@/modules/users/models/User';

export class VerifySessionUseCase {
    constructor(
        private sessionRepository: ISessionRepository,
        private userRepository: IUserRepository
    ) {}
    async execute({ session }: VerifySessionDTO): Promise<User> {
        try {
            VerifySessionDTOSchema.parse({ session });
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(401, zodToString(error));
            }
        }

        const validSession = await this.sessionRepository.findValid(session, process.env.SESSION_EXPIRY!);

        if (!validSession) {
            throw new AppError(401, 'Unauthorized');
        }

        const user = await this.userRepository.search({ id: validSession.user_id });

        if (!user) {
            throw new AppError(401, 'Unauthorized');
        }

        return user;
    }
}
