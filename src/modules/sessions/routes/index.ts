import { Request, Response, Router } from 'express';
import { verifySessionFactory } from '@/modules/sessions/factories/VerifySessionFactory';

const sessionRouter = Router();

const verifySessionController = verifySessionFactory();
sessionRouter.get('/verify/:session', async (req: Request, res: Response) => {
    await verifySessionController.handle(req, res);
});

export { sessionRouter };
