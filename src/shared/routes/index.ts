import { Router } from 'express';
import { tripsRouter } from '@/modules/trips/routes';

const router = Router();

router.use('/trips', tripsRouter);
router.use('/', async (req, res) => {
    res.send('Hello World!');
});

export { router };
