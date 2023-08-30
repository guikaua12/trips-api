import { Router } from 'express';
import { loginUserController } from '@/modules/users/loginUser';
import { registerUserController } from '@/modules/users/registerUser';

const userRouter = Router();

userRouter.post('/login', async (req, res) => {
    await loginUserController.handle(req, res);
});

userRouter.post('/register', async (req, res) => {
    await registerUserController.handle(req, res);
});

export { userRouter };
