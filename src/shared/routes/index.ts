import { Router } from 'express';
import { tripsRouter } from '@/modules/trips/routes';
import { userRouter } from '@/modules/users/routes';

const router = Router();

router.use('/trips', tripsRouter);
router.use('/users', userRouter);
router.use('/', async (req, res) => {
    res.send('Hello World!');
});

export { router };
