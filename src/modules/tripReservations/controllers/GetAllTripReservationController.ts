import { Request, Response } from 'express';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/useCases/GetAllTripReservationUseCase';

export class GetAllTripReservationController {
    constructor(private useCase: GetAllTripReservationUseCase) {}
    async handle(req: Request | any, res: Response) {
        const userId = req.userId;
        const { page } = req.query;

        const tripReservations = await this.useCase.execute({ id: userId, page: parseInt(page) });
        const allTripReservations = await this.useCase.execute2(userId);
        const pages = Math.ceil(allTripReservations.length / 5);

        res.status(200).json({
            tripReservations,
            pages,
        });
    }
}
