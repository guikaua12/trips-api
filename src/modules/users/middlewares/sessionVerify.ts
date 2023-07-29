import { NextFunction, Request, Response } from 'express';

export function sessionVerify(req: Request, res: Response, next: NextFunction) {
    console.log('sessionVerify');
    return next();
}
