import { z } from 'zod';

export const SearchTripDTOSchema = z
    .object({
        location: z.string({ invalid_type_error: 'Invalid location type' }),
        startDate: z.date({ invalid_type_error: 'Invalid startDate type' }).min(new Date(), 'Data inicial inválida.'),
        pricePerDay: z.number({ invalid_type_error: 'Invalid pricePerDay type' }).positive('Preço inválido.'),
        recommended: z.boolean({ invalid_type_error: 'Invalid recommended type' }),
    })
    .partial()
    .superRefine(({ location, startDate, pricePerDay, recommended }, ctx) => {
        // at least one field
        if (location || startDate || pricePerDay || recommended) return;

        ctx.addIssue({ code: 'custom', message: 'Pelo menos um dos campos deve ser preenchido' });
    });

export type SearchTripDTO = z.infer<typeof SearchTripDTOSchema>;
