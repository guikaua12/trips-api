import { Router } from 'express';
import { loginUserFactory } from '@/modules/users/factories/LoginUserFactory';

const userRouter = Router();

const loginUserController = loginUserFactory();

userRouter.post('/login', async (req, res) => {
    await loginUserController.handle(req, res);
});

export { userRouter };
