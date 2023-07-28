import { Request, Response } from 'express';
import { SearchUserUseCase } from '@/modules/users/useCases/SearchUserUseCase';

export class SearchUserController {
    constructor(private useCase: SearchUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        const user = await this.useCase.execute(id);

        res.status(200).json({
            id: user.id,
            email: user.email,
        });
    }
}
