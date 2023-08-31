import { Request, Response } from 'express';
import { GetAllTripReservationByPageUseCase } from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationByPageUseCase';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationUseCase';

export class GetAllTripReservationController {
    constructor(
        private getAllTripReservationByPageUseCase: GetAllTripReservationByPageUseCase,
        private getAllTripReservationUseCase: GetAllTripReservationUseCase
    ) {}
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

        // return max pages
        const allTripReservations = await this.getAllTripReservationUseCase.execute(userId);
        const pages = Math.ceil(allTripReservations.length / (parseInt(limit) || 5));

        res.status(200).json({
            tripReservations,
            pages,
        });
    }
}
