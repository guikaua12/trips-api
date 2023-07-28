import { Request, Response } from 'express';
import { CreateUserUseCase } from '@/modules/users/useCases/CreateUserUseCase';

export class CreateUserController {
    constructor(private useCase: CreateUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const user = await this.useCase.execute({ email, password });

        res.status(200).json({
            id: user.id,
            email: user.email,
        });
    }
}
