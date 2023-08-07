import { Router } from 'express';
import { searchUserFactory } from '@/modules/users/factories/SearchUserFactory';
import { sessionVerify } from '@/shared/middlewares/sessionVerify';

const searchUserController = searchUserFactory();

const userPrivateRouter = Router();
userPrivateRouter.use(sessionVerify);

userPrivateRouter.get('/search', async (req, res) => {
    await searchUserController.handle(req, res);
});
userPrivateRouter.get('/verify-token', async (req, res) => {
    res.status(200).json({
        valid: true,
    });
});

export { userPrivateRouter };
