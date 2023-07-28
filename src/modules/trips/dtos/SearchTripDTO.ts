import { z } from 'zod';

export const SearchTripDTOSchema = z.object({
    location: z.string({ invalid_type_error: 'Invalid location type' }).optional(),
    startDate: z.date({ invalid_type_error: 'Invalid startDate type' }).optional(),
    pricePerDay: z.number({ invalid_type_error: 'Invalid pricePerDay type' }).optional(),
    recommended: z.boolean({ invalid_type_error: 'Invalid recommended type' }).optional(),
});

export type SearchTripDTO = z.infer<typeof SearchTripDTOSchema>;
