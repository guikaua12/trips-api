import { Request, Response } from 'express';
import { SearchUserUseCase } from '@/modules/users/useCases/SearchUserUseCase';

export class SearchUserController {
    constructor(private useCase: SearchUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { id, email } = req.body;

        const user = await this.useCase.execute({ id, email });

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            },
        });
    }
}
