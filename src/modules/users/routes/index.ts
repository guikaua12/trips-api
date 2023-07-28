import { Router } from 'express';
import { getUserFactory } from '@/modules/users/factories/GetUserFactory';
import { createUserFactory } from '@/modules/users/factories/CreateUserFactory';

const userRouter = Router();

const getUserController = getUserFactory();
const createUserController = createUserFactory();

userRouter.get('/:id', async (req, res) => {
    await getUserController.handle(req, res);
});

userRouter.post('/create', async (req, res) => {
    await createUserController.handle(req, res);
});

export { userRouter };
