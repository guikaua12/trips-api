import { LoginUserUseCase } from '@/modules/users/useCases/LoginUserUseCase';
import { Request, Response } from 'express';
import { generateJwt } from '@/shared/utils/jwt';

export class LoginUserController {
    constructor(private useCase: LoginUserUseCase) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await this.useCase.execute({ email, password });
        const jwt = generateJwt({ id: user.id, email: user.email });

        return res.status(200).json({
            id: user.id,
            email: user.email,
            token: jwt,
        });
    }
}
