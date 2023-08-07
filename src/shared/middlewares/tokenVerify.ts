import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/shared/errors/AppError';
import { parse } from '@/shared/utils/jwt';

export async function tokenVerify(req: Request | any, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!authorization || !token) {
        throw new AppError(401, 'Unauthorized');
    }

    try {
        const decoded = parse(token);
        req.userId = decoded.id;
    } catch (err) {
        throw new AppError(401, 'Unauthorized');
    }

    return next();
}
