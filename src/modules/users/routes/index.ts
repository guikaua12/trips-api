import { Router } from 'express';
import { searchUserFactory } from '@/modules/users/factories/SearchUserFactory';
import { createUserFactory } from '@/modules/users/factories/CreateUserFactory';
import { loginUserFactory } from '@/modules/users/factories/LoginUserFactory';

const userRouter = Router();

const searchUserController = searchUserFactory();
const createUserController = createUserFactory();
const loginUserController = loginUserFactory();

userRouter.get('/search', async (req, res) => {
    await searchUserController.handle(req, res);
});

userRouter.post('/create', async (req, res) => {
    await createUserController.handle(req, res);
});

userRouter.post('/login', async (req, res) => {
    await loginUserController.handle(req, res);
});

export { userRouter };
