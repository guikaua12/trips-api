import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@/modules/users/useCases/RegisterUserUseCase';
import { randomHash } from '@/shared/utils/randomUtils';
import { CreateSessionUseCase } from '@/modules/sessions/useCases/CreateSessionUseCase';
export class RegisterUserController {
    constructor(
        private useCase: RegisterUserUseCase,
        private createSessionUseCase: CreateSessionUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const user = await this.useCase.execute({ email, password });
        const session = await this.createSessionUseCase.execute({ session: randomHash(), user_id: user.id });

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            },
            session: session.session,
        });
    }
}
