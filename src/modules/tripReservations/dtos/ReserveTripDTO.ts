import { z } from 'zod';

export const ReserveTripDTOSchema = z.object({
    tripId: z
        .string({ invalid_type_error: 'Invalid trip id type', required_error: 'Trip id is required' })
        .min(1, 'Trip id is required'),
    userId: z
        .string({ invalid_type_error: 'Invalid user id type', required_error: 'User id is required' })
        .min(1, 'User id is required'),
    startDate: z.date({ invalid_type_error: 'Invalid start date type', required_error: 'Start date is required' }),
    endDate: z.date({ invalid_type_error: 'Invalid end date type', required_error: 'End date is required' }),
    totalPaid: z.number({ invalid_type_error: 'Invalid total paid type', required_error: 'Total paid is required' }),
});

export type ReserveTripDTO = z.infer<typeof ReserveTripDTOSchema>;
