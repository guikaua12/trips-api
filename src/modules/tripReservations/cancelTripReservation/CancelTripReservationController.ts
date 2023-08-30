import { Request, Response } from 'express';
import { CancelTripReservationUseCase } from '@/modules/tripReservations/cancelTripReservation/CancelTripReservationUseCase';

export class CancelTripReservationController {
    constructor(private useCase: CancelTripReservationUseCase) {}
    async handle(req: Request | any, res: Response) {
        const id = req.params.id;
        const userId = req.userId;

        const tripReservation = await this.useCase.execute({ id, userId, status: 'cancelled' });
        res.status(200).json({
            tripReservation,
        });
    }
}
