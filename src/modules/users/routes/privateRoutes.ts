import { Router } from 'express';
import { searchUserController } from '@/modules/users/searchUser';
import { tokenVerify } from '@/shared/middlewares/tokenVerify';
import { verifyTokenController } from '@/modules/users/verifyToken';

const userPrivateRouter = Router();
userPrivateRouter.use(tokenVerify);

userPrivateRouter.get('/search', async (req, res) => {
    await searchUserController.handle(req, res);
});
userPrivateRouter.get('/verify-token', async (req, res) => {
    await verifyTokenController.handle(req, res);
});

export { userPrivateRouter };
