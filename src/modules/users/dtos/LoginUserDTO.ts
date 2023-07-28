import { z } from 'zod';

export const LoginUserDTOSchema = z.object({
    email: z
        .string({ invalid_type_error: 'Invalid email type', required_error: 'Email is required' })
        .email('Invalid email'),
    password: z
        .string({ invalid_type_error: 'Invalid password type', required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters'),
});

export type LoginUserDTO = z.infer<typeof LoginUserDTOSchema>;
