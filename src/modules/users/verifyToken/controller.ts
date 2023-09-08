import { Request, Response } from 'express';
import { VerifyTokenUseCase } from '@/modules/users/verifyToken/useCase';

export class VerifyTokenController {
    constructor(private useCase: VerifyTokenUseCase) {}
    async handle(req: Request | any, res: Response) {
        const userId = req.userId;

        const response = await this.useCase.execute(userId);

        res.status(200).json(response);
    }
}
