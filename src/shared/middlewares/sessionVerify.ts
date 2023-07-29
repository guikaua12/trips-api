import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/shared/errors/AppError';
import { SessionRepository } from '@/modules/sessions/repositories/SessionRepository';
import { pool } from '@/shared/database';

const sessionRepository = new SessionRepository(pool);

export async function sessionVerify(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new AppError(401, 'Unauthorized');
    }

    const session = await sessionRepository.findValid(authorization, process.env.SESSION_EXPIRY! || '30 MINUTES');

    if (!session) {
        throw new AppError(401, 'Unauthorized');
    }

    return next();
}
