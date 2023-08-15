import { Request, Response } from 'express';
import { ReserveTripDTO } from '@/modules/tripReservations/dtos/ReserveTripDTO';
import { ReserveTripUseCase } from '@/modules/tripReservations/useCases/ReserveTripUseCase';

export class ReserveTripController {
    constructor(private useCase: ReserveTripUseCase) {}
    async handle(req: Request | any, res: Response) {
        const userId = req.userId;

        const { tripId, startDate, endDate, totalPaid }: ReserveTripDTO = req.body;

        const tripReservation = await this.useCase.execute({ tripId, userId, startDate, endDate, totalPaid });

        res.status(201).json({
            tripReservation,
        });
    }
}
