import { Router } from 'express';
import { searchUserFactory } from '@/modules/users/factories/SearchUserFactory';
import { createUserFactory } from '@/modules/users/factories/CreateUserFactory';
import { sessionVerify } from '@/modules/users/middlewares/sessionVerify';

const searchUserController = searchUserFactory();
const createUserController = createUserFactory();

const userPrivateRouter = Router();
userPrivateRouter.use(sessionVerify);

userPrivateRouter.get('/search', async (req, res) => {
    await searchUserController.handle(req, res);
});

userPrivateRouter.post('/create', async (req, res) => {
    await createUserController.handle(req, res);
});

export { userPrivateRouter };
