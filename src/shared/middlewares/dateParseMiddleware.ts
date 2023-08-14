import { NextFunction, Request, Response } from 'express';
import { handleDates } from '@/shared/utils/dateUtils';

export function dateParseMiddleware(req: Request, res: Response, next: NextFunction) {
    handleDates(req.body);

    next();
}
