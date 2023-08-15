import { Request, Response } from 'express';
import { GetAllTripReservationUseCase } from '@/modules/tripReservations/useCases/GetAllTripReservationUseCase';

export class GetAllTripReservationController {
    constructor(private useCase: GetAllTripReservationUseCase) {}
    async handle(req: Request | any, res: Response) {
        const userId = req.userId;

        const tripReservations = await this.useCase.execute(userId);

        res.status(200).json({
            tripReservations,
        });
    }
}
