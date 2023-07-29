import { Router } from 'express';
import { tripsRouter } from '@/modules/trips/routes';
import { userRouter } from '@/modules/users/routes';
import { userPrivateRouter } from '@/modules/users/routes/privateRoutes';

const router = Router();

router.use('/trips', tripsRouter);
router.use('/users', userRouter);
router.use('/users', userPrivateRouter);
router.use('/', async (req, res) => {
    res.send('Hello World!');
});

export { router };
