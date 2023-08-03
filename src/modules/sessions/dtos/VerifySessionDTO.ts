import { z } from 'zod';

export const VerifySessionDTOSchema = z.object({
    session: z.string({ invalid_type_error: 'Invalid session type', required_error: 'Session is required' }),
});

export type VerifySessionDTO = z.infer<typeof VerifySessionDTOSchema>;
