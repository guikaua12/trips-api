import { SearchTripUseCase } from '@/modules/trips/searchTrip/useCase';
import { Request, Response } from 'express';

export class SearchTripController {
    constructor(private searchTripUseCase: SearchTripUseCase) {}

    async handle(req: Request, res: Response) {
        const { location, startDate, pricePerDay, recommended } = req.body;

        const trips = await this.searchTripUseCase.execute({ location, startDate, pricePerDay, recommended });

        res.status(200).json({
            trips,
        });
    }
}
