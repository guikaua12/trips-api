import { Request, Response, Router } from 'express';
import { searchTripFactory } from '@/modules/trips/factories/SearchTripFactory';

const tripsRouter = Router();

tripsRouter.get('/search', async (req, res) => {
    await searchTripFactory().handle(req, res);
});

export { tripsRouter };
