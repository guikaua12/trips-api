import { Request, Response } from 'express';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/getAllTripReservation/useCase';

export class GetAllTripReservationController {
    constructor(private getAllTripReservationByPageUseCase: GetAllTripReservationUseCase) {}
    async handle(req: Request | any, res: Response) {
        const userId = req.userId;
        const { sort_by, sort_dir, limit, page_start, page_end } = req.query;

        const tripReservations = await this.getAllTripReservationByPageUseCase.execute({
            id: userId,
            sort_by: sort_by || undefined,
            sort_dir: sort_dir || undefined,
            limit: parseInt(limit) || undefined,
            page_start: parseInt(page_start) || undefined,
            page_end: parseInt(page_end) || undefined,
        });

        res.status(200).json(tripReservations);
    }
}
