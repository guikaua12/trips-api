import { parseISO, isValid } from 'date-fns';

export function handleDates(body: any) {
    if (!body || typeof body !== 'object') return body;

    for (const key of Object.keys(body)) {
        const value = body[key];

        if (typeof value === 'object') return handleDates(value);

        const parsedDate = parseISO(value);

        if (isValid(parsedDate)) body[key] = parsedDate;
    }
}
