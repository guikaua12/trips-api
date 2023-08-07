import { Router } from 'express';
import { searchUserFactory } from '@/modules/users/factories/SearchUserFactory';
import { tokenVerify } from '@/shared/middlewares/tokenVerify';
import { verifyTokenFactory } from '@/modules/users/factories/VerifyTokenFactory';

const searchUserController = searchUserFactory();
const verifyTokenController = verifyTokenFactory();

const userPrivateRouter = Router();
userPrivateRouter.use(tokenVerify);

userPrivateRouter.get('/search', async (req, res) => {
    await searchUserController.handle(req, res);
});
userPrivateRouter.get('/verify-token', async (req, res) => {
    await verifyTokenController.handle(req, res);
});

export { userPrivateRouter };
