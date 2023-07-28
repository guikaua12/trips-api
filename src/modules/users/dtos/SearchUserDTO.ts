import { z } from 'zod';

export const SearchUserDTOSchema = z.object({
    id: z.string({ invalid_type_error: 'Invalid id type' }).optional(),
    email: z.string({ invalid_type_error: 'Invalid email type' }).email('Invalid email').optional(),
});

export type SearchUserDTO = z.infer<typeof SearchUserDTOSchema>;
