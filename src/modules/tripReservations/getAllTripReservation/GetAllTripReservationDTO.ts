import { z } from 'zod';

export const GetAllTripReservationDTOSchema = z.object({
    id: z.string({ required_error: 'O id é obrigatório.', invalid_type_error: 'O tipo do id é inválido.' }),
    page: z
        .number()
        .optional()
        .default(() => 1),
});

export type GetAllTripReservationDTO = z.infer<typeof GetAllTripReservationDTOSchema>;
