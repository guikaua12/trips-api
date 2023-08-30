import { Router } from 'express';
import { searchTripController } from '@/modules/trips/searchTrip';
import { getTripController } from '@/modules/trips/getTrip';

const tripsRouter = Router();

tripsRouter.post('/search', async (req, res) => {
    await searchTripController.handle(req, res);
});

tripsRouter.get('/:id', async (req, res) => {
    await getTripController.handle(req, res);
});

export { tripsRouter };
