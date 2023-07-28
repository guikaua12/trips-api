import { Router } from 'express';
import { searchUserFactory } from '@/modules/users/factories/SearchUserFactory';
import { createUserFactory } from '@/modules/users/factories/CreateUserFactory';

const userRouter = Router();

const searchUserController = searchUserFactory();
const createUserController = createUserFactory();

userRouter.get('/', async (req, res) => {
    await searchUserController.handle(req, res);
});

userRouter.post('/create', async (req, res) => {
    await createUserController.handle(req, res);
});

export { userRouter };
