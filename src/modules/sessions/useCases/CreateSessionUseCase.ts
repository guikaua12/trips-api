import { SessionRepository } from '@/modules/sessions/repositories/SessionRepository';
import { CreateSessionDTO, CreateSessionDTOSchema } from '@/modules/sessions/dtos/CreateSessionDTO';
import { Session } from '@/modules/sessions/models/Session';

export class CreateSessionUseCase {
    constructor(private sessionRepository: SessionRepository) {}

    async execute({ session, user_id }: CreateSessionDTO): Promise<Session> {
        // schema validation
        CreateSessionDTOSchema.parse({ session, user_id });

        return await this.sessionRepository.create({ session, user_id });
    }
}
