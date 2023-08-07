import { Router } from 'express';
import { tripsRouter } from '@/modules/trips/routes';
import { userRouter } from '@/modules/users/routes';
import { userPrivateRouter } from '@/modules/users/routes/privateRoutes';

const router = Router();

router.use('/api/trips', tripsRouter);
router.use('/api/users', userRouter);
router.use('/api/users', userPrivateRouter);
router.use('/api', async (req, res) => {
    res.send('Hello World!');
});

export { router };
