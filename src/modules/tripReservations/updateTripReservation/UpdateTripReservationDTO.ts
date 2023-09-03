import { z } from 'zod';

export const UpdateTripReservationDTOSchema = z
    .object({
        id: z.string({ invalid_type_error: 'Invalid id type', required_error: 'Id is required' }),
        userId: z.string({ invalid_type_error: 'Invalid userId type', required_error: 'UserId is required' }),
        status: z
            .union([z.literal('pending'), z.literal('confirmed'), z.literal('cancelled')], {
                invalid_type_error: 'Invalid status type',
            })
            .optional(),
    })
    .superRefine(({ status }, ctx) => {
        // at least one field
        if (status) return;

        ctx.addIssue({ code: 'custom', message: 'Pelo menos um dos campos deve ser preenchido' });
    });

export type UpdateTripReservationDTO = z.infer<typeof UpdateTripReservationDTOSchema>;
