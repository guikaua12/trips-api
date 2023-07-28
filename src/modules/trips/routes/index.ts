import { Router } from 'express';
import { searchTripFactory } from '@/modules/trips/factories/SearchTripFactory';
import { getTripFactory } from '@/modules/trips/factories/GetTripFactory';

const tripsRouter = Router();

tripsRouter.post('/search', async (req, res) => {
    await searchTripFactory().handle(req, res);
});

tripsRouter.get('/:id', async (req, res) => {
    await getTripFactory().handle(req, res);
});

export { tripsRouter };
