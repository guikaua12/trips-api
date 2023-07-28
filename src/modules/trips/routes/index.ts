import { Router } from 'express';
import { searchTripFactory } from '@/modules/trips/factories/SearchTripFactory';
import { getTripFactory } from '@/modules/trips/factories/GetTripFactory';

const tripsRouter = Router();

const searchTripController = searchTripFactory();
const getTripController = getTripFactory();

tripsRouter.get('/:id', async (req, res) => {
    await getTripController.handle(req, res);
});
tripsRouter.post('/search', async (req, res) => {
    await searchTripController.handle(req, res);
});

export { tripsRouter };
