import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@/modules/users/registerUser/RegisterUserUseCase';
import { generateJwt } from '@/shared/utils/jwt';

export class RegisterUserController {
    constructor(private useCase: RegisterUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const user = await this.useCase.execute({ email, password });
        const jwt = generateJwt({ id: user.id });

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            },
            token: jwt,
        });
    }
}
