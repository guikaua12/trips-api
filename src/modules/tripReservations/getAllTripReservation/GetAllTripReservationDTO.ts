import { z } from 'zod';

export const GetAllTripReservationDTOSchema = z
    .object({
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
        page_start: z
            .number()
            .min(1)
            .optional()
            .default(() => 1),
        page_end: z
            .number()
            .min(1)
            .optional()
            .default(() => 1),
    })
    .refine((arg) => arg.page_start <= arg.page_end, { message: 'O "page_start" deve ser menor que o "page_end"' });

export type GetAllTripReservationDTOInput = z.input<typeof GetAllTripReservationDTOSchema>;
export type GetAllTripReservationDTOOutput = z.infer<typeof GetAllTripReservationDTOSchema>;

// const test: GetAllTripReservationDTOInput = {};
