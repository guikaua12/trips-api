import { ZodError } from 'zod';

export function zodToString(error: ZodError) {
    const errors = [];
    for (let zodError of error.errors) {
        errors.push(zodError.message);
    }
    return errors.join('. ');
}
