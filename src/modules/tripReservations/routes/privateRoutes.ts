import { Request, Response, Router } from 'express';
import { reserveTripFactory } from '@/modules/tripReservations/factories/reserveTripFactory';
import { tokenVerify } from '@/shared/middlewares/tokenVerify';
import { getAllTripReservationFactory } from '@/modules/tripReservations/factories/getAllTripReservationFactory';
import { cancelTripReservationFactory } from '@/modules/tripReservations/factories/cancelTripReservationFactory';

const privateTripReservationRouter = Router();
privateTripReservationRouter.use(tokenVerify);

const reserveTripController = reserveTripFactory();
const getAllTripReservationController = getAllTripReservationFactory();
const cancelTripReservationController = cancelTripReservationFactory();

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
