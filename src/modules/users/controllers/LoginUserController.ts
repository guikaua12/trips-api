import { LoginUserUseCase } from '@/modules/users/useCases/LoginUserUseCase';
import { Request, Response } from 'express';
import { randomHash } from '@/shared/utils/randomUtils';
import { CreateSessionUseCase } from '@/modules/sessions/useCases/CreateSessionUseCase';

export class LoginUserController {
    constructor(
        private useCase: LoginUserUseCase,
        private createSessionUseCase: CreateSessionUseCase
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await this.useCase.execute({ email, password });
        const session = await this.createSessionUseCase.execute({ session: randomHash(), user_id: user.id });

        return res.status(200).json({
            id: user.id,
            email: user.email,
            session: session.session,
        });
    }
}
