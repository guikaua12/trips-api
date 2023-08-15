import { Request, Response, Router } from 'express';
import { reserveTripFactory } from '@/modules/tripReservations/factories/reserveTripFactory';
import { tokenVerify } from '@/shared/middlewares/tokenVerify';
import { getAllTripReservationFactory } from '@/modules/tripReservations/factories/getAllTripReservationFactory';

const privateTripReservationRouter = Router();
privateTripReservationRouter.use(tokenVerify);

const reserveTripController = reserveTripFactory();
const getAllTripReservationController = getAllTripReservationFactory();

privateTripReservationRouter.post('/reserve', async (req: Request, res: Response) => {
    await reserveTripController.handle(req, res);
});

privateTripReservationRouter.get('/getall', async (req: Request, res: Response) => {
    await getAllTripReservationController.handle(req, res);
});

export { privateTripReservationRouter };
