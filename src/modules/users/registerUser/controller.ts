import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@/modules/users/registerUser/useCase';

export class RegisterUserController {
    constructor(private useCase: RegisterUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const response = await this.useCase.execute({ email, password });

        res.status(200).json(response);
    }
}
