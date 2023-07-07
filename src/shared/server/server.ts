import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from '@/shared/routes';
import { AppError } from '@/shared/errors/AppError';

const server = express();
server.use(express.json());
server.use(router);

// error handling
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({ error: true, message: err.message });
    }

    console.error(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
});

export { server };
