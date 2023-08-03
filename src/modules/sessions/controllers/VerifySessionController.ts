import { Request, Response } from 'express';
import { VerifySessionUseCase } from '@/modules/sessions/useCases/VerifySessionUseCase';

export class VerifySessionController {
    constructor(private useCase: VerifySessionUseCase) {}
    async handle(req: Request, res: Response) {
        const session = req.params.session;

        const user = await this.useCase.execute({ session });

        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            },
        });
    }
}
