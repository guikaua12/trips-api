import { Request, Response } from 'express';
import { VerifySessionUseCase } from '@/modules/sessions/useCases/VerifySessionUseCase';

export class VerifySessionController {
    constructor(private useCase: VerifySessionUseCase) {}
    async handle(req: Request, res: Response) {
        const { session } = req.body;

        const validSession = await this.useCase.execute({ session });

        return res.status(200).json({
            valid: validSession,
        });
    }
}
