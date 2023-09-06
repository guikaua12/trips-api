import { parseISO, isValid } from 'date-fns';

export function handleDates(body: any) {
    if (!body || typeof body !== 'object') return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isValid(value)) body[key] = parseISO(value);
        else if (typeof value === 'object') handleDates(value);
    }
}
