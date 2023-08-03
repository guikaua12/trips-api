import { VerifySessionDTO, VerifySessionDTOSchema } from '@/modules/sessions/dtos/VerifySessionDTO';
import { ZodError } from 'zod';
import { AppError } from '@/shared/errors/AppError';
import { zodToString } from '@/shared/utils';
import { ISessionRepository } from '@/modules/sessions/repositories/ISessionRepository';

export class VerifySessionUseCase {
    constructor(private sessionRepository: ISessionRepository) {}
    async execute({ session }: VerifySessionDTO): Promise<boolean> {
        try {
            VerifySessionDTOSchema.parse({ session });
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(400, zodToString(error));
            }
        }

        const validSession = await this.sessionRepository.findValid(session, process.env.SESSION_EXPIRY!);
        return !!validSession;
    }
}
