import { z } from 'zod';

export const CancelTripReservationDTOSchema = z.object({
    tripId: z.string({
        required_error: 'O id da viagem é obrigatório.',
        invalid_type_error: 'O id da viagem é inválido.',
    }),
    userId: z.string(),
});

export type CancelTripReservationDTO = z.infer<typeof CancelTripReservationDTOSchema>;
