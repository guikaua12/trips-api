import { Request, Response } from 'express';
import { GetUserUseCase } from '@/modules/users/useCases/GetUserUseCase';

export class GetUserController {
    constructor(private useCase: GetUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        const user = await this.useCase.execute(id);

        res.status(200).json({
            user,
        });
    }
}
