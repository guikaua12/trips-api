import { Router } from 'express';
import { loginUserFactory } from '@/modules/users/factories/LoginUserFactory';
import { createUserFactory } from '@/modules/users/factories/CreateUserFactory';

const userRouter = Router();

const loginUserController = loginUserFactory();
const createUserController = createUserFactory();

userRouter.post('/login', async (req, res) => {
    await loginUserController.handle(req, res);
});

userRouter.post('/create', async (req, res) => {
    await createUserController.handle(req, res);
});

export { userRouter };
