import { z } from 'zod';

export const RegisterUserDTOSchema = z.object({
    email: z
        .string({
            required_error: 'E-mail is required',
            invalid_type_error: 'Invalid email type',
        })
        .email('Invalid email'),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Invalid password type',
        })
        .min(6, 'Password must have at least 6 characters'),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserDTOSchema>;
