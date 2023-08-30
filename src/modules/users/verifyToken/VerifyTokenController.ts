import { Request, Response } from 'express';
import { VerifyTokenUseCase } from '@/modules/users/verifyToken/VerifyTokenUseCase';

export class VerifyTokenController {
    constructor(private useCase: VerifyTokenUseCase) {}
    async handle(req: Request | any, res: Response) {
        const userId = req.userId;

        const user = await this.useCase.execute(userId);

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            },
        });
    }
}
