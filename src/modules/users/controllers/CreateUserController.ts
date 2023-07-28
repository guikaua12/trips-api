import { Request, Response } from 'express';
import { CreateUserUseCase } from '@/modules/users/useCases/CreateUserUseCase';
import { generateJwt } from '@/shared/utils/jwt';
export class CreateUserController {
    constructor(private useCase: CreateUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const user = await this.useCase.execute({ email, password });
        const jwt = generateJwt({ id: user.id, email: user.email });

        res.status(200).json({
            id: user.id,
            email: user.email,
            token: jwt,
        });
    }
}
