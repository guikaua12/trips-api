import { ZodError } from 'zod';

export function zodToString(error: ZodError) {
    const errors = [];
    for (const zodError of error.errors) {
        errors.push(zodError.message);
    }
    return errors.join('. ');
}
