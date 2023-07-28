import { z } from 'zod';

export const CreateSessionDTOSchema = z.object({
    session: z.string(),
    user_id: z.string(),
});

export type CreateSessionDTO = z.infer<typeof CreateSessionDTOSchema>;
