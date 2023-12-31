import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from '@/shared/routes';
import { AppError } from '@/shared/errors/AppError';
import { dateParseMiddleware } from '@/shared/middlewares/dateParseMiddleware';

const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(dateParseMiddleware);
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
