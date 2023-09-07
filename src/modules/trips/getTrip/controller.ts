import { Request, Response } from 'express';
import { GetTripUseCase } from '@/modules/trips/getTrip/useCase';

export class GetTripController {
    constructor(private getTripUseCase: GetTripUseCase) {}

    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const trip = await this.getTripUseCase.execute(id);

        res.status(200).json(trip);
    }
}
