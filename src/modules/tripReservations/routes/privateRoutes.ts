import { Request, Response, Router } from 'express';
import { tokenVerify } from '@/shared/middlewares/tokenVerify';
import { getAllTripReservationController } from '@/modules/tripReservations/getAllTripReservation';
import { cancelTripReservationController } from '@/modules/tripReservations/cancelTripReservation';
import { reserveTripController } from '@/modules/tripReservations/reserveTrip';

const privateTripReservationRouter = Router();
privateTripReservationRouter.use(tokenVerify);

privateTripReservationRouter.post('/reserve', async (req: Request, res: Response) => {
    await reserveTripController.handle(req, res);
});

privateTripReservationRouter.patch('/cancel/:id', async (req: Request, res: Response) => {
    await cancelTripReservationController.handle(req, res);
});

privateTripReservationRouter.get('/getall', async (req: Request, res: Response) => {
    await getAllTripReservationController.handle(req, res);
});

export { privateTripReservationRouter };
