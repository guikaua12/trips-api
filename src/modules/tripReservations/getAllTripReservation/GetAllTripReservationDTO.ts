import { z } from 'zod';

export const GetAllTripReservationDTOSchema = z.object({
    id: z.string({ required_error: 'O id é obrigatório.', invalid_type_error: 'O tipo do id é inválido.' }),
    sort_by: z
        .union([z.literal('startDate'), z.literal('endDate'), z.literal('totalPaid'), z.literal('createdAt')])
        .optional()
        .default('createdAt'),
    sort_dir: z
        .union([z.literal('asc'), z.literal('desc')], { invalid_type_error: 'Invalid sort_dir type' })
        .optional()
        .default('desc'),
    limit: z.number().optional().default(5),
    page: z
        .number()
        .optional()
        .default(() => 1),
});

export type GetAllTripReservationDTOInput = z.input<typeof GetAllTripReservationDTOSchema>;
export type GetAllTripReservationDTOOutput = z.infer<typeof GetAllTripReservationDTOSchema>;

// const test: GetAllTripReservationDTO = {};
