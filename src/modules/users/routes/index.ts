import { Router } from 'express';
import { loginUserFactory } from '@/modules/users/factories/LoginUserFactory';
import { registerUserFactory } from '@/modules/users/factories/RegisterUserFactory';

const userRouter = Router();

const loginUserController = loginUserFactory();
const registerUserController = registerUserFactory();

userRouter.post('/login', async (req, res) => {
    await loginUserController.handle(req, res);
});

userRouter.post('/register', async (req, res) => {
    await registerUserController.handle(req, res);
});

export { userRouter };
