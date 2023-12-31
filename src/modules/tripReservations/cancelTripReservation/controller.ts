import { Request, Response } from 'express';
import { CancelTripReservationUseCase } from '@/modules/tripReservations/cancelTripReservation/useCase';

export class CancelTripReservationController {
    constructor(private useCase: CancelTripReservationUseCase) {}
    async handle(req: Request | any, res: Response) {
        const id = req.params.id;
        const userId = req.userId;

        const tripReservation = await this.useCase.execute({ tripId: id, userId });
        res.status(200).json({
            tripReservation,
        });
    }
}
